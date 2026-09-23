from pathlib import Path
from PIL import Image, UnidentifiedImageError

# Carpeta desde donde empieza la búsqueda.
# El punto significa: carpeta principal del proyecto.
CARPETA_PROYECTO = Path(".")

# Calidad recomendada para páginas web.
CALIDAD_WEBP = 85

# Formatos que se convertirán.
FORMATOS_VALIDOS = {".png", ".jpg", ".jpeg"}

imagenes_encontradas = 0
imagenes_convertidas = 0
imagenes_omitidas = 0
errores = 0


for archivo in CARPETA_PROYECTO.rglob("*"):

    # Ignorar carpetas y otros tipos de archivos.
    if not archivo.is_file():
        continue

    # Solo convertir PNG, JPG y JPEG.
    if archivo.suffix.lower() not in FORMATOS_VALIDOS:
        continue

    imagenes_encontradas += 1

    # Crear el mismo nombre, pero con extensión WebP.
    destino = archivo.with_suffix(".webp")

    # No sobrescribir un WebP que ya exista.
    if destino.exists():
        print(f"⏭ Ya existe: {destino}")
        imagenes_omitidas += 1
        continue

    try:
        with Image.open(archivo) as imagen:

            # Mantener transparencia en imágenes PNG cuando exista.
            if imagen.mode in ("RGBA", "LA"):
                imagen = imagen.convert("RGBA")
            else:
                imagen = imagen.convert("RGB")

            imagen.save(
                destino,
                format="WEBP",
                quality=CALIDAD_WEBP,
                method=6
            )

        peso_original = archivo.stat().st_size
        peso_webp = destino.stat().st_size

        if peso_original > 0:
            ahorro = (1 - peso_webp / peso_original) * 100
        else:
            ahorro = 0

        print(
            f"✅ Convertido: {archivo} → {destino.name} "
            f"| ahorro: {ahorro:.1f}%"
        )

        imagenes_convertidas += 1

    except UnidentifiedImageError:
        print(f"❌ Archivo no reconocido como imagen: {archivo}")
        errores += 1

    except OSError as error:
        print(f"❌ Error al convertir {archivo}: {error}")
        errores += 1


print("\n------------------------------")
print("RESUMEN DE LA CONVERSIÓN")
print("------------------------------")
print(f"Imágenes encontradas: {imagenes_encontradas}")
print(f"Imágenes convertidas: {imagenes_convertidas}")
print(f"Imágenes omitidas: {imagenes_omitidas}")
print(f"Errores: {errores}")
print("------------------------------")
print("Los archivos originales no fueron eliminados.")

