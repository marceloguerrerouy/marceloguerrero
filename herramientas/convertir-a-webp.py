from pathlib import Path
from PIL import Image

carpeta = Path(".")  # Carpeta actual
calidad = 90

for archivo in carpeta.rglob("*.png"):
    with Image.open(archivo) as img:
        if img.mode in ("RGBA", "LA", "P"):
            img.save(archivo.with_suffix(".webp"), "WEBP", quality=calidad)
        else:
            img.convert("RGB").save(archivo.with_suffix(".webp"), "WEBP", quality=calidad)

    print(f"Convertido: {archivo.name}")

print("¡Proceso terminado!")