# Image Converter

Web app para converter imagens entre formatos PNG, JPEG, WEBP, GIF e BMP.

## Stack

- **Backend**: FastAPI + Pillow
- **Frontend**: React + Vite

## Como rodar

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

API disponível em `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponível em `http://localhost:5173`

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/formats` | Lista formatos suportados |
| POST | `/convert` | Converte imagem (multipart: `file`, `target_format`) |

## Formatos suportados

PNG · JPEG · WEBP · GIF · BMP
