function MessageBubble({ text, isSent }) {
return (
<div className={`message ${isSent ? "sent" : "received"}`}>
{text} </div>
);
}

export default MessageBubble;
