const IDOLTIX_PRODUCTS = [
  {
    id: "card-sleeves-premium",
    name: "Premium Card Sleeves",
    category: "Accessories",
    price: 8.9,
    description: "Matte protective sleeves for standard-sized trading cards, suitable for daily play and binder storage.",
    image: "assets/products/card-sleeves.webp",
    status: "Available for order request"
  },
  {
    id: "compact-deck-box",
    name: "Compact Deck Box",
    category: "Storage",
    price: 14.9,
    description: "A sturdy deck box for keeping sleeved cards organized for trading sessions, meetups, and events.",
    image: "assets/products/deck-box.webp",
    status: "Available for order request"
  },
  {
    id: "nine-pocket-binder",
    name: "9-Pocket Binder",
    category: "Display",
    price: 24.9,
    description: "Collector binder with 9-pocket pages for displaying trading cards while reducing edge wear.",
    image: "assets/products/binder.webp",
    status: "Available for order request"
  },
  {
    id: "acrylic-display-stand",
    name: "Acrylic Card Display Stand",
    category: "Display",
    price: 12.9,
    description: "Clear acrylic stand for showcasing graded slabs, sealed packs, or favorite single cards at home.",
    image: "assets/products/display-stand.webp",
    status: "Available for order request"
  },
  {
    id: "booster-storage-case",
    name: "Booster Pack Storage Case",
    category: "Storage",
    price: 18.9,
    description: "Compact storage case for keeping sealed booster packs and small collectibles clean and upright.",
    image: "assets/products/storage-case.webp",
    status: "Available for order request"
  },
  {
    id: "tournament-playmat",
    name: "Tournament Playmat",
    category: "Play",
    price: 29.9,
    description: "Soft desk and card-game mat with stitched edges for cleaner play, sorting, and photo layouts.",
    image: "assets/products/playmat.webp",
    status: "Available for order request"
  }
];

const formatPrice = (price) => `SGD ${price.toFixed(2)}`;

const getProductById = (id) => IDOLTIX_PRODUCTS.find((product) => product.id === id) || IDOLTIX_PRODUCTS[0];

function productCard(product) {
  return `
    <article class="product-card">
      <a class="product-image" href="checkout.html?product=${product.id}" aria-label="Order ${product.name}">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-body">
        <div class="product-meta">
          <span class="product-category">${product.category}</span>
          <span class="price">${formatPrice(product.price)}</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <span class="status-pill">${product.status}</span>
        <div class="product-actions">
          <a class="button" href="checkout.html?product=${product.id}">Add to order</a>
          <a class="text-button" href="contact.html">Contact</a>
        </div>
      </div>
    </article>
  `;
}

function renderProducts(targetSelector, options = {}) {
  const target = document.querySelector(targetSelector);
  if (!target) return;
  const products = options.limit ? IDOLTIX_PRODUCTS.slice(0, options.limit) : IDOLTIX_PRODUCTS;
  target.innerHTML = products.map(productCard).join("");
}
