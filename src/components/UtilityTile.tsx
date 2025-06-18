import { useState } from "react";
import type { Utility } from "../types";
import Modal from "./Modal";

interface UtilityTileProps {
  utility: Utility;
}

const UtilityTile: React.FC<UtilityTileProps> = ({ utility }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    console.log("Tile clicked:", { id: utility.id, mp4: utility.mp4 });
    if (utility.id === "dust2-t-smoke-b-window-and-door" && utility.mp4) {
      console.log("Opening modal for", utility.name);
      setIsModalOpen(true);
    } else {
      console.log(`Selected utility: ${utility.name}`);
    }
  };

  const handleCloseModal = () => {
    console.log("Closing modal");
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 w-full"
        onClick={handleClick}
      >
        {utility.mp4 ? (
          <video
            src={utility.mp4}
            className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x200?text=Utility"
            alt={utility.name}
            className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
          <h3
            className="text-white text-xl font-bold"
            style={{
              textShadow:
                "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            }}
          >
            {utility.name}
          </h3>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-sm">{utility.description}</p>
        </div>
      </div>
      {utility.id === "dust2-t-smoke-b-window-and-door" && utility.mp4 && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mp4Src={utility.mp4}
          altText={utility.name}
          instructions={utility.instructions}
        />
      )}
    </>
  );
};

export default UtilityTile;