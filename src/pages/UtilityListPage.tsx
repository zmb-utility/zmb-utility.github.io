import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UtilityTile from "../components/UtilityTile";
import type { Utility } from "../types";
import dust2Img from "../assets/maps/dust2.jpg";
import mirageImg from "../assets/maps/mirage.jpg";
import infernoImg from "../assets/maps/inferno.jpg";
import nukeImg from "../assets/maps/nuke.jpg";
import vertigoImg from "../assets/maps/vertigo.jpg";
import ancientImg from "../assets/maps/ancient.jpg";
import anubisImg from "../assets/maps/anubis.jpg";
import trainImg from "../assets/maps/train.jpg";
import overpassImg from "../assets/maps/overpass.jpg";

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

const utilitiesData: Record<
  string,
  Record<string, Record<"Smoke" | "Molly" | "Flash", Utility[]>>
> = {
  "Dust II": {
    T: {
      Smoke: [
        {
          id: "dust2-t-smoke-b-window-and-door",
          name: "B Smoke Window and Door",
          description: "Smokes B Site Window and Door.",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/T_B_WINDOW_AND_DOOR.mp4",
          },
          instructions:
            "1. Stand in the corner\n2. Aim at the small dot and jump throw to smoke window.\n3. Aim above the blob and jump throw to smoke door.",
        },
        {
          id: "dust2-t-xbox",
          name: "X-box",
          description: "X-box Smoke",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/T_XBOX.mp4",
          },
          instructions: "Stand in the corner, aim at the top of the roof, and jump throw."

        },
        {
          id: "dust2-t-long-a-cross",
          name: "Long A Cross",
          description: "Long cross smoke to take A",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/T_LONG_A_CROSS.mp4",
          },
          instructions: "Stand at the corner of the dumpster and regular throw"

        },
      ],
      Molly: [
        {
          id: "dust2-t-molly-1",
          name: "Car Molly",
          description: "Burns Car at Long A.",
        },
      ],
      Flash: [
        {
          id: "dust2-long-a-pop-flash",
          name: "Long A Pop",
          description: "Pop flash CTs playing corner",
          media: {
            type: "mp4",
            src: "/assets/dust2/flashes/LONG_A_FLASH.mp4",
          },
          instructions: "Jump throw"
        },
      ],
    },
    CT: {
      Smoke: [],
      Molly: [],
      Flash: [],
    },
  },
  Mirage: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Inferno: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Nuke: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Vertigo: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Ancient: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Anubis: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Train: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
  Overpass: {
    T: { Smoke: [], Molly: [], Flash: [] },
    CT: { Smoke: [], Molly: [], Flash: [] },
  },
};

const UtilityListPage: React.FC = () => {
  const { mapName, side, type } = useParams<{
    mapName: string;
    side: "T" | "CT";
    type: "Smoke" | "Molly" | "Flash";
  }>();
  const navigate = useNavigate();
  const decodedMapName = mapName ? decodeURIComponent(mapName) : "Unknown Map";
  const validSide: "T" | "CT" = side === "T" || side === "CT" ? side : "T";
  const validType: "Smoke" | "Molly" | "Flash" = [
    "Smoke",
    "Molly",
    "Flash",
  ].includes(type || "")
    ? (type as "Smoke" | "Molly" | "Flash")
    : "Smoke";

  console.log("Decoded Map Name:", decodedMapName);

  const backgroundImage = mapImages[decodedMapName] || "";
  const utilities =
    utilitiesData[decodedMapName]?.[validSide]?.[validType] || [];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main
        className="w-full p-6 flex-grow relative"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {decodedMapName} {validSide} {validType} Utilities
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={() =>
                navigate(`/map/${encodeURIComponent(decodedMapName)}`)
              }
            >
              Back to {decodedMapName}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
            {utilities.length > 0 ? (
              utilities.map((utility) => (
                <UtilityTile key={utility.id} utility={utility} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No {validType.toLowerCase()} utilities available for{" "}
                {decodedMapName} {validSide}.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UtilityListPage;
