import {
    cart,
    removeFromCart,
    upadteCartQuantity
} from "../data/cart.js";
import {
    products
} from "../data/products.js";
import {
    formatCurrency
} from './utils/money.js';
import {
    deliveryOptions
} from "../data/deliveryoptions.js";


let cartSummaryHTML = '';
let matchingproduct = ''
upadteCartQuantity('.js-cartquantity');

// generate cards HTML //
cart.forEach((cartItem) => {
    products.forEach((product) => {
        if (cartItem.productId === product.id) {
            matchingproduct = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    })
    let today = dayjs();
    let deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
    <div class="cart-item-container 
    js-cart-item-container-${matchingproduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingproduct.image}>

            <div class="cart-item-details">
            <div class="product-name">${matchingproduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingproduct.priceCents)}</div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingproduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingproduct,cartItem)}
            </div>
        </div>
        </div>`
})
document.querySelector('.order-summary')
    .innerHTML = cartSummaryHTML;
//////////////////////////

// delete from cart //
document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(
                `.js-cart-item-container-${productId}`)
            container.remove()
            upadteCartQuantity('.js-cartquantity');
        })
    })
//////////////////////////

// generate delivery Options HTML //

function deliveryOptionsHTML(matchingproduct, cartItem) {
    let html = ``;

    deliveryOptions.forEach((deliveryOption) => {
        let today = dayjs();
        let deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days');
        let dateString = deliveryDate.format('dddd, MMMM D');

        let priceString = deliveryOption.priceCents === 0 ?

            'Free' : `$${formatCurrency(deliveryOption.priceCents)} -`;

        let isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html +=
            `<div class="delivery-option">
        <input type="radio" 
            ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingproduct.id}">
        <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            ${priceString} Shipping
        </div>
        </div>
        </div>`;

    })
    return html;
}