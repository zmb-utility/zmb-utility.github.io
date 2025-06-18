import MapTile from "../components/MapTile";
import Header from "../components/Header";
import type { Map } from "../types";

import dust2Img from "../assets/maps/dust2.jpg";
import mirageImg from "../assets/maps/mirage.jpg";
import infernoImg from "../assets/maps/inferno.jpg";
import nukeImg from "../assets/maps/nuke.jpg";
import vertigoImg from "../assets/maps/vertigo.jpg";
import ancientImg from "../assets/maps/ancient.jpg";
import anubisImg from "../assets/maps/anubis.jpg";
import trainImg from "../assets/maps/train.jpg";
import overpassImg from "../assets/maps/overpass.jpg";

const maps: Map[] = [
  { name: "Dust II", image: dust2Img },
  { name: "Mirage", image: mirageImg },
  { name: "Inferno", image: infernoImg },
  { name: "Nuke", image: nukeImg },
  { name: "Vertigo", image: vertigoImg },
  { name: "Ancient", image: ancientImg },
  { name: "Anubis", image: anubisImg },
  { name: "Train", image: trainImg },
  { name: "Overpass", image: overpassImg },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="w-full p-6 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-full">
          {maps.map((map) => (
            <MapTile key={map.name} map={map} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
