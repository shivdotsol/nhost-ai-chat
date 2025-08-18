function ChatTile({
    title,
    time,
    onClick,
}: {
    title: string;
    time: string;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="w-[60vw] px-7 py-5 m-2 flex flex-col border border-blue-200 bg-blue-50 rounded-2xl hover:scale-[1.025] hover:bg-blue-100/70 cursor-pointer"
        >
            <div className="w-full text-xl font-bold text-black/80 capitalize">
                {title}
            </div>
            <div className="w-full flex justify-end text-black/60">{time}</div>
        </div>
    );
}

export default ChatTile;
