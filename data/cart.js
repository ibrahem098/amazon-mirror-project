export let cart = JSON.parse(localStorage.getItem('cart'));

export function upadteCartQuantity(elemntClass) {
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity
    })
    document.querySelector(`${elemntClass}`)
        .innerHTML = `${cartQuantity}`;
}

if (!cart) {
    cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        },
        {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }
    ];
}

export function addToCart(productId, quantitySelectorElemnt) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += Number(quantitySelectorElemnt.value)
        matchingItem = ''
    } else {
        cart.push({
            productId,
            quantity: Number(quantitySelectorElemnt.value),
            deliveryOptionId: '2'
        })
    }
    saveToStorage()
}

export function removeFromCart(productId) {
    let newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage()
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}


export function updateDeleveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage()
}