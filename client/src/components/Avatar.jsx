const Avatar = ({ online, username, userId }) => {
  const colors = [
    "bg-rose-200",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-black",
    "bg-green-200",
    "bg-pink-200",
    "bg-teal-300",
  ];

  const nameCode = userId.charCodeAt(0) + userId.charCodeAt(userId.length - 1);
  const index = nameCode % colors.length;
  const color = colors[index];

  return (
    <div className="overflow-ellipsis break-words overflow-hidden flex items-center rounded-sm gap-3 mb-3 p-5 text-black border-2 ">
      <div>
        <div
          className={`relative flex items-center justify-center w-10 h-10   rounded-full ${color}`}
        >
          <span>{username[0]}</span>
          <div
            className={`h-3 w-3 min-h-3 min-w-3 rounded-full ${
              online ? "bg-green-600" : "bg-red-500"
            } absolute right-0 bottom-0`}
          ></div>
        </div>
      </div>
      {username}
    </div>
  );
};

export default Avatar;
