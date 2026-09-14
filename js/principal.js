/**
 * EXPROSER — Script principal del sitio.
 * Controla el menú de navegación móvil y datos dinámicos menores.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===== Menú móvil =====
  const botonMenu = document.getElementById("boton-menu-movil");
  const menuMovil = document.getElementById("menu-movil");
  const iconoAbrir = document.getElementById("icono-abrir");
  const iconoCerrar = document.getElementById("icono-cerrar");

  if (botonMenu && menuMovil) {
    const cerrarMenu = () => {
      menuMovil.classList.add("hidden");
      iconoAbrir.classList.remove("hidden");
      iconoCerrar.classList.add("hidden");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
    };

    const alternarMenu = () => {
      const expandido = botonMenu.getAttribute("aria-expanded") === "true";
      menuMovil.classList.toggle("hidden");
      iconoAbrir.classList.toggle("hidden");
      iconoCerrar.classList.toggle("hidden");
      botonMenu.setAttribute("aria-expanded", String(!expandido));
      botonMenu.setAttribute("aria-label", expandido ? "Abrir menú de navegación" : "Cerrar menú de navegación");
    };

    botonMenu.addEventListener("click", alternarMenu);

    // Cerrar el menú móvil al seleccionar un enlace de navegación
    menuMovil.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", cerrarMenu);
    });
  }

  // ===== Año actual en el footer =====
  const anioActual = document.getElementById("anio-actual");
  if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
  }
});
