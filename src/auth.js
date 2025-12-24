import { ShowView } from './views.js';

export let currentUser = null;

export function SetupAuth() {
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout");

  CheckSavedUser();

  loginForm?.addEventListener("submit", HandleLogin);
  logoutBtn?.addEventListener("click", HandleLogout);
}

function CheckSavedUser() {
  const savedUser = localStorage.getItem("user");
  const userNameLabel = document.getElementById("user-name");

  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    userNameLabel.textContent = `Zalogowany jako: ${currentUser.username}`;
    document.getElementById("login-view").classList.add("d-none");
  }
}

async function HandleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const userNameLabel = document.getElementById("user-name");

  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error("Błąd logowania");

    const data = await res.json();
    currentUser = data;

    localStorage.setItem("user", JSON.stringify(currentUser));
    userNameLabel.textContent = `Zalogowany jako: ${currentUser.username}`;
    alert("Zalogowano pomyślnie!");
    ShowView("home-view");

  } catch (err) {
    alert("Nieprawidłowa nazwa użytkownika lub hasło");
  }
}

function HandleLogout() {
  const userNameLabel = document.getElementById("user-name");

  localStorage.removeItem("user");
  currentUser = null;
  userNameLabel.textContent = "Niezalogowany";
  ShowView("login-view");
}
