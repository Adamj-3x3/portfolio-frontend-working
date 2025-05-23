import { useEffect, useState } from "react";

export default function App() {
  const [nav, setNav] = useState("Loading...");
  const [lastUpdated, setLastUpdated] = useState(null);
  const contractAddress = "0xb1faa7Ec27010f3fAe56842D76A24D319f58A24f";

  const fetchNAV = async () => {
    try {
      const res = await fetch("https://portfoliocoin-nav-backend.onrender.com/nav", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors"
      });

      const data = await res.json();
      setNav(data.nav);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      console.error("Failed to fetch NAV:", err);
      setNav("Unavailable");
      setLastUpdated(null);
    }
  };

  useEffect(() => {
    fetchNAV(); // Run once on page load

    const interval = setInterval(() => {
      fetchNAV(); // Auto-refresh every hour (3600000 ms)
    }, 3600000);

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">PortfolioCoin (PORT)</h1>
        <p className="text-lg text-gray-600 mb-6">
          A synthetic token tracking a portfolio of top stocks.
        </p>

        <div className="bg-white p-4 rounded-2xl shadow-xl border border-blue-200 mb-6">
          <h2 className="text-xl font-semibold mb-2">Live NAV</h2>
          <p className="text-2xl text-blue-500">{nav}</p>
          {lastUpdated && (
            <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdated}</p>
          )}
        </div>

        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2">Token Details</h2>
          <p><strong>Symbol:</strong> PORT</p>
          <p><strong>Total Supply:</strong> 1,000,000</p>
          <p>
            <strong>Contract Address:</strong>{" "}
            <a
              href={`https://sepolia.basescan.org/address/${contractAddress}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              {contractAddress}
            </a>
          </p>
        </div>

        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          onClick={() => alert("Buy PORT coming soon!")}
        >
          Buy PORT
        </button>
      </div>
    </div>
  );
}

