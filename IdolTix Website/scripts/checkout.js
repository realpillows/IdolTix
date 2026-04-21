const productSelect = document.querySelector("#product");
const quantityInput = document.querySelector("#quantity");
const orderProduct = document.querySelector("#order-product");
const orderSummary = document.querySelector("#order-summary");
const subtotalEl = document.querySelector("#subtotal");
const totalEl = document.querySelector("#total");
const checkoutForm = document.querySelector("#checkout-form");
const formError = document.querySelector("#form-error");

function currentProduct() {
  return getProductById(productSelect.value);
}

function quantity() {
  return Math.max(1, Number.parseInt(quantityInput.value, 10) || 1);
}

function renderCheckout() {
  const product = currentProduct();
  const qty = quantity();
  const subtotal = product.price * qty;

  orderProduct.innerHTML = `
    <div class="order-line">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <strong>${product.name}</strong>
        <div class="line-price">${formatPrice(product.price)} each</div>
        <small>${product.status}</small>
      </div>
    </div>
  `;

  orderSummary.innerHTML = `
    <div class="summary-row"><span>Product</span><strong>${product.name}</strong></div>
    <div class="summary-row"><span>Unit price</span><strong>${formatPrice(product.price)}</strong></div>
    <div class="summary-row"><span>Quantity</span><strong>${qty}</strong></div>
  `;

  subtotalEl.textContent = formatPrice(subtotal);
  totalEl.textContent = formatPrice(subtotal);
}

function initialiseCheckout() {
  if (!checkoutForm) return;

  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get("product") || IDOLTIX_PRODUCTS[0].id;

  productSelect.innerHTML = IDOLTIX_PRODUCTS
    .map((product) => `<option value="${product.id}">${product.name} - ${formatPrice(product.price)}</option>`)
    .join("");
  productSelect.value = getProductById(selectedId).id;

  productSelect.addEventListener("change", renderCheckout);
  quantityInput.addEventListener("input", renderCheckout);

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(checkoutForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const product = currentProduct();
    const qty = quantity();
    const subtotal = product.price * qty;

    if (!name || !email) {
      formError.textContent = "Please enter your name and email before generating the WhatsApp order request.";
      return;
    }

    formError.textContent = "";
    const message = [
      "Hi, I'd like to place an order with IdolTix.",
      `Product: ${product.name}.`,
      `Quantity: ${qty}.`,
      `Subtotal: ${formatPrice(subtotal)}.`,
      `Name: ${name}.`,
      `Email: ${email}.`,
      notes ? `Notes: ${notes}.` : ""
    ].filter(Boolean).join(" ");

    window.location.href = `https://wa.me/6593422619?text=${encodeURIComponent(message)}`;
  });

  renderCheckout();
}

initialiseCheckout();
