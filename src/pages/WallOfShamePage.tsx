import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import UtilityTile from "../components/UtilityTile";
import type { Utility } from "../types";
import billPFP from "../assets/pfp/iambill.jpg";

const shameData: Utility[] = [
  {
    id: "billy-shame-1",
    name: "Big Whiff",
    description: "I am Bill",
    thumbnail: billPFP,
    media: {
      type: "streamable",
      src: "https://streamable.com/e/ciaj3m?",
    },
    instructions:
      "Went from a wall of fame clip to a wall of shame clip real fast.",
  },
  {
    id: "billy-shame-2",
    name: "Sorry Ryan",
    description: "I am Bill",
    thumbnail: billPFP,
    media: {
      type: "streamable",
      src: "https://www.youtube.com/embed/OWGcFNrQYiY?si=tlBPVTfIuNt8GbOj",
    },
    instructions: "",
  },
];

const WallOfShamePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="w-full p-6 flex-grow relative">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Wall of Shame</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
            {shameData.length > 0 ? (
              shameData.map((utility) => (
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

export default WallOfShamePage;
