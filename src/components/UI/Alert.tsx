import { TbInfoSquareRoundedFilled } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from "react";
import { CSSTransition } from 'react-transition-group';

type dataProp = {
  type: "simple" | "danger" | "warning" | "success";
  message: string;
  toggleAlert?: boolean;
};

export default function Alert({ type, message, toggleAlert }: dataProp) {
  const [showAlert, setShowAlert] = useState<boolean>(toggleAlert || true);

  useEffect(() => {
    if (toggleAlert !== undefined) {
      setShowAlert(toggleAlert);
    }
  }, [toggleAlert]);

  return (
    <CSSTransition
      in={showAlert}
      timeout={300}
      classNames="alert-slide"
      unmountOnExit
    >
      <div
        aria-live="assertive"
        className={`flex items-center p-4 my-5 rounded-md border-b-4 dark:bg-gray-800 dark:text-gray-200 transition-all duration-300 ease-in-out ${
          type === "simple"
            ? "text-blue-800 border-blue-300 bg-blue-50 dark:border-blue-800 dark:text-blue-400"
            : type === "danger"
            ? "text-red-800 border-red-300 bg-red-50 dark:border-red-800 dark:text-red-400"
            : type === "warning"
            ? "text-yellow-800 border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:text-yellow-300"
            : "text-green-800 border-green-300 bg-green-50 dark:border-green-800 dark:text-green-400"
        }`}
      >
        <TbInfoSquareRoundedFilled className="w-4 h-4" />
        <div className="ms-3 text-sm font-medium">{message}</div>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8"
          onClick={() => setShowAlert(false)}
        >
          <span className="sr-only">Dismiss</span>
          <IoMdClose className="w-3 h-3" />
        </button>
      </div>
    </CSSTransition>
  );
}
