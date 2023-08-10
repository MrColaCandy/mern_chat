import Avatar from "./Avatar";

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path
      fillRule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      clipRule="evenodd"
    />
  </svg>
);
const Users = ({
  username,
  users,
  setSelectedUserId,
  selectedUserId,
  logout,
}) => {
  return (
    <div className="flex w-1/3  flex-col">
      <div className="fixed p-5 flex justify-between font-extrabold text-white bg-blue-300 border-b-4 w-1/3 z-10">
        BLUE CHAT
        <div className="flex gap-3 items-center">
          <span className=" text-sm text-white ">{username}</span>
          <span className=" text-sm text-white ">{userIcon}</span>
        </div>
      </div>
      <div className=" bg-blue-300 my-16 flex-grow  overflow-y-scroll">
        <div className="  p-5 truncate">
          {users.map((u) => (
            <div
              onClick={() => {
                setSelectedUserId(u._id);
              }}
              key={u._id}
              className={`${u._id === selectedUserId ? " bg-blue-400" : ""}`}
            >
              <Avatar online={u.online} username={u.username} userId={u._id} />
            </div>
          ))}
        </div>
        <div className="fixed w-1/3 p-5  bottom-0 text-center font-extrabold text-white border-t-4 bg-blue-300">
          <button onClick={() => logout()}>LOGOUT</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
