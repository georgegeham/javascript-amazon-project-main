import { cart, Count, resetCart } from "../../data/cart.js"
import { getProduct, } from "../../data/products.js";
import { getShippingPrice } from "../../data/deliveryOption.js";
import { addOrder } from "../../data/orders.js";
export function paymentRender() {
  const html = `<div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${Count()}):</div>
          <div class="payment-summary-money">$${itemPrice().toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${shippingPrice().toFixed(2)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${(itemPrice() + shippingPrice()).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${((itemPrice() + shippingPrice()) * 0.1).toFixed(2)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${((itemPrice() + shippingPrice()) * 1.1).toFixed(2)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`
  document.querySelector('.payment-summary').innerHTML = html;
  sendRequest();
}
function itemPrice() {
  let itemPrice = 0;
  cart.forEach(element => {
    const product = getProduct(element.productId);
    itemPrice += Number(((product.priceCents * element.quantity) / 100).toFixed(2));
  });
  return itemPrice;
}
function shippingPrice() {
  let shippingPrice = 0;
  cart.forEach((element) => {
    const product = getShippingPrice(element.deliveryOption);
    shippingPrice += Number((product / 100).toFixed(2));
  })
  return shippingPrice;
}
function sendRequest() {
  document.querySelector('.place-order-button').addEventListener('click', async () => {
    try {
      if (cart.length) {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json();
        addOrder(order);
        resetCart();
        window.location.href = "orders.html";
      }
      else {
        alert("Cart is Empty");
      }
    }
    catch {
      console.log("Error Submiting Order");
    }
  })
}