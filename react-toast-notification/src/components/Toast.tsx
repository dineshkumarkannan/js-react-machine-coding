import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Toast.css";
import { CiCircleCheck, CiCircleInfo, CiCircleRemove } from "react-icons/ci";

const Icons = {
  closeIcon: <AiOutlineCloseCircle />,
  success: <CiCircleCheck />,
  info: <CiCircleInfo />,
  error: <CiCircleRemove />,
};

const Toast = ({ message, type = "success", onClose = () => {} }) => {
  return (
    <div className={`toast ${type}`}>
      <span className="toast-content">
        <span className="icon">{Icons[type]}</span>
        <span>{message}</span>
      </span>
      <span className="closeBtn" onClick={onClose}>
        {Icons.closeIcon}
      </span>
    </div>
  );
};

export default Toast;
