from pathlib import Path

carpeta = Path(".")
extensiones = [".html", ".css", ".js"]

for archivo in carpeta.rglob("*"):
    if archivo.suffix.lower() in extensiones:
        texto = archivo.read_text(encoding="utf-8")
        nuevo_texto = texto.replace(".png", ".webp")

        if nuevo_texto != texto:
            # Copia de seguridad
            copia = archivo.with_suffix(archivo.suffix + ".bak")
            copia.write_text(texto, encoding="utf-8")

            archivo.write_text(nuevo_texto, encoding="utf-8")
            print(f"Actualizado: {archivo}")

print("¡Enlaces actualizados a WebP!")