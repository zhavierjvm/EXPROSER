/**
 * EXPROSER — Script principal del sitio.
 * Controla la barra de progreso de scroll, menú móvil, garantía de visibilidad de 6 servicios,
 * calculadora interactiva de ahorro solar/HVAC, contadores de métricas, modal técnico,
 * slider antes/después y notificaciones flotantes de actividad en vivo.
 */

document.addEventListener("DOMContentLoaded", () => {
  // ===== 1. Barra de Progreso de Scroll Superior =====
  const scrollProgress = document.getElementById("scroll-progress");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) {
      scrollProgress.style.width = `${scrolled}%`;
    }
  }, { passive: true });

  // ===== 2. Menú móvil =====
  const botonMenu = document.getElementById("boton-menu-movil");
  const menuMovil = document.getElementById("menu-movil");
  const iconoAbrir = document.getElementById("icono-abrir");
  const iconoCerrar = document.getElementById("icono-cerrar");

  if (botonMenu && menuMovil) {
    const cerrarMenu = () => {
      menuMovil.classList.add("hidden");
      if (iconoAbrir) iconoAbrir.classList.remove("hidden");
      if (iconoCerrar) iconoCerrar.classList.add("hidden");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.setAttribute("aria-label", "Abrir menú de navegación");
    };

    const alternarMenu = () => {
      const expandido = botonMenu.getAttribute("aria-expanded") === "true";
      menuMovil.classList.toggle("hidden");
      if (iconoAbrir) iconoAbrir.classList.toggle("hidden");
      if (iconoCerrar) iconoCerrar.classList.toggle("hidden");
      botonMenu.setAttribute("aria-expanded", String(!expandido));
      botonMenu.setAttribute("aria-label", expandido ? "Abrir menú de navegación" : "Cerrar menú de navegación");
    };

    botonMenu.addEventListener("click", alternarMenu);

    menuMovil.querySelectorAll("a").forEach((enlace) => {
      enlace.addEventListener("click", cerrarMenu);
    });
  }

  // ===== 3. Año actual en el footer =====
  const anioActual = document.getElementById("anio-actual");
  if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
  }

  // ===== 4. Garantía Absoluta de Carga y Visibilidad de los 6 Servicios =====
  const tarjetasServicios = document.querySelectorAll(".tarjeta-servicio-item");
  const tabsFiltro = document.querySelectorAll(".tab-filtro");

  // Asegurar que las tarjetas sean 100% visibles inmediatamente sin demoras de animación
  function forzarVisibilidadServicios() {
    tarjetasServicios.forEach((tarjeta) => {
      tarjeta.style.display = "flex";
      tarjeta.style.opacity = "1";
      tarjeta.style.visibility = "visible";
      tarjeta.style.transform = "none";
    });
  }
  forzarVisibilidadServicios();

  tabsFiltro.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabsFiltro.forEach((t) => t.classList.remove("tab-filtro-activo"));
      tab.classList.add("tab-filtro-activo");

      const categoria = tab.getAttribute("data-categoria");

      tarjetasServicios.forEach((tarjeta) => {
        const catTarjeta = tarjeta.getAttribute("data-categoria");
        if (categoria === "todos" || catTarjeta === categoria) {
          tarjeta.style.display = "flex";
          tarjeta.style.opacity = "1";
          tarjeta.style.visibility = "visible";
          tarjeta.style.transform = "none";
        } else {
          tarjeta.style.display = "none";
        }
      });
    });
  });

  // ===== 5. Calculadora Interactiva de Ahorro Solar & Climatización (WOW Factor) =====
  const sliderFactura = document.getElementById("slider-factura");
  const txtFacturaVal = document.getElementById("txt-factura-val");
  const txtAhorroMes = document.getElementById("txt-ahorro-mes");
  const txtAhorroAnio = document.getElementById("txt-ahorro-anio");
  const txtRetornoMeses = document.getElementById("txt-retorno-meses");
  const btnWpCalculadora = document.getElementById("btn-wp-calculadora");

  if (sliderFactura && txtFacturaVal && txtAhorroMes && txtAhorroAnio && txtRetornoMeses) {
    const actualizarCalculadora = () => {
      const valorFactura = parseInt(sliderFactura.value, 10);
      const porcentajeAhorro = 0.75; // 75% promedio de ahorro con Solar AGPE + Climatización Inverter
      const ahorroMensual = Math.round(valorFactura * porcentajeAhorro);
      const ahorroAnual = ahorroMensual * 12;
      const retornoMeses = valorFactura > 3000000 ? "18 a 24 meses" : "24 a 36 meses";

      txtFacturaVal.textContent = `$${valorFactura.toLocaleString("es-CO")} COP/mes`;
      txtAhorroMes.textContent = `$${ahorroMensual.toLocaleString("es-CO")} COP`;
      txtAhorroAnio.textContent = `$${ahorroAnual.toLocaleString("es-CO")} COP`;
      txtRetornoMeses.textContent = retornoMeses;

      if (btnWpCalculadora) {
        const mensaje = `Hola EXPROSER, calculé mi factura mensual de $${valorFactura.toLocaleString("es-CO")} COP y me interesa ahorrar $${ahorroMensual.toLocaleString("es-CO")} COP/mes con Energía Solar y Climatización. Deseo agendar estudio técnico.`;
        btnWpCalculadora.href = `https://wa.me/573213859698?text=${encodeURIComponent(mensaje)}`;
      }
    };

    sliderFactura.addEventListener("input", actualizarCalculadora);
    actualizarCalculadora();
  }

  // ===== 6. Modal Técnico de Servicios =====
  const modalTecnico = document.getElementById("modal-tecnico");
  const modalTitulo = document.getElementById("modal-titulo");
  const modalCuerpo = document.getElementById("modal-cuerpo");
  const btnCerrarModal = document.getElementById("btn-cerrar-modal");

  const datosTecnicos = {
    hvac: {
      titulo: "01. Climatización & Ingeniería de Frío (Chillers & Inverter)",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Procedimientos de Mantenimiento:</strong> Higienización profunda con hidrolavadoras de presión calibrada y aplicación de desinfectantes biodegradables dieléctricos en serpentines.</p>
          <p><strong class="text-neutral-text">Diagnóstico y Soldadura:</strong> Presurización con nitrógeno seco para detección milimétrica de fugas, soldadura oxiacetilénica de alta resistencia y sustitución de tarjetas de control Inverter.</p>
          <p><strong class="text-neutral-text">Sistemas Industriales de Agua Helada (Chillers):</strong> Ajuste de sellos mecánicos, cambio de rodamientos en bombas de circulación y balanceo hidráulico.</p>
          <p><strong class="text-neutral-text">Refrigerantes Ecológicos:</strong> Manejo ambiental certificado de gases R410A, R32 y R134a.</p>
          <div class="rounded-lg bg-accent-cyan/10 p-3 text-xs font-semibold text-[#007A94]">
            ✔ Incluye informe técnico digital con reporte fotográfico antes/después y garantía formal escrita S.A.S.
          </div>
        </div>
      `
    },
    electrico: {
      titulo: "02. Redes e Instalaciones Eléctricas (Norma RETIE & NTC 2050)",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Acometidas de Baja y Media Tensión:</strong> Diseño e instalación de circuitos trifásicos para bodegas logísticas, centros comerciales y edificios.</p>
          <p><strong class="text-neutral-text">Tableros de Distribución:</strong> Ensamblaje, cableado estructurado, rotulación de circuitos y balanceo térmico de cargas.</p>
          <p><strong class="text-neutral-text">Sistemas de Puesta a Tierra (SPT):</strong> Construcción de mallas de puesta a tierra y medición digital de resistividad del terreno.</p>
          <p><strong class="text-neutral-text">Iluminación Eficiente:</strong> Estudios de niveles lumínicos (Lux) y retrofitting LED de alta durabilidad.</p>
          <div class="rounded-lg bg-accent-amber/10 p-3 text-xs font-semibold text-[#9C6208]">
            ✔ Todos los proyectos son ejecutados por técnicos electricistas certificados bajo RETIE.
          </div>
        </div>
      `
    },
    solar: {
      titulo: "03. Energía Solar Fotovoltaica (Autogeneración AGPE - Ley 1715)",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Estudio de Factibilidad:</strong> Simulación de radiación solar en la región Caribe y proyección de retorno de inversión con ahorro tarifario de hasta el 80%.</p>
          <p><strong class="text-neutral-text">Ingeniería e Instalación:</strong> Paneles monocristalinos Tier 1 montados sobre estructuras de aluminio anodizado resistentes a la corrosión salina.</p>
          <p><strong class="text-neutral-text">Inversores y Protección:</strong> Inversores On-Grid, Off-Grid e híbridos con protecciones DC/AC integradas.</p>
          <p><strong class="text-neutral-text">Legalización ante Operadores de Red:</strong> Trámites de conexión e inyección de excedentes ante Air-e y Afinia bajo la Ley 1715 de 2014.</p>
          <div class="rounded-lg bg-success-green/10 p-3 text-xs font-semibold text-[#0D7A54]">
            ✔ Soluciones escalables desde 3.3 kWp (Residencial) hasta 50+ kWp (Comercial e Industrial).
          </div>
        </div>
      `
    },
    acabados: {
      titulo: "04. Acabados Arquitectónicos de Obra Fina",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Drywall & Superboard:</strong> Cielorrasos suspendidos, muros divisorios termoacústicos, nichos de diseño e iluminación LED indirecta integrada.</p>
          <p><strong class="text-neutral-text">Pintura & Recubrimientos:</strong> Estuco de alta densidad, pinturas vinílicas lavables de alta cobertura y recubrimientos epóxicos industriales.</p>
          <p><strong class="text-neutral-text">Mármol, Granito & Cuarzo:</strong> Suministro, corte de precisión, instalación y sellado de mesones para cocinas y baños.</p>
          <p><strong class="text-neutral-text">Restauración de Pisos:</strong> Pulido, diamantado y cristalización de superficies de mármol y terrazo.</p>
          <div class="rounded-lg bg-primary-blue/10 p-3 text-xs font-semibold text-primary-blue">
            ✔ Estándar EXPROSER SER: Protección total del espacio y entrega 100% pulcra e impecable.
          </div>
        </div>
      `
    },
    seguridad: {
      titulo: "05. Seguridad Electrónica, Domótica & Protección Integral",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Videovigilancia CCTV HD:</strong> Instalación de cámaras IP con visión nocturna, analítica de movimiento y visualización remota en tiempo real desde móviles.</p>
          <p><strong class="text-neutral-text">Control de Acceso Biométrico:</strong> Lectores de huella, tarjetas RFID y cerraduras digitales inteligentes para oficinas y residencias.</p>
          <p><strong class="text-neutral-text">Detección de Incendios:</strong> Centrales de alarma, sensores fotoeléctricos de humo e integración de emergencias.</p>
          <p><strong class="text-neutral-text">Cableado Estructurado:</strong> Redes de datos UTP Cat 6/6A y fibra óptica con certificación de puntos.</p>
          <div class="rounded-lg bg-sky-100 p-3 text-xs font-semibold text-sky-800">
            ✔ Monitoreo inteligente 24/7 y soluciones de Smart Business.
          </div>
        </div>
      `
    },
    higienizacion: {
      titulo: "06. Higienización & Lavado Profesional de Tapicería",
      contenido: `
        <div class="space-y-4 text-sm leading-relaxed text-neutral-subtext">
          <p><strong class="text-neutral-text">Inyección & Extracción Profunda:</strong> Extracción asistida de suciedad acumulada, manchas, bacterias y alérgenos en sofás y poltronas.</p>
          <p><strong class="text-neutral-text">Tratamiento Antiácaros para Colchones:</strong> Higienización térmica y química neutra para eliminar ácaros y mejorar la salud respiratoria.</p>
          <p><strong class="text-neutral-text">Línea Empresarial B2B:</strong> Lavado masivo de sillería ergonómica para oficinas, auditorios y salas de conferencia.</p>
          <p><strong class="text-neutral-text">Tapicería Vehicular:</strong> Limpieza de cojinería en tela y cuero, techos y alfombras automotrices.</p>
          <div class="rounded-lg bg-teal-100 p-3 text-xs font-semibold text-teal-800">
            ✔ Productos biodegradables neutros y secado rápido de alta potencia.
          </div>
        </div>
      `
    }
  };

  document.querySelectorAll(".btn-ver-ficha").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const servicioKey = btn.getAttribute("data-servicio");
      const info = datosTecnicos[servicioKey];
      if (info && modalTecnico && modalTitulo && modalCuerpo) {
        modalTitulo.textContent = info.titulo;
        modalCuerpo.innerHTML = info.contenido;
        modalTecnico.classList.remove("hidden");
        modalTecnico.classList.add("flex");
      }
    });
  });

  if (btnCerrarModal && modalTecnico) {
    btnCerrarModal.addEventListener("click", () => {
      modalTecnico.classList.add("hidden");
      modalTecnico.classList.remove("flex");
    });

    modalTecnico.addEventListener("click", (e) => {
      if (e.target === modalTecnico) {
        modalTecnico.classList.add("hidden");
        modalTecnico.classList.remove("flex");
      }
    });
  }

  // ===== 7. Contadores de Métricas Animados al hacer Scroll =====
  const contadores = document.querySelectorAll(".contador-num");
  let contadoresIniciados = false;

  const animarContadores = () => {
    contadores.forEach((contador) => {
      const objetivo = parseInt(contador.getAttribute("data-target") || "0", 10);
      const sufijo = contador.getAttribute("data-sufijo") || "";
      const prefijo = contador.getAttribute("data-prefijo") || "";
      let inicio = 0;
      const duracion = 1500; // ms
      const paso = Math.ceil(objetivo / (duracion / 16));

      const timer = setInterval(() => {
        inicio += paso;
        if (inicio >= objetivo) {
          contador.textContent = `${prefijo}${objetivo}${sufijo}`;
          clearInterval(timer);
        } else {
          contador.textContent = `${prefijo}${inicio}${sufijo}`;
        }
      }, 16);
    });
  };

  const observerContadores = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !contadoresIniciados) {
        contadoresIniciados = true;
        animarContadores();
      }
    });
  }, { threshold: 0.3 });

  const secMetricas = document.getElementById("sec-metricas");
  if (secMetricas) {
    observerContadores.observe(secMetricas);
  }

  // ===== 8. Cotizador Interactivo de WhatsApp =====
  const formCotizador = document.getElementById("form-cotizador");
  if (formCotizador) {
    formCotizador.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const servicio = document.getElementById("cotiza-servicio")?.value || "General";
      const nombre = document.getElementById("cotiza-nombre")?.value || "Cliente";
      const ciudad = document.getElementById("cotiza-ciudad")?.value || "Barranquilla";
      const mensaje = document.getElementById("cotiza-mensaje")?.value || "Deseo información sobre sus servicios técnicos.";
      
      const textoWP = `Hola EXPROSER, mi nombre es *${nombre}* (${ciudad}).\n\n*Servicio de interés:* ${servicio}\n*Detalles del proyecto:* ${mensaje}\n\nQuedo atento a su respuesta para agendar visita técnica.`;
      
      const urlWP = `https://wa.me/573213859698?text=${encodeURIComponent(textoWP)}`;
      window.open(urlWP, "_blank");
    });
  }

  // ===== 9. Slider Interactivo "Antes vs. Después" =====
  const btnCasoA = document.getElementById("btn-caso-clima");
  const btnCasoB = document.getElementById("btn-caso-obra");
  const imgAntes = document.getElementById("img-antes");
  const imgDespues = document.getElementById("img-despues");
  const txtCasoTitulo = document.getElementById("txt-caso-titulo");
  const txtCasoDesc = document.getElementById("txt-caso-desc");

  if (btnCasoA && btnCasoB && imgAntes && imgDespues) {
    btnCasoA.addEventListener("click", () => {
      btnCasoA.classList.add("bg-[#007A94]", "text-white");
      btnCasoA.classList.remove("bg-slate-800", "text-slate-300");
      btnCasoB.classList.remove("bg-[#007A94]", "text-white");
      btnCasoB.classList.add("bg-slate-800", "text-slate-300");

      txtCasoTitulo.textContent = "01. Climatización: Evaporador de Aire Acondicionado";
      txtCasoDesc.textContent = "Izquierda: Serpentín acumulado con polvo y ácaros. Derecha: Desinfección profunda con químico biodegradable e hidrolavadora a presión.";
      imgAntes.src = "assets/img/hvac-service.jpg";
      imgDespues.src = "assets/img/hero-industrial.jpg";
    });

    btnCasoB.addEventListener("click", () => {
      btnCasoB.classList.add("bg-[#007A94]", "text-white");
      btnCasoB.classList.remove("bg-slate-800", "text-slate-300");
      btnCasoA.classList.remove("bg-[#007A94]", "text-white");
      btnCasoA.classList.add("bg-slate-800", "text-slate-300");

      txtCasoTitulo.textContent = "02. Acabados: Remodelación Corporativa en Drywall & LED";
      txtCasoDesc.textContent = "Izquierda: Estructura locativa inicial. Derecha: Cielorraso en drywall con luces LED lineales e isla en mármol pulido.";
      imgAntes.src = "assets/img/finishes-service.jpg";
      imgDespues.src = "assets/img/team-engineers.jpg";
    });
  }

  // ===== 10. Toast de Notificaciones de Actividad Reciente en Vivo =====
  const toastActividad = document.getElementById("toast-actividad");
  const toastTexto = document.getElementById("toast-texto");

  const mensajesToast = [
    "⚡ Hace 4 min: Visita técnica agendada en Barranquilla (Climatización Industrial)",
    "☀️ Hace 15 min: Cotización solar aprobada en Soledad (15 kWp)",
    "💡 Hace 28 min: Mantenimiento eléctrico RETIE en centro comercial",
    "✨ Hace 40 min: Servicio de acabados en Drywall finalizado en Puerto Colombia"
  ];

  let toastIdx = 0;
  if (toastActividad && toastTexto) {
    setTimeout(() => {
      setInterval(() => {
        toastTexto.textContent = mensajesToast[toastIdx % mensajesToast.length];
        toastActividad.classList.remove("translate-y-20", "opacity-0");
        toastActividad.classList.add("translate-y-0", "opacity-100");

        setTimeout(() => {
          toastActividad.classList.remove("translate-y-0", "opacity-100");
          toastActividad.classList.add("translate-y-20", "opacity-0");
        }, 4500);

        toastIdx++;
      }, 12000);
    }, 4000);
  }
});
