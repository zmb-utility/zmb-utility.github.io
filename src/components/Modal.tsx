import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mp4Src: string;
  altText: string;
  instructions?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  mp4Src,
  altText,
  instructions,
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
      <div className="bg-gray-800 rounded-lg p-8 max-w-8xl w-full relative">
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[10] min-h-[500px]">
            <video
              src={mp4Src}
              controls
              autoPlay
              loop
              muted
              className="w-full h-full rounded-lg object-contain"
            />
          </div>
          <div className="flex-1 text-white p-4">
            <h3 className="text-2xl font-bold mb-6">{altText}</h3>
            {instructions ? (
              <p className="text-lg whitespace-pre-line">{instructions}</p>
            ) : (
              <p className="text-lg text-gray-400">No instructions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;