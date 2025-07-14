import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import type { SteamUserStatsResponse, SteamVanityURLResponse } from "../types";

const CS2_APP_ID = 730;

/**
 * URL for testing from a local server
 * Eventually this will be upgraded to a live server on a Raspberry Pi
 */
const API_BASE_URL = "http://localhost:3001";

const PlayerStatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<
    SteamUserStatsResponse["playerstats"] | null
  >(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resolveVanityURL = async (vanity: string): Promise<string | null> => {
    try {
      const response = await axios.get<SteamVanityURLResponse>(
        `${API_BASE_URL}/api/steam/resolve-vanity`,
        {
          params: { vanityurl: vanity },
        }
      );
      if (response.data.response.success === 1) {
        return response.data.response.steamid || null;
      }
      return null;
    } catch {
      return null;
    }
  };

  const fetchStats = async (steamId: string) => {
    setLoading(true);
    setError("");
    setStats(null);

    try {
      const response = await axios.get<SteamUserStatsResponse>(
        `${API_BASE_URL}/api/steam/user-stats`,
        {
          params: { steamid: steamId, appid: CS2_APP_ID },
        }
      );
      setStats(response.data.playerstats);
    } catch (err) {
      setError(
        "Failed to fetch stats. Ensure the Steam ID is valid and the profile/game details are public."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      setError("Please enter a Steam ID or vanity URL.");
      return;
    }

    let steamId = input.trim();
    if (!/^\d{17}$/.test(steamId)) {
      const resolvedId = await resolveVanityURL(steamId);
      if (!resolvedId) {
        setError("Invalid vanity URL or unable to resolve Steam ID.");
        return;
      }
      steamId = resolvedId;
    }

    await fetchStats(steamId);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="w-full p-6 flex-grow flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="w-full max-w-4xl relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Player Stats (CS2)</h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              Back to Maps
            </button>
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter SteamID64 or Vanity URL (e.g., id/username)"
                className="flex-grow bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Fetch Stats"}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
          {stats && (
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Stats for {stats.steamID} ({stats.gameName})
              </h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-2">Stat Name</th>
                    <th className="p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.stats.map((stat) => (
                    <tr key={stat.name} className="border-t border-gray-600">
                      <td className="p-2">
                        {stat.name.replace(/total_/g, "").replace(/_/g, " ")}
                      </td>
                      <td className="p-2">{stat.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PlayerStatsPage;
