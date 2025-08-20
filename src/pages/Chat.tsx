import React, { useState, useRef, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery, useSubscription, useMutation } from "@apollo/client";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import { PulseLoader } from "react-spinners";
import {
    Send,
    Bot,
    User,
    Loader2,
    ArrowLeft,
    MessageSquare,
} from "lucide-react";
import {
    GET_CHAT,
    SUBSCRIBE_TO_MESSAGES,
    INSERT_MESSAGE,
    SEND_MESSAGE,
} from "../graphql/queries";
interface Chat {
    id: string;
    title: string;
    user_id: string;
    created_at: string;
}

interface Message {
    id: string;
    content: string;
    is_bot: boolean;
    created_at: string;
    chat_id: string;
}

export default function ChatPage() {
    const { chatId } = useParams<{ chatId: string }>();
    const { isAuthenticated, isLoading: authLoading } =
        useAuthenticationStatus();
    const user = useUserData();
    const [inputMessage, setInputMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // GraphQL operations
    const {
        data: chatData,
        loading: chatLoading,
        error: chatError,
    } = useQuery(GET_CHAT, {
        variables: { chatId },
        skip: !chatId || !isAuthenticated,
    });

    const { data: messagesData, loading: messagesLoading } = useSubscription(
        SUBSCRIBE_TO_MESSAGES,
        {
            variables: { chatId },
            skip: !chatId || !isAuthenticated,
        }
    );

    const [insertMessage] = useMutation(INSERT_MESSAGE);
    const [sendMessageAction] = useMutation(SEND_MESSAGE);

    const messages: Message[] = messagesData?.messages || [];
    const chat: Chat | null = chatData?.chats_by_pk || null;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || !chatId || isSending) return;

        setIsSending(true);
        const messageContent = inputMessage.trim();
        setInputMessage("");

        try {
            await insertMessage({
                variables: {
                    content: messageContent,
                    chat_id: chatId,
                    isBot: false,
                },
            });
            setIsReplying(true);
            await sendMessageAction({
                variables: {
                    chat_id: chatId,
                    content: messageContent,
                },
            });
            setIsReplying(false);
        } catch (error) {
            console.error("Error sending message:", error);
            setInputMessage(messageContent); // Restore message on error
        } finally {
            setIsSending(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Loading and authentication checks
    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (!chatId) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">
                        Invalid Chat
                    </h2>
                    <p className="text-slate-500">
                        The chat ID is missing or invalid.
                    </p>
                </div>
            </div>
        );
    }

    if (chatError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <MessageSquare className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-slate-700 mb-2">
                        Error Loading Chat
                    </h2>
                    <p className="text-slate-500">
                        Unable to load the chat. Please try again.
                    </p>
                </div>
            </div>
        );
    }

    if (chatLoading || messagesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Loading chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => window.history.back()}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                            >
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-slate-900">
                                        {chat?.title || "AI Chat"}
                                    </h1>
                                    <p className="text-sm text-slate-500">
                                        Always here to help
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                            <User className="w-4 h-4" />
                            <span>{user?.email}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-4 py-6 max-w-4xl mx-auto w-full">
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center py-12">
                            <Bot className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-600 mb-2">
                                Start a conversation
                            </h3>
                            <p className="text-slate-500">
                                Send a message to begin chatting with the AI
                                assistant.
                            </p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start space-x-3 ${
                                    !message.is_bot
                                        ? "flex-row-reverse space-x-reverse"
                                        : ""
                                }`}
                            >
                                {/* Avatar */}
                                <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                        message.is_bot
                                            ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                            : "bg-gradient-to-r from-slate-600 to-slate-700"
                                    }`}
                                >
                                    {message.is_bot ? (
                                        <Bot className="w-4 h-4 text-white" />
                                    ) : (
                                        <User className="w-4 h-4 text-white" />
                                    )}
                                </div>

                                {/* Message Bubble */}
                                <div
                                    className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                                        !message.is_bot ? "ml-auto" : "mr-auto"
                                    }`}
                                >
                                    <div
                                        className={`rounded-2xl px-4 py-3 shadow-sm ${
                                            message.is_bot
                                                ? "bg-white border border-slate-200 text-slate-800"
                                                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {message.content}
                                        </p>
                                    </div>
                                    <p
                                        className={`text-xs text-slate-500 mt-1 ${
                                            !message.is_bot
                                                ? "text-right"
                                                : "text-left"
                                        }`}
                                    ></p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                    {isReplying && <PulseLoader color="#8336fa" />}
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 px-4 py-4">
                <div className="flex items-end space-x-3 max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            disabled={isSending}
                            className="w-full px-4 py-3 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        />
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isSending}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {isSending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="text-xs text-slate-500 text-center mt-2">
                    Press Enter to send • Shift + Enter for new line
                </p>
            </div>
        </div>
    );
}
