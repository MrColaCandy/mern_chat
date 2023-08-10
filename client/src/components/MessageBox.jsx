import Lottie from "lottie-react";
import start from "../assets/animations/start.json";
import lodash from "lodash";
import axios from "axios";
import { useState } from "react";
import Image from "./Image";

const MessageBox = ({
  selectedUserId,
  messages,
  messageBoxEnd,
  sendMessage,
  sendFile,
  setMessage,
  message,
}) => {
  const [showImage, setShowImage] = useState(null);
  return (
    <>
      <Image
        src={showImage?.src}
        show={showImage}
        cancel={() => setShowImage(null)}
      />
      <div className=" bg-blue-400 flex flex-col items-stretch justify-center w-2/3 p-5">
        <div className="flex-grow overflow-y-scroll p-10 ">
          {!selectedUserId && <Lottie animationData={start} />}
          {!!selectedUserId && messages.length != 0 && (
            <div>
              {lodash
                .unionBy(messages, (m) => m._id)
                .map((m, index) => {
                  return (
                    <div
                      key={index}
                      className={`${m.isOurs ? " text-right" : "text-left"}  `}
                    >
                      <div
                        className={`${
                          m.isOurs
                            ? " bg-cyan-700 rounded-r-full rounded-tl-full xl:mr-96 md:mr-52"
                            : " bg-blue-600 rounded-l-full rounded-tr-full  xl:ml-96 md:ml-52  "
                        } px-6 py-2 text-white mb-5 break-words   `}
                        key={index}
                      >
                        <div className="  text-ellipsis p-3 ">
                          {m.message && m.message}
                          {!m.message && (
                            <div className="flex  justify-center items-center">
                              <a
                                onClick={() =>
                                  setShowImage({
                                    src:
                                      axios.defaults.baseURL +
                                      "uploads/" +
                                      m.file,
                                  })
                                }
                                href="#"
                              >
                                <div
                                  style={{
                                    backgroundImage: `url('${
                                      axios.defaults.baseURL +
                                      "uploads/" +
                                      m.file
                                    }')`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                  }}
                                  className=" mr-3 rounded-3xl w-40 h-28 bg-red-500"
                                ></div>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="h-1" ref={messageBoxEnd}></div>
        </div>
        <div>
          {!!selectedUserId && (
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(message);
              }}
              className="flex"
            >
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                type="text"
                className=" bg-blue-100  p-3 flex-grow  rounded-sm"
              />
              <label className="bg-blue-300 p-3 text-blue-800 rounded-sm cursor-pointer">
                <input
                  onChange={(e) => {
                    sendFile(e);
                  }}
                  type="file"
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <button className=" bg-blue-500 p-3 text-white rounded-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default MessageBox;
