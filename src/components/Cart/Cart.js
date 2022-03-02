import React, { useContext } from 'react';

import CartContext from '../../store/cart-context';

import styles from './Cart.module.scss';

import Button from '../UI/Button';
import Card from '../UI/Card';
import ListItems from '../UI/ListItems';
import OrderForm from '../OrderForm/OrderForm';

const Cart = function (props) {
  const cartCtx = useContext(CartContext);

  const itemsBought = cartCtx.itemsInCart;

  const cartItemList = itemsBought.map(el => (
    <ListItems
      key={el.item}
      className={`cart__item ${styles['cart__item']}`}
      data-id={el.item}
    >
      <span className={styles['cart__item-name']}>
        {el.item}
        {el.times > 1 && (
          <Button type="button" className={styles['cart__btn']}>
            {' x ' + el.times}
          </Button>
        )}
      </span>
      <span className={styles['cart__item-cost']}>$ {el.cost * el.times}</span>
      <div className={styles['cart__item-btn']}>
        <Button type="button" onClick={cartCtx.removeItem}>
          -
        </Button>
      </div>
    </ListItems>
  ));

  return (
    <React.Fragment>
      {props.modalStatus && (
        <div className={styles['cart']}>
          <div
            className={styles['cart__overlay']}
            onClick={props.onModalClose}
          ></div>
          <Card className={styles['cart__card']}>
            <Button
              className={styles['cart__cancel']}
              onClick={props.onModalClose}
            >
              X
            </Button>
            <h2 className={styles['cart__heading']}>Your Items</h2>
            <div className={styles['cart__items']}>
              {itemsBought.length
                ? cartItemList
                : 'You did not placed any order yet'}

              <div
                className={`${styles['cart__total']} ${styles['cart__item']}`}
              >
                <span className={styles['cart__total-heading']}>Total</span>
                <span className={styles['cart__totla-amount']}>
                  $ {cartCtx.totalAmount}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default Cart;
