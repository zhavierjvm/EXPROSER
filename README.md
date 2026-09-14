# EXPROSER — Sitio web corporativo

Sitio web corporativo de **Multiservicios Integrales Exproser S.A.S.**, compañía colombiana especializada en climatización industrial, redes eléctricas, energía solar fotovoltaica y acabados arquitectónicos de obra fina, con sede en Barranquilla (Atlántico, Colombia).

> "Servicio exprés, solución segura."

## Stack técnico

- **HTML5** semántico, una sola página con navegación por anclas.
- **Tailwind CSS** (compilado con Tailwind CLI, sin dependencias en tiempo de ejecución) con los *design tokens* oficiales de marca (colores, tipografías y radios) definidos en `tailwind.config.js`.
- **JavaScript vanilla** (`js/principal.js`) para el menú móvil y detalles menores.
- Sin backend ni framework: 100% desplegable como sitio estático en GitHub Pages.

## Estructura del proyecto

```
Exproser/
├── index.html                  # Página principal (todo el contenido del sitio)
├── 404.html                    # Página de error 404
├── robots.txt / sitemap.xml    # SEO técnico
├── package.json                # Scripts de build de Tailwind
├── tailwind.config.js          # Design tokens de marca
├── css/
│   ├── input.css               # Fuente de estilos (directivas Tailwind + componentes)
│   └── output.css              # CSS compilado y minificado (el que carga el sitio)
├── js/
│   └── principal.js            # Menú móvil, año dinámico del footer
├── assets/
│   ├── img/logo/                # Isotipo hexagonal EXPROSER (oficial, sin alterar)
│   └── icons/favicon/           # Favicons y manifest generados a partir del isotipo
└── docs/fuentes-marca/          # Manuales de marca y portafolio originales (fuente, no se publican en el sitio)
```

## Contenido del sitio

- **Inicio**: propuesta de valor, eslogan y CTA directo a WhatsApp.
- **Quiénes somos**: reseña institucional, Misión, Visión 2031 y el ADN de marca (EX · PRO · SER).
- **Servicios**: las 4 líneas de negocio (Climatización, Eléctrico, Solar, Acabados) con detalle técnico desplegable.
- **Por qué elegirnos**: diferenciadores de confianza y casos de éxito.
- **Contacto**: datos de contacto, mapa de cobertura y botón flotante de WhatsApp.

## Cómo correrlo localmente

Requiere [Node.js](https://nodejs.org/) 18 o superior (solo para compilar Tailwind; el sitio en sí no necesita Node para funcionar).

```bash
# 1. Instalar dependencias de desarrollo (Tailwind CLI)
npm install

# 2. Compilar el CSS en modo watch mientras editas
npm run dev

# 3. Servir el sitio localmente (en otra terminal)
npx serve .
# o simplemente:
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` (o el puerto que indique `serve`).

Para generar el CSS de producción (minificado) antes de publicar:

```bash
npm run build
```

> El archivo `css/output.css` ya viene compilado y versionado en el repositorio, así que el sitio funciona directamente abriendo `index.html` sin necesidad de instalar nada — `npm run build` solo es necesario si modificas `css/input.css`, `tailwind.config.js` o las clases de Tailwind en el HTML.

## Despliegue en GitHub Pages

1. En GitHub, entra a **Settings → Pages** del repositorio `EXPROSER`.
2. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
3. Guarda. GitHub publicará el sitio en unos minutos en:
   `https://<tu-usuario-de-github>.github.io/EXPROSER/`

No se requiere paso de build en GitHub Pages: el repositorio ya incluye el CSS compilado (`css/output.css`), por lo que el sitio queda 100% estático y funcional tal cual se publica.

## Identidad de marca

Los tokens de diseño (colores, tipografías, radios) están centralizados en `tailwind.config.js` y documentados en `css/input.css`. El isotipo hexagonal oficial se encuentra en `assets/img/logo/exproser-isotipo.png` y no debe distorsionarse ni recrearse; los manuales de marca originales están disponibles en `docs/fuentes-marca/` como referencia.

## Contacto

- **Contacto comercial:** Emilio Jose Vega
- **WhatsApp:** [+57 321 385 9698](https://wa.me/573213859698)
- **Teléfono:** +57 313 540 1835
- **Correo:** zhavierjvm@gmail.com
- **NIT:** 901.554.708-1 · 901.121.984-1
