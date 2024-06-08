import { loadProducts } from "../data/products.js";
import { pageRender } from "./checkout/orderSummary.js"
import { paymentRender } from "./checkout/paymentSummary.js";
async function render() {
  await loadProducts();
  checkout();
}
render();
export function checkout() {
  pageRender();
  paymentRender();
}
