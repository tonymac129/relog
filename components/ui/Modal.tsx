import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type ModalProps = {
  children: React.ReactNode;
  close: () => void;
};

function Modal({ children, close }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: Event) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("click", clickHandler);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("click", clickHandler);
      document.body.classList.remove("modal-open");
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-screen h-screen fixed z-11 top-0 left-0 bg-gray-300/70 dark:bg-gray-900/70 backdrop-blur-sm flex justify-center items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        ref={modalRef}
        className="bg-gray-200 dark:bg-gray-950 rounded-lg py-5 px-4 sm:px-8 w-[75%] sm:w-100 max-h-[95%] overflow-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
