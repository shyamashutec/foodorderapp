// import React from "react";
import { createContext } from "react";
const Cartcontext = createContext({
  items: [],
  totalamount: 0,
  additem: (item) => {},
  removeitem: (id) => {},
});
export default Cartcontext;
