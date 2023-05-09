export let basketContainer = null;

let basketBtnContainer;
const headerNavbar = document.querySelector('.page-header__navbar');

const createElement = ({ type, attrs, container = null }) => {
  const el = document.createElement(type);

  for (let key in attrs) {
    if (key === 'innerText') el.innerHTML = attrs[key];
    else if (key.indexOf('data') === 0) el.setAttribute(`data-${key.slice(4)}`, attrs[key]);
    else el.setAttribute(key, attrs[key]);
  }

  if (container) container.append(el);

  return el;
};

const createBasketContainer = (c) => {
  basketContainer = createElement({
    type: 'div',
    attrs: { class: 'well basket__wrapper' },
    container: headerNavbar
  });
  createElement({
    type: 'p',
    attrs: { innerText: `У кошику ${c} товарів` },
    container: basketContainer
  });
};

const createBasketBtn = (count, container) => {
  basketBtnContainer = createElement({
    type: 'div',
    attrs: {
      class: 'basket__btn-wrapper',
      id: 'btn-wrapper'
    },
    container
  });
  createElement({
    type: 'button',
    attrs: {
      class: 'btn btn-primary basket__btn-continue',
      id: 'btn-next',
      type: 'button',
      innerText: 'Продовжити покупки'
    },
    container: basketBtnContainer
  });
  if (count > 0) {
    const clearBtn = createElement({
      type: 'button',
      attrs: {
        class: 'btn btn-primary basket__btn-delete',
        type: 'button',
        innerText: 'Очистити кошик'
      },
      container: basketBtnContainer
    });
    const orderBtn = createElement({
      type: 'button',
      attrs: {
        class: 'btn btn-primary basket__btn-order',
        type: 'submit',
        innerText: 'Оформити замовлення'
      },
      container: basketBtnContainer
    });

    orderBtn.addEventListener('click', () => {
      alert('Ваше замовлення успішно виконано!');
    });

    clearBtn.addEventListener('click', () => {
      const confirmation = confirm('Видалити товари з кошика?');
      if (confirmation) {
        alert('Товари були успішно видалені з кошика!');
      }
    });
  }
};

const createBasketList = (container, arr) => {
  let sum = 0;

  arr.forEach((el) => {
    let basketItem = createElement({
      type: 'div',
      attrs: {
        class: 'basket__element-wrapper',
        datacode: `${el.productCode}`
      },
      container
    });

    createElement({
      type: 'span',
      attrs: { innerText: `${el.productName}  ` },
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: {
        class: 'basket__element-count',
        innerText: `- ${el.count} шт  `
      },
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: { innerText: `ціна ${el.price.toFixed(2)}$  ` },
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: { innerText: `сума: ${el.sum.toFixed(2)}$` },
      container: basketItem
    });
    createElement({
      type: 'i',
      attrs: { class: 'fas fa-times basket__element-delete' },
      container: basketItem
    });

    sum += el.sum;
  });
  createElement({
    type: 'div',
    attrs: {
      class: 'basket__total',
      innerText: `Усього у кошику товарів на суму ${sum.toFixed(2)}$`
    },
    container
  });
};

const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText: `
      .page-header__navbar {
        position: relative;
      }
      .basket__wrapper {
        background-color: rgb(150, 200, 241);
        position: absolute;
        padding: 5px;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        z-index: 10;
        border: 2px solid lavender;
        border-radius: 9px;
      }
      .basket__wrapper p {
        text-align: center;
        font-size: 16px;
      }
      .basket__total {
        margin: 15px auto 15px auto;
        text-align: center;
        font-size: 18px;
      }
      .basket__btn-wrapper {
        display: flex;
        gap: 10px;
      }
      .basket__element-wrapper {
        display: flex;
        gap: 15px;
        justify-content: space-evenly;
        border-bottom: 1px solid lightblue;
      }
      .basket__element-delete {
        display: block;
        background-color: rgba(255, 255, 255, 0.25);
        border: 1px solid #041c36;
        padding: 5px 4px 5px 4px;
        cursor: pointer;
        font-size: 15px;
        border-radius: 2px;
      }
      `
    },
    container: document.head
  });
};

export const eraseBasket = () => {
  basketContainer.remove();
  basketContainer = null;
};

export const createBasket = (count, productArr) => {
  createBasketContainer(count);
  if (count > 0) createBasketList(basketContainer, productArr);
  createBasketBtn(count, basketContainer);
  createStyle();
};

