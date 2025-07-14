import { useState } from "react";
import type { Utility } from "../types";
import MediaModal from "./MediaModal";

interface UtilityTileProps {
  utility: Utility;
}

const UtilityTile: React.FC<UtilityTileProps> = ({ utility }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    if (utility.media) {
      setIsModalOpen(true);
    } else {
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mediaElement = utility.media ? (
    utility.media.type === "mp4" ? (
      <video
        src={utility.media.src}
        controls
        autoPlay
        loop
        muted
        className="w-full h-full rounded-lg object-contain"
      />
    ) : (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "62.500%",
        }}
      >
        <iframe
          allow="fullscreen"
          allowFullScreen
          height="100%"
          src={utility.media.src}
          width="100%"
          style={{
            border: "none",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            overflow: "hidden",
          }}
        />
      </div>
    )
  ) : null;

  const thumbnailElement =
    utility.media && utility.media.type === "mp4" ? (
      <video
        src={utility.media.src}
        className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
        autoPlay
        muted
        loop
        playsInline
        onError={(e) =>
          console.error("Thumbnail video load error:", utility.media?.src, e)
        }
      />
    ) : (
      <img
        src={
          utility.thumbnail ||
          "https://via.placeholder.com/300x200?text=Utility"
        }
        alt={utility.name}
        className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
      />
    );

  return (
    <>
      <div
        className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 w-full"
        onClick={handleClick}
      >
        {thumbnailElement}
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
      {utility.media && (
        <MediaModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          mediaElement={mediaElement}
          title={utility.name}
          instructions={utility.instructions}
        />
      )}
    </>
  );
};

export default UtilityTile;
