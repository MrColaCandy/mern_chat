import { CSSTransition } from "react-transition-group";
const Image = ({ src, show = false, cancel }) => {
  return (
    <>
      <CSSTransition
        timeout={500}
        in={show}
        classNames={"modal"}
        mountOnEnter
        unmountOnExit
      >
        <div
          onClick={cancel}
          className=" fixed flex flex-col justify-center items-center h-screen w-screen bg-blue-600/80 z-10"
        >
          <div className="mx-5" onClick={(e) => e.stopPropagation()}>
            <img width={"100%"} height={"100%"} src={src} alt="image" />
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default Image;
