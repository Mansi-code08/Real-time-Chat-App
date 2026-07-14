import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function MessageInput({ roomId }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user } = useAuth();

  const sendMessage = async () => {
    if (!text.trim() || !roomId) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: text.trim(),
        senderId: user.uid,
        senderName: user.displayName,
        senderPhoto: user.photoURL,
        timestamp: serverTimestamp(),
      });

      setText("");
      setShowEmojiPicker(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  return (
    <div
      className="chat-input"
      style={{ position: "relative" }}
    >
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        style={{
          fontSize: "22px",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        😊
      </button>

      {showEmojiPicker && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "0",
            zIndex: 1000,
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />

      <button onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default MessageInput;