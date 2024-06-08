import { orders, getItemQuantity, getItemTime, updateQuantity } from "../data/orders.js";
import { loadProducts, getImage, getName } from "../data/products.js";
import { Count, addCart, cart } from "../data/cart.js"
async function trial() {
  await loadProducts();
  order();
  buyAgain();
}
console.log(orders);
trial();
order();
function order() {
  function renderHeader() {
    let html = '';
    orders.forEach(element => {
      const container = `
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${element.getTime()}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${element.getPrice()}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${element.getId()}</div>
          </div>
        </div>
        <div class="order-details-grid">
        ${renderItem(element)}
        </div>`
      html += container;
    });
    document.querySelector('.order-container').innerHTML = html;
  }
  function renderItem(order) {
    let html = '';
    for (const product of order.products) {
      const container = ` 
          <div class="product-image-container">
            <img src="${getImage(product.productId)}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${getName(product.productId)}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${getItemTime(order, product.productId)}
            </div>
            <div class="product-quantity">
              Quantity: ${getItemQuantity(order, product.productId)}
            </div>
            <button class="buy-again-button button-primary" data-id = "${product.productId}" data-quantity = "${getItemQuantity(order, product.productId)}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>`
      html += container;
    }
    return html;
  }
  renderHeader();
  buyAgain();
}
function buyAgain() {
  document.querySelectorAll('.buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      console.log(button);
      const product = button.dataset.id
      const quantity = button.dataset.quantity * 1 + 1;
      console.log(quantity);
      addCart(product, 1);
      updateQuantity(product);
      console.log(cart);
      order();
    })
  })
  document.querySelector('.cart-quantity').innerHTML = Count();
}
