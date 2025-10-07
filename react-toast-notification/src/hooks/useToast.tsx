import { useCallback, useRef, useState } from "react";
import Toast from "../components/Toast";

const useToast = (position) => {
  const [toasts, setToasts] = useState<null | []>([]);
  const toastIdRef = useRef(0);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showToast = useCallback((message, type) => {
    const id = toastIdRef.current++;
    setToasts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const ToastContainer = () => {
    if (toasts?.length === 0) return null;

    return (
      <div className={`toast-container ${position}`}>
        {toasts?.map((toast: any) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    );
  };

  return { showToast, ToastContainer };
};

export default useToast;
