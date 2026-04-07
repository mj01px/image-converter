<div align="center">

<br/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=30&pause=1000&color=FFFFFF&center=true&vCenter=true&width=500&lines=Image+Converter;Upload.+Convert.+Download." alt="Typing SVG" />
</a>

<br/>

<p>
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=flat-square&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-20232A?style=flat-square&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Pillow-11-3776AB?style=flat-square&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square"/>
</p>

</div>

<br/>

---

## `~/about`

```ts
const imageConverter = {
  type:     "Full-Stack Web Application",
  backend:  ["Python", "FastAPI", "Pillow"],
  frontend: ["React 18", "Vite"],
  formats:  ["PNG", "JPEG", "WEBP", "GIF", "BMP"],
  author:   "Mauro Junior · github.com/mj01px",
} as const;
```

**Image Converter** is a web app that converts images between the most common formats. Upload any image via drag & drop, select the target format, and download the result instantly — all processed server-side with Pillow, no quality loss from re-encoding overhead.

```
image-converter/
├── backend/     # FastAPI + Pillow  →  http://localhost:8000
└── frontend/    # React + Vite      →  http://localhost:5173
```

---

## `~/features`

<table>
  <tr>
    <td valign="top" width="50%">
      <b>🖼️ Conversion</b><br/><br/>
      <ul>
        <li>Supports PNG, JPEG, WEBP, GIF and BMP</li>
        <li>Automatic RGBA → RGB for JPEG compatibility</li>
        <li>10MB file size limit enforced server-side</li>
        <li>Image dimensions shown in preview</li>
      </ul>
    </td>
    <td valign="top" width="50%">
      <b>⚙️ Interface</b><br/><br/>
      <ul>
        <li>Drag & drop or click to upload</li>
        <li>Live preview with file size and format info</li>
        <li>One-click download after conversion</li>
        <li>Loading state and error feedback</li>
      </ul>
    </td>
  </tr>
</table>

---

## `~/getting-started`

### Backend

```bash
cd backend

python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # Linux / macOS

pip install -r requirements.txt
uvicorn main:app --reload      # → http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install && npm run dev     # → http://localhost:5173
```

---

## `~/api`

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/formats` | Returns supported formats |
| `POST` | `/convert` | Converts image — `multipart/form-data`: `file`, `target_format` |

---

## `~/stack`

<div align="center">

| Layer | Technologies |
|-------|-------------|
| **Backend** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) ![Pillow](https://img.shields.io/badge/Pillow-3776AB?style=flat-square&logo=python&logoColor=white) |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) |

</div>

---

<div align="center">
  <br/>
  <sub>
    Built by <a href="https://github.com/mj01px"><strong>Mauro Junior</strong></a>
    &nbsp;·&nbsp;
    <a href="https://www.linkedin.com/in/mauroapjunior/">LinkedIn</a>
  </sub>
  <br/><br/>
</div>
