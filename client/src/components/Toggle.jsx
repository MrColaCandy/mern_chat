const Toggle = ({ toggle, className, on, onIcon, offIcon }) => {
  return (
    <div onClick={toggle} className={className}>
      {on ? onIcon : offIcon}
    </div>
  );
};

export default Toggle;
