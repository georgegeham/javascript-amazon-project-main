import { cart, updateDeliveryOption, deleteFromCart, Count, updateCart } from "../../data/cart.js"
import { products, loadProducts } from "../../data/products.js"
import { deliveryOption } from "../../data/deliveryOption.js"
import { paymentRender } from "./paymentSummary.js"
import daysjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
/////////////
///Displying Cart Content
//////////
// async function start() {
//     await loadProducts();
//     pageRender();
// }
export function pageRender() {
    let html = ''
    cart.forEach(element => {
        let item;
        products.forEach(product => {
            if (element.productId === product.id) {
                item = product;
                const container = `<div class="cart-item-container">
            <div class="delivery-date" id = "${item.id}"></div>
            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${item.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-price">
                  $${(item.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${element.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary" data-id = ${item.id}>
                    Update
                    </span>
                    <span class="update-option js-update-option-${item.id}">
                    <input type="number" class="input-update js-input-update-${item.id}">
                    <span class="save-update js-save-update-${item.id}">Save</span>
                    </span>
                  <span class="delete-quantity-link link-primary" data-id = "${item.id}">
                    Delete
                  </span>
                </div>
              </div>
             ${produceDelivery(element)}
              </div>
          </div>`
                html += container;
            }
        })
    });
    document.querySelector('.order-summary').innerHTML = html;

    function produceDelivery(item) {
        const date = daysjs();
        let html = '';
        let deliveryDate;
        deliveryOption.forEach((option) => {
            let checked = false;
            if (item.deliveryOption === option.id) { checked = true };
            deliveryDate = date.add(option.days, 'day').format('dddd, MMMM D');
            const container = ` 
                 <div class="delivery-option" data-id= "${item.productId}" data-delivery-option = "${option.id}">
                   <input type="radio"
                     class="delivery-option-input"
                     name="delivery-option-1-${item.productId}"
                     ${checked ? `checked data-delivery-date= "${deliveryDate}"` : ''}>
                   <div>
                     <div class="delivery-option-date">
                       ${deliveryDate}
                     </div>
                     <div class="delivery-option-price">
                      ${option.price === 0 ? ' Free' : ' $' + (option.price / 100).toFixed(2)} - Shipping
                     </div>
                   </div>
                 </div>
                 `
            html += container;
        });
        const container = `<div class="delivery-options">
                 <div class="delivery-options-title">
                   Choose a delivery option:
                 </div>
                 ${html}
               </div>`
        return container;
    };

    function checked() {
        document.querySelectorAll('.delivery-option').forEach((radio) => {
            radio.addEventListener('click', () => {
                updateDeliveryOption(radio.dataset.id, radio.dataset.deliveryOption);
                pageRender();
                paymentRender();
            });
        })
    };
    function header() {
        cart.forEach((element) => {
            deliveryOption.forEach((option) => {
                if (element.deliveryOption === option.id) {
                    let deliveryDate = daysjs().add(option.days, 'day').format('dddd, MMMM D');
                    document.getElementById(`${element.productId}`).innerHTML = `Delivery date : ${deliveryDate}`;
                }
            })
        })
    }
    function deleteOption() {
        document.querySelectorAll('.delete-quantity-link').forEach((one) => {
            one.addEventListener('click', () => {
                deleteFromCart(one.dataset.id);
                pageRender();
                paymentRender();
            })
        })
    }
    //CheckOut count
    document.querySelector('.return-to-home-link').innerHTML = Count();
    ///
    /////updateQuantity
    function update() {
        document.querySelectorAll('.update-quantity-link').forEach((element) => {
            element.addEventListener('click', () => {
                let id = element.dataset.id;
                document.querySelector(`.js-update-option-${id}`).classList.add("display-update");
                let quantity = document.querySelector(`.js-input-update-${id}`);
                document.querySelector(`.js-save-update-${id}`).addEventListener('click', () => {
                    updateCart(id, Number(quantity.value));
                    console.log(`item of id ${id} get updated by quantity of ${quantity.value}`);
                    pageRender();
                    paymentRender();
                })
            })
        })
    }
    deleteOption();
    update();
    header();
    checked();
}