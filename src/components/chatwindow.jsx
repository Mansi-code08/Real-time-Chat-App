import MessageBubble from "./messageBubble";
import MessageInput from "./MessageInput";

function ChatWindow() {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3>Mansi Bighane</h3>
      </div>

      <div className="messages">
        <MessageBubble text="Hi! How are you?" isSent={false} />
        <MessageBubble text="I'm good. How about you?" isSent={true} />
        <MessageBubble text="Doing great! Working on a project." isSent={false} />
        <MessageBubble text="Sounds interesting!" isSent={true} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;