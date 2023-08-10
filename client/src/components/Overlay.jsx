import { CSSTransition } from "react-transition-group";
const Overlay = ({ show, cancel }) => {
  return (
    <CSSTransition
      in={show}
      classNames={"overlay"}
      mountOnEnter
      unmountOnExit
      timeout={700}
    >
      <div
        onClick={cancel}
        className="z-10 h-screen w-screen bg-blue-950/95 fixed"
      ></div>
    </CSSTransition>
  );
};

export default Overlay;
