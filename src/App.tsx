import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import UtilityListPage from "./pages/UtilityListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map/:mapName" element={<MapPage />} />
        <Route path="/map/:mapName/:side/:type" element={<UtilityListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
