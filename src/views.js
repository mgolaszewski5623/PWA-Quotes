import { RenderFavorites } from './favorites.js';

export function SetupViews() {
  ShowView('home-view');

  document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      ShowView(`${target}-view`);
    });
  });
}

export function ShowView(viewId) {
  document.querySelectorAll(".view").forEach((v) => v.classList.add("d-none"));
  const view = document.getElementById(viewId);

  const user = JSON.parse(localStorage.getItem("user"));

  if (viewId === "favorites-view" && user) {
    RenderFavorites();
  }
  if (viewId === "favorites-view" && !user) {
    alert("Zaloguj się, aby zobaczyć ulubione cytaty");
    document.getElementById("login-view").classList.remove("d-none");
  } else {
    view.classList.remove("d-none");
  }
}
