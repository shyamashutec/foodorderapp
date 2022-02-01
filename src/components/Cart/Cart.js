import Modal from "../UI/Modal";
import { useContext } from "react";
import classes from "./Cart.module.css";
import Cartcontext from "../../store/card-context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const cartCtx = useContext(Cartcontext);

  const totalAmount = `$${cartCtx.totalamount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (item) => {
    // console.log(item);
    //   const updatedtotalamount = totalAmount - item.price;
    //   const existingindex = cartCtx.items.findIndex(
    //     (element) => item.id === element.id
    //   );
    //   const existingcartitem = cartCtx.items[existingindex];
    //   // console.log(existingcartitem);
    //   console.log(existingcartitem.amount);
    //   let updateditems;
    //   if (existingcartitem.amount === 1) {
    //     updateditems = cartCtx.items.filter((value) => value.id !== item.id);
    //     cartCtx.items = updateditems;
    //   } else {
    //     const updateditem = {
    //       ...existingcartitem,
    //       amount: existingcartitem.amount - 1,
    //     };
    //     cartCtx.items[existingindex] = updateditem;
    //     cartCtx.removeitem(updateditem);
    //   }
    // };
    // const cartItemAddHandler = (item) => {
    //   cartCtx.additem({ ...item, amount: 1 });
    cartCtx.removeitem({ ...item });
  };
  const cartItemAddHandler = (item) => {
    cartCtx.additem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onhidecart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
