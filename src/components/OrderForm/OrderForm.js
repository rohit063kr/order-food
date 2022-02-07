import React, { useContext } from 'react';
import useInput from '../../hooks/use-input';

import styles from './OrderForm.module.scss';

import CartContext from '../../store/cart-context';

import Input from '../UI/Input';
import Button from '../UI/Button';

const OrderForm = function () {
  const cartCtx = useContext(CartContext);
  const {
    inputState: enteredNameState,
    inputChangeHandler: enteredNameChangeHandler,
    resetInput: resetEnteredName,
  } = useInput();

  const {
    inputState: phoneNumState,
    inputChangeHandler: phoneNumChangeHandler,
    resetInput: resetPhoneNum,
  } = useInput();

  const {
    inputState: adressState,
    inputChangeHandler: adressChangeHandler,
    resetInput: resetAdress,
  } = useInput();

  const {
    inputState: rAdressState,
    inputChangeHandler: rAdressChangeHandler,
    resetInput: resetRadress,
  } = useInput();

  const sendRequest = async function () {
    const data = {
      name: enteredNameState,
      phone: phoneNumState,
      address: adressState,
      residentalAddresss: rAdressState,
      orderedItem: cartCtx.itemsInCart,
    };
    const responses = await fetch(
      'https://food-base-2-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  };

  const formSubmitHandler = function (e) {
    const formIsValid = true;

    if (formIsValid) {
      sendRequest();
    }

    resetRadress();
    resetPhoneNum();
    resetAdress();
    resetEnteredName();
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles['form']}>
      <div className={styles['form__input-container']}>
        <p>Your name</p>
        <Input type="text" onChange={enteredNameChangeHandler} />
      </div>

      <div className={styles['form__input-container']}>
        <p>Your Address</p>
        <Input type="text" onChange={adressChangeHandler} />
      </div>

      <div className={styles['form__input-container']}>
        <p>Residental address</p>
        <Input type="text" onChange={rAdressChangeHandler} />
      </div>

      <div className={styles['form__input-container']}>
        <p>Phone number</p>
        <Input type="number" onChange={phoneNumChangeHandler} />
      </div>

      <div className={`${styles['form__btn-container']}`}>
        <Button type="button">Cancel</Button>
        <Button type="submit">Order now</Button>
      </div>
    </form>
  );
};

export default OrderForm;
