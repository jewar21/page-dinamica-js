// Datos del menú
const menuItems = [
  { name: "Inicio", path: "/" },
  { name: "Servicios", path: "/services" },
  { name: "Acerca", path: "/about" },
  { name: "Contacto", path: "/contact" }
];

// Selección de elementos
const menu = document.getElementById("menu");
const hamburger = document.getElementById("hamburger");
const app = document.getElementById("app");

// Generar menú dinámico
menuItems.forEach((item) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = item.path; // Define el path
  a.textContent = item.name;
  a.dataset.link = ""; // Indica que es un enlace manejado por JS
  li.appendChild(a);
  menu.appendChild(li);
});

// Mostrar/Ocultar menú en modo móvil
hamburger.addEventListener("click", () => {
  menu.classList.toggle("open"); // Añadir/quitar la clase 'open' al menú
  hamburger.classList.toggle("open"); // Cambiar ícono de hamburguesa a "X"
});
// Datos para las tarjetas
const dynamicContent = [
  { title: "Card 1", description: "Esta es la descripción de la tarjeta 1" },
  { title: "Card 2", description: "Esta es la descripción de la tarjeta 2" },
  { title: "Card 3", description: "Esta es la descripción de la tarjeta 3" },
  { title: "Card 4", description: "Esta es la descripción de la tarjeta 4" }
];

// Rutas del proyecto
const routes = {
  "/": {
    template: `
          <h1>Bienvenido</h1>
          <p>Selecciona una opción del menú para navegar entre las páginas.</p>
          <div id="dynamic-content"></div>
        `
  },
  "/services": {
    template: `
          <h1>Servicios</h1>
          <p>Esta es la página de servicios.</p>
        `
  },
  "/about": {
    template: `
          <h1>Acerca de Nosotros</h1>
          <p>Esta es la página acerca de nosotros.</p>
        `
  },
  "/contact": {
    template: `
          <h1>Contacto</h1>
          <p>Esta es la página de contacto.</p>
        `
  }
};

// Renderizar contenido dinámico
const render = (path) => {
  const route = routes[path];
  if (route) {
    app.innerHTML = route.template;

    // Si estamos en la ruta "/", generar las tarjetas
    if (path === "/") {
      const dynamicContentSection = document.getElementById("dynamic-content");

      dynamicContent.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const title = document.createElement("h3");
        title.textContent = card.title;

        const description = document.createElement("p");
        description.textContent = card.description;

        cardDiv.appendChild(title);
        cardDiv.appendChild(description);

        dynamicContentSection.appendChild(cardDiv);
      });
    }
  } else {
    app.innerHTML = `
            <h1>404</h1>
            <p>Página no encontrada</p>
          `;
  }
};

// Manejar clics en el menú
menu.addEventListener("click", (e) => {
  if (e.target.dataset.link !== undefined) {
    e.preventDefault(); // Evitar la navegación tradicional
    const path = e.target.getAttribute("href"); // Obtener la ruta del enlace
    window.history.pushState({}, "", path); // Cambiar URL sin recargar
    render(path); // Renderizar la nueva vista
  }
});

// Manejar navegación con el botón "atrás/adelante"
window.addEventListener("popstate", () => {
  render(window.location.pathname); // Renderizar la ruta actual
});

// Render inicial
render(window.location.pathname);
