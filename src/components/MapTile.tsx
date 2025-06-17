import type { Map } from "../types";
import { useNavigate } from "react-router-dom";

interface MapTileProps {
  map: Map;
}

const MapTile: React.FC<MapTileProps> = ({ map }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/map/${encodeURIComponent(map.name)}`);
  };

  return (
    <div
      className="relative group bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 w-full"
      onClick={handleClick}
    >
      <img
        src={map.image}
        alt={map.name}
        className="w-full h-48 object-cover group-hover:opacity-70 transition-opacity duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center">
        <h2
          className="text-white text-xl font-bold"
          style={{
            textShadow:
              "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
          }}
        >
          {map.name}
        </h2>
      </div>
    </div>
  );
};

export default MapTile;
