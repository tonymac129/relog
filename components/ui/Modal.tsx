import { useEffect, useRef } from "react";

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

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  });

  return (
    <div className="w-screen h-screen fixed z-11 top-0 left-0 bg-gray-300/70 dark:bg-gray-900/70 backdrop-blur-sm flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-gray-200 dark:bg-gray-950 rounded-lg py-5 px-4 sm:px-8 w-[75%] sm:w-100 max-h-[95%] overflow-auto"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
