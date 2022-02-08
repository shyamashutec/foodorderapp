import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./Availablemeals.module.css";
import Mealitem from "./MealItem/Mealitem";

const Availablemeals = (props) => {
  const [isloading, setisloading] = useState(false);
  const [meals, setmeals] = useState([]);
  const [httperror, setiserror] = useState(false);
  useEffect(() => {
    async function fetchmeals() {
      setisloading(true);

      const response = await fetch(
        "https://react-http-7ffca-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error();
      }
      const responsedata = await response.json();

      setmeals(responsedata);
      setisloading(false);
    }

    fetchmeals().catch((Error) => {
      setisloading(false);
      setiserror(true);
    });
  }, []);
  const meallist = meals.map((item) => {
    return (
      <Mealitem
        key={item.id}
        id={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
      />
    );
  });
  if (httperror) {
    return <p>something wrong</p>;
  }
  if (isloading) {
    return <p>loading</p>;
  } else {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{meallist}</ul>
        </Card>
      </section>
    );
  }
};
export default Availablemeals;
