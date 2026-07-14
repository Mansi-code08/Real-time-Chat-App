import "./App.css";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <div className="container">
        <Sidebar />
        <ChatWindow />
      </div>
    </ProtectedRoute>
  );
}

export default App;