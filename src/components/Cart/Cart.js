import Modal from "../UI/Modal";
import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Cartcontext from "../../store/card-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isordering, setisordering] = useState(false);
  const [issubmitting, setissubmitting] = useState(false);
  const [didsubmit, setdidsubmit] = useState(false);
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
  const orderhandler = () => {
    setisordering(true);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.additem({ ...item, amount: 1 });
  };
  const submitorderhandler = async (userdata) => {
    setissubmitting(true);
    const response = await fetch(
      "https://react-http-7ffca-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userdata, orders: cartCtx.items }),
      }
    );
    setissubmitting(false);
    setdidsubmit(true);
    cartCtx.clearcart();
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
  const modalactions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onhidecart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderhandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartmodalcontent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isordering && (
        <Checkout onConfirm={submitorderhandler} onCancel={props.onhidecart} />
      )}{" "}
      {!isordering && modalactions}
    </>
  );
  const issubmittingmodal = <p>sending order data</p>;
  const didsubmitmodal = (
    <>
      <p>sucessfully submitted</p>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onhidecart}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Modal onClose={props.onhidecart}>
      {!issubmitting && !didsubmit && cartmodalcontent}
      {!issubmitting && didsubmit && didsubmitmodal}
      {issubmitting && issubmittingmodal}
    </Modal>
  );
};
export default Cart;
