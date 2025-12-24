import { currentUser } from './auth.js';

function GetFavoritesForUser(username) {
  const data = localStorage.getItem(`favorites_${username}`);
  return data ? JSON.parse(data) : [];
}

function SaveFavoritesForUser(username, favorites) {
  localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
}

export function SetupFavorites() {
  const saveFavoriteBtn = document.getElementById("save-favorite");

  saveFavoriteBtn?.addEventListener("click", () => {
    if (!currentUser) {
      alert("Zaloguj się, aby zapisać cytat do ulubionych.");
      return;
    }

    const quoteText = document.getElementById("quote-text").textContent;
    const quoteAuthor = document.getElementById("quote-author").textContent;
    const newQuote = { text: quoteText, author: quoteAuthor };

    const favorites = GetFavoritesForUser(currentUser.username);

    if (favorites.some(q => q.text === newQuote.text)) {
      alert("Ten cytat jest już zapisany.");
      return;
    }

    favorites.push(newQuote);
    SaveFavoritesForUser(currentUser.username, favorites);
    alert("Cytat zapisano do ulubionych.");
  });
}

export function RenderFavorites() {
  const list = document.getElementById("favorites-list");
  const template = document.getElementById("favorite-quote-template");
  list.innerHTML = "";

  const favorites = GetFavoritesForUser(currentUser.username);

  favorites.forEach((quote, index) => {
    const li = template.content.cloneNode(true);
    li.querySelector(".quote-text").textContent = `${quote.text} — ${quote.author}`;

    li.querySelector("button").addEventListener("click", () => {
      favorites.splice(index, 1);
      SaveFavoritesForUser(currentUser.username, favorites);
      RenderFavorites();
    });

    list.appendChild(li);
  });

  if (favorites.length === 0) {
    list.innerHTML = '<li class="list-group-item text-center text-muted">Brak ulubionych cytatów</li>';
  }
}
