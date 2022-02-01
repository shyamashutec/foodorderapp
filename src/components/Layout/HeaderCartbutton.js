import { useContext, useEffect, useState } from "react";
import Cartcontext from "../../store/card-context";
import CartIcon from "../Cart/Carticon";
import classes from "./Headercartbutton.module.css";
const HeaderCartbutton = (props) => {
  const [btnishighlighted, setbtnishighlighted] = useState(false);
  const ctx = useContext(Cartcontext);
  const noofcartitems = ctx.items.reduce((curnumber, item) => {
    return curnumber + item.amount;
  }, 0);
  const { items } = ctx;
  const btnclass = `${classes.button} ${btnishighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setbtnishighlighted(true);
    const timer = setTimeout(() => {
      setbtnishighlighted(false);

      return () => {
        clearTimeout(timer);
      };
    }, 300);
  }, [items]);
  return (
    <button className={btnclass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>

      <span>Your cart</span>
      <span className={classes.badge}>{noofcartitems}</span>
    </button>
  );
};
export default HeaderCartbutton;
