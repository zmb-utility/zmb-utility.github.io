import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  altText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  altText,
}) => {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-300 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Modal;
