import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import MessageBubble from "./messageBubble";
import MessageInput from "./MessageInput";

function ChatWindow() {
  const { roomId } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);

    const q = query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(messageList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3>Chat Room</h3>
      </div>

      <div className="messages">
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              text={message.text}
              isSent={message.senderId === user?.uid}
            />
          ))
        )}

        <div ref={bottomRef}></div>
      </div>

      <MessageInput roomId={roomId} />
    </div>
  );
}

export default ChatWindow;