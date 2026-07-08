from pathlib import Path
import re

carpeta = Path(".")
archivos_codigo = [".html", ".css", ".js"]

referencias = []

for archivo in carpeta.rglob("*"):
    if archivo.suffix.lower() in archivos_codigo:
        texto = archivo.read_text(encoding="utf-8", errors="ignore")
        encontradas = re.findall(r'["\']([^"\']+\.(?:webp|png|jpg|jpeg))["\']', texto, re.IGNORECASE)
        for ref in encontradas:
            referencias.append((archivo, ref))

print("IMÁGENES QUE NO SE ENCUENTRAN:\n")

for archivo, ref in referencias:
    ruta = (archivo.parent / ref).resolve()
    if not ruta.exists():
        print(f"En {archivo}: falta -> {ref}")

print("\nRevisión terminada.")