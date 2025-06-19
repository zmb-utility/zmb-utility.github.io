import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { utilitiesData } from "../data"; // Import from data.ts
import dust2Img from "../assets/maps/dust2.jpg";
import mirageImg from "../assets/maps/mirage.jpg";
import infernoImg from "../assets/maps/inferno.jpg";
import nukeImg from "../assets/maps/nuke.jpg";
import vertigoImg from "../assets/maps/vertigo.jpg";
import ancientImg from "../assets/maps/ancient.jpg";
import anubisImg from "../assets/maps/anubis.jpg";
import trainImg from "../assets/maps/train.jpg";
import overpassImg from "../assets/maps/overpass.jpg";

// Map images for background
const mapImages: Record<string, string> = {
  "Dust II": dust2Img,
  Mirage: mirageImg,
  Inferno: infernoImg,
  Nuke: nukeImg,
  Vertigo: vertigoImg,
  Ancient: ancientImg,
  Anubis: anubisImg,
  Train: trainImg,
  Overpass: overpassImg,
};

const MapPage: React.FC = () => {
  const { mapName } = useParams<{ mapName: string }>();
  const navigate = useNavigate();
  const decodedMapName = mapName ? decodeURIComponent(mapName) : "Unknown Map";
  const backgroundImage = mapImages[decodedMapName] || "";

  // State to store utility counts
  const [utilityCounts, setUtilityCounts] = useState<{
    T: { Smoke: number; Molly: number; Flash: number };
    CT: { Smoke: number; Molly: number; Flash: number };
  }>({
    T: { Smoke: 0, Molly: 0, Flash: 0 },
    CT: { Smoke: 0, Molly: 0, Flash: 0 },
  });

  // Compute utility counts from utilitiesData
  useEffect(() => {
    const counts = {
      T: { Smoke: 0, Molly: 0, Flash: 0 },
      CT: { Smoke: 0, Molly: 0, Flash: 0 },
    };

    if (utilitiesData[decodedMapName]) {
      const sides: ("T" | "CT")[] = ["T", "CT"];
      const types: ("Smoke" | "Molly" | "Flash")[] = [
        "Smoke",
        "Molly",
        "Flash",
      ];

      sides.forEach((side) => {
        types.forEach((type) => {
          const utilities = utilitiesData[decodedMapName][side][type] || [];
          counts[side][type] = utilities.filter((u) => u.media).length;
        });
      });
    }

    setUtilityCounts(counts);
  }, [decodedMapName]);

  const handleButtonClick = (
    side: "T" | "CT",
    type: "Smoke" | "Molly" | "Flash"
  ) => {
    navigate(`/map/${encodeURIComponent(decodedMapName)}/${side}/${type}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main
        className="w-full p-6 flex-grow flex items-center justify-center relative"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for dimming */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="w-full max-w-4xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">{decodedMapName} Utilities</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              Back to Maps
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* T Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-red-500 text-center">
                Terrorist (T)
              </h3>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("T", "Smoke")}
              >
                Smoke ({utilityCounts.T.Smoke})
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("T", "Molly")}
              >
                Molly ({utilityCounts.T.Molly})
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("T", "Flash")}
              >
                Flash ({utilityCounts.T.Flash})
              </button>
            </div>
            {/* CT Column */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-blue-500 text-center">
                Counter-Terrorist (CT)
              </h3>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("CT", "Smoke")}
              >
                Smoke ({utilityCounts.CT.Smoke})
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("CT", "Molly")}
              >
                Molly ({utilityCounts.CT.Molly})
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg text-lg font-bold transition-colors duration-300"
                onClick={() => handleButtonClick("CT", "Flash")}
              >
                Flash ({utilityCounts.CT.Flash})
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapPage;
