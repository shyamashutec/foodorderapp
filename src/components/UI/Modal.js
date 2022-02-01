import reactDom from "react-dom";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};
const Modaloverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalelement = document.getElementById("overlays");
const Modal = (props) => {
  return (
    <>
      {reactDom.createPortal(
        <Backdrop onClose={props.onclose}></Backdrop>,
        portalelement
      )}
      {reactDom.createPortal(
        <Modaloverlay>{props.children}</Modaloverlay>,
        portalelement
      )}
    </>
  );
};
export default Modal;
