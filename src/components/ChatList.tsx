import { gql, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { useUserId } from "@nhost/react";
import { Plus } from "lucide-react";
import ChatTile from "./ChatTile";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate } from "react-router-dom";

const GET_CHATS = gql`
    subscription GetChats($user_id: uuid!) {
        chats(where: { user_id: { _eq: $user_id } }) {
            id
            title
            created_at
        }
    }
`;

const INSERT_CHAT = gql`
    mutation InsertChat($title: String!, $user_id: uuid!) {
        insert_chats_one(object: { title: $title, user_id: $user_id }) {
            id
            title
        }
    }
`;

function ChatList() {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const userId = useUserId();
    if (!userId) return <div>no userid</div>;
    const [title, setTitle] = useState("");
    const [titleDialogVisible, setTitleDialogVisible] = useState(false);
    const { data, loading, error } = useSubscription(GET_CHATS, {
        variables: { user_id: userId },
        skip: !userId,
    });
    const [insertChat] = useMutation(INSERT_CHAT);

    interface Chat {
        id: string;
        title: string;
        created_at: string;
    }

    useEffect(() => {
        if (titleDialogVisible) {
            inputRef.current?.focus();
        }
    }, [titleDialogVisible]);
    const handleNewChat = () => {
        setTitleDialogVisible(true);
    };

    const handleCreateChat = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) return;
        await insertChat({ variables: { title, user_id: userId } });
        setTitle("");
        setTitleDialogVisible(false);
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime() - 5.5 * 60 * 60 * 1000; // for IST
        const diffInSeconds = Math.floor(diffInMs / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
            return "just now";
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${
                diffInMinutes === 1 ? "" : "s"
            } ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
        } else if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
        } else {
            return date.toLocaleDateString();
        }
    }

    if (!userId) return <p>Please sign in to view chats.</p>;
    if (loading) return <LoadingSpinner />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full flex flex-col items-center">
            <div
                className={`${
                    titleDialogVisible
                        ? "flex items-center justify-center"
                        : "hidden"
                } fixed h-screen w-screen backdrop-blur-xl`}
            >
                <div className="relative p-8 flex flex-col gap-y-3 items-center justify-center rounded-xl bg-blue-100/30 border border-blue-200 backdrop-blur-xl">
                    <p className="font-semibold">
                        Please enter a title for this chat.
                    </p>
                    <form onSubmit={handleCreateChat}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="bg-white w-full px-5 py-2 rounded-xl"
                            placeholder="chat title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="flex justify-end w-full mt-2">
                            <button
                                className="w-24 h-10 rounded-lg bg-blue-600 text-blue-50 font-semibold cursor-pointer hover:bg-blue-700"
                                type="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="p-16 flex items-center justify-center">
                <button
                    onClick={handleNewChat}
                    className="flex items-center gap-x-1 px-7 py-3 rounded-xl bg-blue-700 text-blue-50 font-bold text-xl cursor-pointer hover:bg-blue-800"
                >
                    <Plus strokeWidth={2} />
                    <p>New chat</p>
                </button>
            </div>
            <h2 className="w-[60vw] px-5 py-2 text-2xl font-semibold text-black/80">
                Recent chat history...
            </h2>

            <ul className="flex flex-col-reverse mx-auto">
                {data?.chats.map((chat: Chat) => (
                    <li key={chat.id}>
                        <ChatTile
                            title={chat.title}
                            time={formatDate(chat.created_at)}
                            onClick={() => navigate(`/chat/${chat.id}`)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
