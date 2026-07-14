import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rooms"),
      (snapshot) => {
        const roomList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setRooms(roomList);
      }
    );

    return () => unsubscribe();
  }, []);

  const createRoom = async () => {
    const roomName = prompt("Enter room name");

    if (!roomName) return;

    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        name: roomName,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
      });

      // Open the newly created room
      navigate(`/room/${docRef.id}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>ChatApp</h2>
      </div>

      {user && (
        <div className="user-info">
          <img
            src={user.photoURL}
            alt="Profile"
            width="50"
            style={{ borderRadius: "50%" }}
          />

          <h3>{user.displayName}</h3>

          <button onClick={() => signOut(auth)}>
            Logout
          </button>
        </div>
      )}

      <button onClick={createRoom} className="new-room-btn">
        + New Room
      </button>

      <div className="contacts">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="contact-card"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <h4>{room.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;