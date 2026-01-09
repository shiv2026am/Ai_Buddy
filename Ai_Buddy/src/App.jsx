import { useState } from "react";
import { generateText } from "./aiService/ai";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await generateText(input);
      const aiMsg = { role: "ai", text: aiReply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "❌ Something went wrong" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-600 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-blue-200 shadow-lg rounded-lg flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b text-center font-semibold text-lg text-blue-600">
          Gemini Chat 🤖
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap
                ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "mr-auto bg-gray-200 text-gray-900"
                }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="mr-auto bg-gray-200 px-4 py-2 rounded-lg text-sm">
              Typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Ask something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;
