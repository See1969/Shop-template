import {
  basketContainer,
  eraseBasket,
  createBasket,
} from './shop-cart.js';

const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');
const basketCartBtn = document.querySelector('.page-header__cart-btn');


let cartCounter = 0;
let cartPrice = 0;
let restoreHTML = null;
let productInBasketArr = null;

const cartCounterLabelPrint = (i) => (i > 0) ? cartCounterLabel.innerHTML = `${i}` : cartCounterLabel.style.display = 'none';

function incrementCounter($label, cn) {
  $label.innerText = cn;
  if (cn === 1) $label.style.display = 'block';
}

function getMockData(t) {
  return +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/, '$1.$2');
}

function getPrice(t, p, cb) {
  return cartPrice = Math.round((p + cb(t)) * 100) / 100;
}

const getProductName = (p) => p.parentElement.parentElement.querySelector('.item-title').innerHTML;

function disableControls(t, $el, fn) {
  t.disabled = true;
  $el.removeEventListener('click', fn);
}

function enableControls(t, $el, fn) {
  t.disabled = false;
  $el.addEventListener('click', fn);
}

function writeProductToBasket(p, arr) {

  let item = null;

  const productName = getProductName(p);
  const productCode = productName;
  const price = getMockData(p);
  const count = 1;
  const sum = price;
  const product = { productName, productCode, price, count, sum };

  if (arr !== null) {
    let i = 0;

    for (let i = 0; i < arr.length; i++) {
      (arr[i].productCode === getProductName(p)) ? item = i : i++
    };
    if (item === null) arr.push(product)
    else {
      arr[item].count++;
      arr[item].sum = Math.round((arr[item].sum + arr[item].price) * 100) / 100;
    };
  } else arr = [product];

  return arr;
};

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 1000;

  if (typeof target !== 'object') return;
  if (!target.matches('.item-actions__cart')) return;
  if (basketContainer !== null) eraseBasket();

  incrementCounter(cartCounterLabel, ++cartCounter);

  productInBasketArr = writeProductToBasket(target, productInBasketArr);

  cartPrice = getPrice(target, cartPrice, getMockData);
  restoreHTML = target.innerHTML;

  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
  disableControls(target, contentContainer, btnClickHandler);

  setTimeout(() => {
    target.innerHTML = restoreHTML;
    enableControls(target, contentContainer, btnClickHandler);
  }, interval)
};

function basketBtnHandler(e) {
  const target = e.target;

  if (!target) {
    return;
  }

  eraseBasket();

  if (!target.classList.contains('basket__btn-continue')) {
    if (target.classList.contains('basket__btn-order')) {
      // потрібно прописати дії для подальшого оформлення товарів;
    }

    cartPrice = 0;
    productInBasketArr = null;
    cartCounter = 0;
    cartCounterLabelPrint(cartCounter);
  }
};

function createBasketWork(cartCounter, productInBasketArr) {
  createBasket(cartCounter, productInBasketArr);

  const basketBtn = document.querySelector('#btn-wrapper');
  basketBtn.addEventListener('click', basketBtnHandler);
  basketContainer.addEventListener('click', delProductHandler);
};

function delProductHandler(e) {
  const target = e.target;

  if (target && target.matches('.basket__element-delete')) {
    let b = true;
    let i = 0;

    while (b && i < productInBasketArr.length) {
      if (productInBasketArr[i].productCode === target.parentElement.dataset.code) {
        cartPrice -= productInBasketArr[i].sum;
        cartCounter -= productInBasketArr[i].count;

        productInBasketArr.splice(i, 1);

        b = false;
      } else i++;
    };

    eraseBasket();
    createBasketWork(cartCounter, productInBasketArr);
    cartCounterLabelPrint(cartCounter);
  };
};

function basketClickHandler(e) {
  const target = e.target;
  if (target) {
    createBasketWork(cartCounter, productInBasketArr);
  };
};

export function shopInit() {
  contentContainer.addEventListener('click', btnClickHandler);
  basketCartBtn.addEventListener('click', basketClickHandler);
}

