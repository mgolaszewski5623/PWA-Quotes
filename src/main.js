import { SetupViews } from './views.js';
import { SetupAuth } from './auth.js';
import { SetupQuoteFetching } from './quotes.js';
import { SetupFavorites } from './favorites.js';

document.addEventListener('DOMContentLoaded', () => {
  SetupViews();
  SetupAuth();
  SetupQuoteFetching();
  SetupFavorites();
});
