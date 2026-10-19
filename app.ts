type Listing = {
  title: string;
  maker: string;
  category: "Services" | "Goods" | "Events";
  price: string;
  description: string;
  symbol: string;
  visual: string;
};

type Simulation = {
  title: string;
  label: string;
  summary: string;
  metric: string;
  details: string[];
  visual: string;
};

const fallbackListings: Listing[] = [
  { title: "Brand moodboard", maker: "Studio Sol", category: "Services", price: "€85", description: "A bright visual direction for your next small idea.", symbol: "✷", visual: "visual-1" },
  { title: "Hand-thrown cups", maker: "Marta Clay", category: "Goods", price: "€28", description: "Small-batch ceramics with a little bit of wobble.", symbol: "◒", visual: "visual-2" },
  { title: "Night drawing club", maker: "The Blue Room", category: "Events", price: "€12", description: "A relaxed evening of prompts, music, and making.", symbol: "✎", visual: "visual-3" },
  { title: "Portrait session", maker: "Ari Frame", category: "Services", price: "€120", description: "Natural portraits for people building something new.", symbol: "◉", visual: "visual-4" },
  { title: "Printed tote set", maker: "Common Thread", category: "Goods", price: "€19", description: "Two screen-printed totes for everyday errands.", symbol: "▱", visual: "visual-5" },
  { title: "Sunday supper", maker: "Nia Cooks", category: "Events", price: "€35", description: "A fictional shared table with a seasonal menu.", symbol: "✺", visual: "visual-6" },
];

const simulations: Simulation[] = [
  {
    title: "Shops & marketplace",
    label: "Commerce",
    summary: "Browse fictional products, services, events, rentals, and jobs.",
    metric: "24 mock listings",
    details: ["Demo shop: Common Thread", "Featured category: Goods", "Sample flow: discover → preview → compare", "No checkout or buyer details are collected."],
    visual: "simulation-lime",
  },
  {
    title: "Social feed & stories",
    label: "Community",
    summary: "A relationship-led discovery feed with posts, stories, and follows.",
    metric: "12 fictional posts",
    details: ["Demo story row: Studio Sol, Nia Cooks, Ari Frame", "Sample actions: like, save, follow", "All activity resets when the page closes.", "No real profiles or user-generated content."],
    visual: "simulation-orange",
  },
  {
    title: "Direct messages",
    label: "Conversation",
    summary: "Preview how a shared inbox could separate marketplace and Bond threads.",
    metric: "3 canned threads",
    details: ["Marketplace thread: Studio Sol / Brand moodboard", "Bond thread: The Blue Room / Creative swap", "Sample states: unread, matched, archived", "There is no compose box or message endpoint."],
    visual: "simulation-purple",
  },
  {
    title: "Orders & protection",
    label: "Operations",
    summary: "Follow a fictional order from request to completion and review.",
    metric: "4 mock statuses",
    details: ["Order: Printed tote set", "Status path: previewed → prepared → delivered → reviewed", "Sample protection state: not opened", "No address, payment, refund, or claim data exists."],
    visual: "simulation-blue",
  },
  {
    title: "Events & tickets",
    label: "Attendance",
    summary: "See a fictional event card and a ticket-admission preview.",
    metric: "2 demo events",
    details: ["Event: Night drawing club", "Capacity: 40 fictional places", "Ticket state: sample QR preview only", "No ticket purchase or attendee identity is stored."],
    visual: "simulation-yellow",
  },
  {
    title: "Seller dashboard",
    label: "Creator tools",
    summary: "Preview a compact view of listings, views, and sample sales.",
    metric: "5 mock listings",
    details: ["Demo shop: Marta Clay", "Sample metrics: 186 views, 14 saves", "Sample actions: edit preview, pause preview, view trend", "No seller account or payout connection exists."],
    visual: "simulation-pink",
  },
  {
    title: "Hustle Bond",
    label: "Networking",
    summary: "Explore a fictional matching deck for creative collaborators.",
    metric: "4 demo matches",
    details: ["Match cards: maker, photographer, cook, event host", "Sample states: new, liked, matched", "The cards use fictional identities only.", "No dating profile, contact, or real message is created."],
    visual: "simulation-teal",
  },
  {
    title: "Premium plans",
    label: "Membership",
    summary: "Compare fictional plan benefits without a subscription checkout.",
    metric: "3 mock plans",
    details: ["Plans: Starter, Studio, Collective", "Sample benefits: insights, Bond access, shop highlights", "Pricing is illustrative only.", "No payment provider or recurring billing is connected."],
    visual: "simulation-dark",
  },
];

let listings: Listing[] = [];

const grid = document.querySelector<HTMLElement>("#listing-grid")!;
const emptyState = document.querySelector<HTMLElement>("#empty-state")!;
const search = document.querySelector<HTMLInputElement>("#search")!;
const filters = document.querySelector<HTMLElement>("#filters")!;
const dialog = document.querySelector<HTMLDialogElement>("#preview-dialog")!;
const dialogTitle = document.querySelector<HTMLElement>("#dialog-title")!;
const dialogCopy = document.querySelector<HTMLElement>("#dialog-copy")!;
const simulationGrid = document.querySelector<HTMLElement>("#simulation-grid")!;

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
  grid.querySelectorAll<HTMLButtonElement>(".preview-button").forEach((button) => {
    button.addEventListener("click", () => openPreview(listings[Number(button.dataset.index)]));
  });
}

function openPreview(listing: Listing): void {
  dialogTitle.textContent = listing.title;
  dialogCopy.textContent = `This fictional ${listing.category.toLowerCase()} preview would let a visitor understand the next step for “${listing.title}”. In this prototype, the interaction stays in memory and does not create a booking, collect contact details, or send a message.`;
  document.querySelector<HTMLElement>("#dialog-confirm")!.textContent = "Nothing was sent or saved.";
  dialog.showModal();
}

function renderSimulations(): void {
  simulationGrid.innerHTML = simulations.map((simulation, index) => `
    <article class="simulation-card ${simulation.visual}">
      <div class="simulation-topline"><span>${simulation.label}</span><strong>${String(index + 1).padStart(2, "0")}</strong></div>
      <h3>${simulation.title}</h3>
      <p>${simulation.summary}</p>
      <div class="simulation-bottom"><span>${simulation.metric}</span><button class="simulation-button" data-simulation-index="${index}">Open preview ↗</button></div>
    </article>
  `).join("");

  simulationGrid.querySelectorAll<HTMLButtonElement>(".simulation-button").forEach((button) => {
    button.addEventListener("click", () => openSimulation(simulations[Number(button.dataset.simulationIndex)]));
  });
}

function openSimulation(simulation: Simulation | undefined): void {
  if (!simulation) return;
  dialogTitle.textContent = simulation.title;
  dialogCopy.textContent = simulation.summary;
  document.querySelector<HTMLElement>("#dialog-confirm")!.textContent = `${simulation.metric} · ${simulation.details.join(" · ")}`;
  dialog.showModal();
}

filters.addEventListener("click", (event: MouseEvent) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest<HTMLButtonElement>("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter ?? "All";
  filters.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
  render();
});

search.addEventListener("input", render);
document.querySelector<HTMLButtonElement>("#dialog-close")!.addEventListener("click", () => dialog.close());
document.querySelector<HTMLButtonElement>("#dialog-done")!.addEventListener("click", () => dialog.close());

async function loadListings() {
  try {
    const response = await fetch("/api/listings");
    if (!response.ok) throw new Error("Mock API unavailable");
    listings = (await response.json()) as Listing[];
  } catch {
    // Direct file previews still work without a server. The fallback remains
    // fictional and is never written to storage or sent anywhere.
    listings = fallbackListings;
  }
  render();
}

loadListings();
renderSimulations();
