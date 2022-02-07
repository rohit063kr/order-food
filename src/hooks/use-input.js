import { useState } from 'react';

const useInput = function () {
  const [inputState, setInputState] = useState();

  const inputChangeHandler = function (e) {
    setInputState(e.target.value);
  };

  const resetInput = function () {
    setInputState('');
  };

  return {
    inputState,
    inputChangeHandler,
    resetInput,
  };
};

export default useInput;
