import mealsimg from "../../assests/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartbutton from "./HeaderCartbutton";
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartbutton onClick={props.onshowcart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsimg}></img>
      </div>
    </>
  );
};
export default Header;
