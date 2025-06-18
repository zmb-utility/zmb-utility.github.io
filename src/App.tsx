import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import UtilityListPage from "./pages/UtilityListPage";
import WallOfFamePage from "./pages/WallOfFamePage";
import WallOfShamePage from "./pages/WallOfShamePage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/:mapName" element={<MapPage />} />
        <Route path="/map/:mapName/:side/:type" element={<UtilityListPage />} />
        <Route path="/wall-of-shame" element={<WallOfShamePage />} />
        <Route path="/wall-of-fame" element={<WallOfFamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
