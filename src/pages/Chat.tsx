import { Navigate, useParams } from "react-router-dom";

function Chat() {
    const { chatId } = useParams();
    return <div>chat: {chatId}</div>;
}

export default Chat;
