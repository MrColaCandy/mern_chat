import { CSSTransition } from "react-transition-group";
const Modal = ({ title, body, footer, show = false }) => {
  return (
    <>
      <CSSTransition
        timeout={500}
        in={show}
        classNames={"modal"}
        mountOnEnter
        unmountOnExit
      >
        <div className=" fixed top-52 right-62 z-20 w-96 p-4 h-64 bg-white rounded-md flex flex-col justify-between  text-center">
          <div className=" p-3 rounded-sm bg-blue-400">{title}</div>
          <div className="p-3">{body}</div>
          <div className="flex gap-2 items-center justify-center border-t-4 p-3">
            {footer}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Modal;
