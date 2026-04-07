import { useState, useRef, useCallback } from 'react'

const FORMATS = ['PNG', 'JPEG', 'WEBP', 'GIF', 'BMP']

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [targetFormat, setTargetFormat] = useState('PNG')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    if (!f.type.startsWith('image/')) {
      setError('Selecione um arquivo de imagem válido.')
      return
    }
    setError(null)
    setSuccess(false)
    if (preview) URL.revokeObjectURL(preview)
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }, [])

  const handleConvert = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('target_format', targetFormat)

      const response = await fetch('http://localhost:8000/convert', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.detail || 'Erro ao converter imagem.')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const ext = targetFormat.toLowerCase() === 'jpeg' ? 'jpg' : targetFormat.toLowerCase()
      a.download = `converted.${ext}`
      a.click()
      URL.revokeObjectURL(url)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const currentFormat = file?.type.split('/')[1]?.toUpperCase().replace('JPG', 'JPEG') || ''

  return (
    <div className="container">
      <header className="header">
        <div className="header-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
        </div>
        <div>
          <h1>Image Converter</h1>
          <p>Converta imagens para PNG, JPEG, WEBP, GIF ou BMP</p>
        </div>
      </header>

      <main className="card">
        {/* Drop zone */}
        <div
          className={`dropzone ${dragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onClick={() => inputRef.current.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
          {preview ? (
            <div className="preview">
              <img src={preview} alt="Preview" />
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-meta">
                  {formatFileSize(file.size)} &middot; {currentFormat}
                </span>
              </div>
            </div>
          ) : (
            <div className="dropzone-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p>
                Arraste uma imagem ou <span className="link">clique para selecionar</span>
              </p>
              <small>PNG · JPG · WEBP · GIF · BMP</small>
            </div>
          )}
        </div>

        {/* Format selector */}
        <div className="format-section">
          <label className="section-label">Converter para</label>
          <div className="format-buttons">
            {FORMATS.map((fmt) => (
              <button
                key={fmt}
                className={`format-btn ${targetFormat === fmt ? 'active' : ''}`}
                onClick={() => setTargetFormat(fmt)}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Imagem convertida e baixada com sucesso!</div>}

        {/* Convert button */}
        <button
          className="convert-btn"
          onClick={handleConvert}
          disabled={!file || loading}
        >
          {loading ? (
            <span className="loading-text">
              <span className="spinner" />
              Convertendo...
            </span>
          ) : (
            'Converter e Baixar'
          )}
        </button>

        {file && (
          <button
            className="clear-btn"
            onClick={() => { setFile(null); setPreview(null); setError(null); setSuccess(false) }}
          >
            Limpar
          </button>
        )}
      </main>
    </div>
  )
}
