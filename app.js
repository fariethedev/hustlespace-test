const fallbackListings = [
  { title: "Brand moodboard", maker: "Studio Sol", category: "Services", price: "€85", description: "A bright visual direction for your next small idea.", symbol: "✷", visual: "visual-1" },
  { title: "Hand-thrown cups", maker: "Marta Clay", category: "Goods", price: "€28", description: "Small-batch ceramics with a little bit of wobble.", symbol: "◒", visual: "visual-2" },
  { title: "Night drawing club", maker: "The Blue Room", category: "Events", price: "€12", description: "A relaxed evening of prompts, music, and making.", symbol: "✎", visual: "visual-3" },
  { title: "Portrait session", maker: "Ari Frame", category: "Services", price: "€120", description: "Natural portraits for people building something new.", symbol: "◉", visual: "visual-4" },
  { title: "Printed tote set", maker: "Common Thread", category: "Goods", price: "€19", description: "Two screen-printed totes for everyday errands.", symbol: "▱", visual: "visual-5" },
  { title: "Sunday supper", maker: "Nia Cooks", category: "Events", price: "€35", description: "A fictional shared table with a seasonal menu.", symbol: "✺", visual: "visual-6" },
];

let listings = [];

const grid = document.querySelector("#listing-grid");
const emptyState = document.querySelector("#empty-state");
const search = document.querySelector("#search");
const filters = document.querySelector("#filters");
const dialog = document.querySelector("#preview-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCopy = document.querySelector("#dialog-copy");

let activeFilter = "All";

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = listings.filter((listing) => {
    const matchesFilter = activeFilter === "All" || listing.category === activeFilter;
    const haystack = `${listing.title} ${listing.maker} ${listing.description}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });

  grid.innerHTML = visible.map((listing, index) => `
    <article class="listing-card">
      <div class="listing-visual ${listing.visual}">
        <span class="listing-tag">${listing.category}</span>
        <span class="visual-symbol" aria-hidden="true">${listing.symbol}</span>
      </div>
      <div class="listing-body">
        <h3>${listing.title}</h3>
        <p class="listing-description">${listing.description}</p>
        <div class="listing-footer">
          <div><div class="listing-price">${listing.price}</div><div class="listing-maker">by ${listing.maker}</div></div>
          <button class="preview-button" data-index="${listings.indexOf(listing)}">Preview flow</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.hidden = visible.length > 0;
  grid.querySelectorAll(".preview-button").forEach((button) => {
    button.addEventListener("click", () => openPreview(listings[Number(button.dataset.index)]));
  });
}

function openPreview(listing) {
  dialogTitle.textContent = listing.title;
  dialogCopy.textContent = `This fictional ${listing.category.toLowerCase()} preview would let a visitor understand the next step for “${listing.title}”. In this prototype, the interaction stays in memory and does not create a booking, collect contact details, or send a message.`;
  dialog.showModal();
}

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  filters.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

search.addEventListener("input", render);
document.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
document.querySelector("#dialog-done").addEventListener("click", () => dialog.close());

async function loadListings() {
  try {
    const response = await fetch("/api/listings");
    if (!response.ok) throw new Error("Mock API unavailable");
    listings = await response.json();
  } catch {
    // Direct file previews still work without a server. The fallback remains
    // fictional and is never written to storage or sent anywhere.
    listings = fallbackListings;
  }
  render();
}

loadListings();
