from pathlib import Path

carpeta = Path(".")
extensiones = [".html", ".css", ".js"]

encontrados = False

for archivo in carpeta.rglob("*"):
    if archivo.suffix.lower() in extensiones:
        texto = archivo.read_text(encoding="utf-8", errors="ignore")
        if ".png" in texto:
            encontrados = True
            print(f"Todavía hay .png en: {archivo}")

if not encontrados:
    print("Perfecto: no quedan referencias .png en HTML, CSS ni JS.")