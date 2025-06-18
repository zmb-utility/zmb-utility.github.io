import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UtilityTile from "../components/UtilityTile";
import type { Utility } from "../types";

import billPFP from "../assets/pfp/iambill.jpg";
import reitzyPFP from "../assets/pfp/reitzy.jpg";

const fameData: Utility[] = [
  {
    id: "brian-fame-1",
    name: "Leaping AK Headshot",
    description: "",
    thumbnail: reitzyPFP,
    media: {
      type: "streamable",
      src: "https://streamable.com/e/yzz0o3?",
    },
    instructions: "There's no way this should have hit.",
  },
  {
    id: "brian-fame-2",
    name: "Clean Deagle 3k",
    description: "",
    thumbnail: reitzyPFP,
    media: {
      type: "streamable",
      src: "https://streamable.com/e/d9alo3?",
    },
  },
  {
    id: "billy-fame-1",
    name: "Nice Little 4k Hold",
    description: "",
    thumbnail: billPFP,
    media: {
      type: "streamable",
      src: "https://streamable.com/e/w5xhie?",
    },
  },
];

const WallOfFamePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="w-full p-6 flex-grow relative">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Wall of Fame</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
            {fameData.length > 0 ? (
              fameData.map((utility) => (
                <UtilityTile key={utility.id} utility={utility} />
              ))
            ) : (
              <p className="text-gray-400 col-span-full text-center">
                No clips available.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WallOfFamePage;
