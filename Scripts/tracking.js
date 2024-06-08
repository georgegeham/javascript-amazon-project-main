import { getItemQuantity, getItemTime, getOrder } from "../data/orders.js";
import { loadProducts, getImage, getName } from "../data/products.js";
import { Count } from "../data/cart.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
const order = getOrder(orderId);
async function init() {
    await loadProducts();
    console.log(order);
    document.querySelector('.order-tracking').innerHTML = pageRender(order, productId);
}
function pageRender(order, productId) {
    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(order.products.find(product => product.productId === productId).estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    const html = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${getItemTime(order, productId)}
      </div>

      <div class="product-info">
        ${getName(productId)}
      </div>

      <div class="product-info">
        Quantity: ${getItemQuantity(order, productId)}
      </div>

      <img class="product-image" src="${getImage(productId)}">

      <div class="progress-labels-container">
        <div class="progress-label ${percentProgress < 50 ? 'current-status' : ''}">
          Preparing
        </div>
        <div class="progress-label ${percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
          Shipped
        </div>
        <div class="progress-label ${percentProgress >= 100 ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width : ${percentProgress}%;"></div>
      </div>`
    return html;
}
document.querySelector('.cart-quantity').innerHTML = Count();
init();