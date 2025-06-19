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
          instructions:
            "Stand in the corner, aim at the top of the roof, and jump throw.",
        },
        {
          id: "dust2-t-long-a-cross",
          name: "Long A Cross",
          description: "Long cross smoke to take A",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/T_LONG_A_CROSS.mp4",
          },
          instructions: "Stand at the corner of the dumpster and regular throw",
        },
        {
          id: "dust2-t-ct-from-xbox",
          name: "CT Spawn",
          description: "CT spawn smoke from X-box",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/T_SMOKE_CT_FROM_XBOX.mp4",
          },
          instructions:
            "1. Crouch in the corner\n2. Aim at the little bolt\n3. Jump throw WHILE crouching",
        },
      ],
      Molly: [
        {
          id: "dust2-t-molly-1",
          name: "Car Molly",
          description: "Burns Car at Long A.",
          media: {
            type: "mp4",
            src: "/assets/dust2/mollies/CAR.mp4",
          },
          instructions:
            "1. Stand on the blue barrel.\n2. Aim at the doorknob.\n3. Jump throw",
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
          instructions: "Jump throw",
        },
      ],
    },
    CT: {
      Smoke: [
        {
          id: "dust2-ct-a-long-doors",
          name: "Long Doors A",
          description: "Smokes long doors from CT.",
          media: {
            type: "mp4",
            src: "/assets/dust2/smokes/CT_A_LONG_DOORS.mp4",
          },
          instructions:
            "Stand in the corner, aim above the window and jump throw",
        },
      ],
      Molly: [
        {
          id: "dust2-molly-b-site",
          name: "B Site over Window",
          description: "Molly B site and under window",
          media: {
            type: "mp4",
            src: "/assets/dust2/mollies/B_SITE.mp4",
          },
          instructions:
            "1. Stand in the corner under jump spot\n2. Aim in the middle of the wood boards\n3. Jump throw",
        },
        {
          id: "dust2-molly-b-plat",
          name: "B Platform over doors",
          description: "Molly B plat over doors.",
          media: {
            type: "mp4",
            src: "/assets/dust2/mollies/B_PLAT.mp4",
          },
          instructions:
            "1. Stand in the corner\n2. Aim at the iron\n3. Jump throw",
        },
      ],
      Flash: [
        {
          id: "dust2-ct-a-pop-flash",
          name: "Long A Pop Flash",
          description: "Pop flash T's running out doors.",
          media: {
            type: "mp4",
            src: "/assets/dust2/flashes/CT_LONG_POP.mp4",
          },
          instructions: "Run and throw at the wall sticking out.",
        },
      ],
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
    T: {
      Smoke: [
        {
          id: "train-t-camera-smoke",
          name: "Smoke Camera from T Spawn",
          description: "Smoke camera",
          media: {
            type: "mp4",
            src: "/assets/train/smokes/T_IVY_SMOKE.mp4",
          },
          instructions:
            "1. Stand in the corner by the pillar\n2. Aim at the corner of the roof\n3. Jump throw",
        },
        {
          id: "train-t-z-smoke",
          name: "Smoke Z from T Spawn",
          description: "",
          media: {
            type: "mp4",
            src: "/assets/train/smokes/T_Z_SMOKE.mp4",
          },
          instructions:
            "1. Stand in the corner by the pillar\n2. Aim at the cross section in the roof\n3. Jump throw",
        },
        {
          id: "train-t-z-smoke-from-b",
          name: "Smoke Z from upper B",
          description: "",
          media: {
            type: "mp4",
            src: "/assets/train/smokes/T_Z_FROM_B.mp4",
          },
          instructions:
            "1. Stand in the corner by this post\n 2. Aim at the light\n3. Regular throw",
        },
        {
          id: "train-t-camera-from-lockers",
          name: "Camera from Lockers",
          description: "Smokes camera on A from lockers of upper B",
          media: {
            type: "mp4",
            src: "/assets/train/smokes/T_CAMERA_SMOKE_FROM_LOCKERS.mp4",
          },
          instructions:
            "1. Shoot out the window\n2. Line up on the bottom stair\n3. Aim and regular throw",
        },
        {
          id: "train-t-red-train",
          name: "Red Train / E-box",
          description: "Smokes off E-box vision from A main",
          media: {
            type: "mp4",
            src: "/assets/train/smokes/T_RED_TRAIN.mp4",
          },
          instructions:
            "1. Stand in the corner\n2. Aim at the top of the dumpster\n3. Jump throw",
        },
      ],
      Molly: [
        {
          id: "train-t-molly-b-site",
          name: "B Site Train",
          description: "B site molly from upper B",
          media: {
            type: "mp4",
            src: "/assets/train/mollies/T_MOLLY_B_SITE.mp4",
          },
          instructions:
            "1. Stand in the corner by this post\n2. Aim at the corner of the wall\n3. Run and throw",
        },
      ],
      Flash: [
        {
          id: "train-t-godflash",
          name: "GODFLASH",
          description: "",
          media: {
            type: "mp4",
            src: "/assets/train/flashes/T_GODFLASH.mp4",
          },
          instructions:
            "1. Stand in front of the green sign\n2. Aim at the middle of the electrical box\n3. Jump throw",
        },
      ],
    },
    CT: {
      Smoke: [],
      Molly: [
        {
          id: "train-ct-molly-a-main",
          name: "A Main",
          description: "Fast molly for A Main",
          media: {
            type: "mp4",
            src: "/assets/train/mollies/CT_MOLLY_A_MAIN.mp4",
          },
          instructions:
            "1. Aim at the red spot by the rubble on the ground\n2. Run until you reach the corner of the wall\n3. Jump throw while running",
        },
      ],
      Flash: [],
    },
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
