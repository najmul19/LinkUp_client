// StoryCard.jsx
export const StoryCard = ({ label, image, content, isCreate, onClick }) => (
  <div
    onClick={onClick}
    className="w-32 h-48 bg-white rounded-xl shadow relative overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform p-2"
  >
    {isCreate ? (
      <div className="text-center text-gray-500 font-semibold">
        +<br />
        {label}
      </div>
    ) : image ? (
      <img src={image} className="w-full h-full object-cover" alt="story" />
    ) : content ? (
      <div className="text-center text-gray-800 font-semibold break-words">
        {content.length > 40 ? content.slice(0, 40) + "..." : content}
      </div>
    ) : (
      <div className="text-gray-400 font-semibold">No content</div>
    )}

    {!isCreate && (image || content) && (
      <div
        className={`absolute bottom-2 left-2 text-sm font-semibold ${
          image ? "text-white" : "text-gray-800"
        }`}
      >
        {label}
      </div>
    )}
  </div>
);
