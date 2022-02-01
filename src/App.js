import { useState } from "react";

import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cartprovider from "./store/Cardprovider";
function App() {
  const [cartisshown, setcartisshown] = useState(false);
  const showcarthandler = () => {
    setcartisshown(true);
  };
  const hidecarthandler = () => {
    setcartisshown(false);
  };

  return (
    <Cartprovider>
      {cartisshown && <Cart onhidecart={hidecarthandler} />}
      <Header onshowcart={showcarthandler} />
      <main>
        <Meals />
      </main>
    </Cartprovider>
  );
}

export default App;
