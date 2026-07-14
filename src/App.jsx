import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ProtectedRoute>
      <div className="container">
        <Sidebar />

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "10px",
            }}
          >
            {/* <button onClick={toggleTheme}>
              {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
            </button> */
            <button className="theme-btn" onClick={toggleTheme}>
  {theme === "light" ? "🌙" : "☀️"}
</button>}
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <div className="chat-area">
                  <h2>Select or Create a Chat Room</h2>
                </div>
              }
            />

            <Route
              path="/room/:roomId"
              element={<ChatWindow />}
            />
          </Routes>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default App;