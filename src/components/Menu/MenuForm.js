import React, { useContext, useRef } from 'react';

import CartContext from '../../store/cart-context';
import styles from './MenuForm.module.scss';

import Input from '../UI/Input';
import Button from '../UI/Button';

const MenuForm = function (props) {
  const timesInputRef = useRef();
  const cartCtx = useContext(CartContext);

  const itemBoughtHandler = function (e) {
    e.preventDefault();
    cartCtx.addItems(
      e.target.closest('div').dataset.id,
      +timesInputRef.current.value
    );

    timesInputRef.current.value = '';
  };

  return (
    <form className={styles['menu__item-config']} onSubmit={itemBoughtHandler}>
      <div className={styles['menu__item-times']}>
        <label>Quantity:</label>
        <Input type="number" ref={timesInputRef} />
      </div>
      <Button type="submit">+Add</Button>
    </form>
  );
};

export default MenuForm;
