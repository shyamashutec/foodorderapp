import { useContext } from "react";
import classes from "./Mealitem.module.css";
import Mealitemform from "./Mealitemform";
import Cartcontext from "../../../store/card-context";

const Mealitem = (props) => {
  const cartCtx = useContext(Cartcontext);
  const price = `$${props.price.toFixed(2)}`;
  const addToCartHandler = (amount) => {
    cartCtx.additem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <Mealitemform id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};
export default Mealitem;
