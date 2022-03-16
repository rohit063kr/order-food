//Here we can store our context logic(main logic) -> context can be used to store logic so that root component don't get sucked by these logics

import React, { useState, useReducer, useEffect } from 'react';
import CartContext from './cart-context';

let itemsPresent;

const cartReducer = function (prevState, action) {
  if (action.type === 'REPEAT_ORDER') {
    prevState.find(itemObj => itemObj.item === action.itemId).times +=
      action.itemTimes;
    return [...prevState];
  }

  if (action.type === 'NEW_ORDER') {
    return [
      {
        ...itemsPresent.filter(item => item.item === action.itemId)[0],
        times: action.itemTimes,
      },
      ...prevState,
    ];
  }

  if (action.type === 'REMOVE_ITEM') {
    prevState.find(itemObj => itemObj.item === action.itemId).times -= 1;
    return prevState.filter(itemObj => itemObj.times > 0);
  }
};

const CartProvider = function (props) {
  const [cartItems, dispatchCartItems] = useReducer(cartReducer, []);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  itemsPresent = items;

  useEffect(() => {
    const fetchMeals = async function () {
      setIsLoading(true);
      const responses = await fetch(
        'https://food-menu-d9a4b-default-rtdb.firebaseio.com/meals.json'
      );

      if (!responses.ok) throw new Error();

      const data = await responses.json();
      setIsLoading(false);
      const meals = [];
      for (const item of Object.entries(data)) {
        meals.push({
          id: item[0],
          item: item[1].item,
          cost: item[1].price,
          description: item[1].description,
        });
      }
      setItems(meals);
    };

    fetchMeals().catch(err => {
      setError('Something went wrong!  ' + err.message);
      setIsLoading(false);
    });
  }, []);

  const itemsBoughtHandler = function (itemId, itemTime) {
    const itemTimes = itemTime || 1;

    const isMatching = cartItems.some(el => el.item === itemId);

    dispatchCartItems({
      type: isMatching ? 'REPEAT_ORDER' : 'NEW_ORDER',
      itemId,
      itemTimes,
    });
  };

  const totalCost = cartItems
    .reduce((counter, item) => item.cost * item.times + counter, 0)
    .toFixed(2);

  const cartItemRemoveHandler = function (e) {
    const itemId = e.target.closest('.cart__item').dataset.id;
    dispatchCartItems({ type: 'REMOVE_ITEM', itemId });
  };

  const contextValue = {
    itemsAvailable: itemsPresent,
    itemsInCart: cartItems,
    totalAmount: totalCost,
    isLoading,
    error,
    addItems: itemsBoughtHandler,
    removeItem: cartItemRemoveHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
