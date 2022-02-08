import { useRef, useState } from "react";
import classes from "./checkout.module.css";

const isempty = (value) => value.trim() === "";
const isnotchars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [forminputsvalid, setforminputsvalid] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameinput = useRef();
  const streetinput = useRef();
  const postalinput = useRef();
  const cityinput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameinput.current.value;
    const street = streetinput.current.value;
    const postal = postalinput.current.value;
    const city = cityinput.current.value;

    const enterednameisvalid = !isempty(name);
    const enteredstreetisvalid = !isempty(street);
    const enteredpostalisvalid = !isnotchars(postal);
    const enteredcityisvalid = !isempty(city);

    setforminputsvalid({
      name: enterednameisvalid,
      street: enteredstreetisvalid,
      city: enteredcityisvalid,
      postal: enteredpostalisvalid,
    });

    const formisvalid =
      enterednameisvalid &&
      enteredstreetisvalid &&
      enteredpostalisvalid &&
      enteredcityisvalid;

    if (!formisvalid) {
      return;
    }
    return props.onConfirm({
      name: name,
      street: street,
      postal: postal,
      city: city,
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          forminputsvalid.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameinput} />
        {!forminputsvalid.name && <p>Please enter a valid name</p>}
      </div>
      <div
        className={`${classes.control} ${
          forminputsvalid.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetinput} />

        {!forminputsvalid.street && <p>Please enter a valid street</p>}
      </div>
      <div
        className={`${classes.control} ${
          forminputsvalid.postal ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalinput} />

        {!forminputsvalid.postal && (
          <p>Please enter a valid postalcode(5 characters)</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          forminputsvalid.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityinput} />

        {!forminputsvalid.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};
export default Checkout;
