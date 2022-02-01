import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./Mealitemform.module.css";
const Mealitemform = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountinputref = useRef();
  const submithandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountinputref.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={submithandler}>
      <Input
        ref={amountinputref}
        label="amount"
        input={{
          id: "amount" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button> + Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};
export default Mealitemform;
