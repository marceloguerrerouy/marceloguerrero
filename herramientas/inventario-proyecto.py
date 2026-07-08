from pathlib import Path

carpeta = Path(".")

estadisticas = {
    "Carpetas": 0,
    "HTML": 0,
    "CSS": 0,
    "JS": 0,
    "Python": 0,
    "WebP": 0,
    "PNG": 0,
    "Otros": 0,
}

tamano_total = 0

for elemento in carpeta.rglob("*"):
    if elemento.is_dir():
        estadisticas["Carpetas"] += 1
    else:
        tamano_total += elemento.stat().st_size

        ext = elemento.suffix.lower()

        if ext == ".html":
            estadisticas["HTML"] += 1
        elif ext == ".css":
            estadisticas["CSS"] += 1
        elif ext == ".js":
            estadisticas["JS"] += 1
        elif ext == ".py":
            estadisticas["Python"] += 1
        elif ext == ".webp":
            estadisticas["WebP"] += 1
        elif ext == ".png":
            estadisticas["PNG"] += 1
        else:
            estadisticas["Otros"] += 1

print("\n===== INVENTARIO DEL PROYECTO =====\n")

for nombre, cantidad in estadisticas.items():
    print(f"{nombre:12}: {cantidad}")

print(f"\nTamaño total: {tamano_total / (1024*1024):.2f} MB")