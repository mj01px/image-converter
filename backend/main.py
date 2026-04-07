from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import io

app = FastAPI(title="Image Converter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SUPPORTED_FORMATS = ["PNG", "JPEG", "WEBP", "GIF", "BMP"]

MEDIA_TYPES = {
    "PNG": "image/png",
    "JPEG": "image/jpeg",
    "WEBP": "image/webp",
    "GIF": "image/gif",
    "BMP": "image/bmp",
}

EXTENSIONS = {
    "PNG": "png",
    "JPEG": "jpg",
    "WEBP": "webp",
    "GIF": "gif",
    "BMP": "bmp",
}


@app.get("/formats")
def get_formats():
    return {"formats": SUPPORTED_FORMATS}


@app.post("/convert")
async def convert_image(
    file: UploadFile = File(...),
    target_format: str = Form(...),
):
    target_format = target_format.upper()

    if target_format not in SUPPORTED_FORMATS:
        raise HTTPException(
            status_code=400,
            detail=f"Formato não suportado. Use: {', '.join(SUPPORTED_FORMATS)}",
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="O arquivo enviado não é uma imagem.")

    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content))

        # JPEG não suporta transparência — converte para RGB
        if target_format == "JPEG" and image.mode in ("RGBA", "P", "LA"):
            image = image.convert("RGB")

        output = io.BytesIO()
        image.save(output, format=target_format)
        output.seek(0)

        filename = f"converted.{EXTENSIONS[target_format]}"

        return StreamingResponse(
            output,
            media_type=MEDIA_TYPES[target_format],
            headers={"Content-Disposition": f"attachment; filename={filename}"},
        )
    except HTTPException:
        raise
    except Exception as err:
        raise HTTPException(status_code=422, detail=f"Falha ao converter imagem: {str(err)}")
