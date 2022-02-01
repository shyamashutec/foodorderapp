import Cartcontext from "./card-context";
import { useState } from "react";
const defaultcart = {
  items: [],
  totalamount: 0,
};
// const cartreducer = (state, action) => {
//   if (action.type === "add") {
//     const updateditems = state.items.concat(action.item);
//     const updatedtotalamount =
//       state.totalamount + action.item.price * action.item.amount;
//     return {
//       items: updateditems,
//       totalamount: updatedtotalamount,
//     };
//   }
//   return defaultcart;
// };

const Cartprovider = (props) => {
  const [cart, setcart] = useState(defaultcart);
  const additemtocarthandler = (item) => {
    const existingindex = cart.items.findIndex(
      (element) => item.id === element.id
    );
    const existingcartitem = cart.items[existingindex];
    let updateditem, updateditems;
    if (existingcartitem) {
      updateditem = {
        ...existingcartitem,
        amount: existingcartitem.amount + item.amount,
      };
      updateditems = [...cart.items];
      updateditems[existingindex] = updateditem;
    } else {
      updateditem = item;
      updateditems = cart.items.concat(item);
    }
    setcart({
      items: updateditems,
      totalamount: cart.totalamount + item.price * item.amount,
    });
    // console.log(cart);
  };

  const removeitemfromcarthandler = (item) => {
    // dispatchcart({ type: "remove", item: id });

    const existingindex = cart.items.findIndex(
      (element) => item.id === element.id
    );
    const existingcartitem = cart.items[existingindex];
    const updatedtotalamount = cart.totalamount - item.price;
    let updateditems;
    if (existingcartitem.amount === 1) {
      updateditems = cart.items.filter((value) => value.id !== item.id);
      setcart({ items: updateditems, totalamount: updatedtotalamount });
    } else {
      const updateditem = {
        ...existingcartitem,
        amount: existingcartitem.amount - 1,
      };
      updateditems = [...cart.items];
      updateditems[existingindex] = updateditem;

      setcart({ items: updateditems, totalamount: updatedtotalamount });
    }
  };

  const cartcontext = {
    items: cart.items,
    totalamount: cart.totalamount,
    additem: additemtocarthandler,
    removeitem: removeitemfromcarthandler,
  };
  return (
    <Cartcontext.Provider value={cartcontext}>
      {props.children}
    </Cartcontext.Provider>
  );
};
export default Cartprovider;
