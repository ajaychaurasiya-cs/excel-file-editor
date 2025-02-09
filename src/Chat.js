import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const Chat = ({ data,}) => {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);
  const [fid, setFid] = useState(null);
  

  const handleQuestion = () => {
    if (data.length === 0) {
      setAnswer([...answer, { chat: "Please upload an Excel file first." }]);
      return;
    }

    const lowerQuestion = question.toLowerCase();
    let foundAnswer = "Sorry, I couldn't find an answer.";

    for (let row of data) {
      for (let cell of row) {
        if (
          typeof cell === "string" &&
          cell.toLowerCase().includes(lowerQuestion)
        ) {
          foundAnswer = `Found: ${cell}`;

          data.map((elm, i) => {
            data[i].map((el) => {
              let fl = cell === el;
              fl && setFid(i);
              question || setFid(null);
            });
          });

          break;
        }
      }
    }

   
    setAnswer([...answer, { chat: foundAnswer }]);
    foundAnswer === "Sorry, I couldn't find an answer." && setFid(null);
  };

    const chatRef = useRef(null);
    // Function to scroll to the bottom
    const scrollToBottom = () => {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
      scrollToBottom();
    }, [answer]); // Runs whenever messages update

  return ( <>
  <div className="mt-6 w-full max-w-3xl">
          <h2 className="text-xl font-semibold mb-2">Chat with Your Data</h2>
          {answer &&
            answer.map((item, index) => {
              return (
                <p key={index} className="mt-2 p-2 bg-gray-200 rounded">
                  {item.chat || item}
                </p>
              );
            })}
  
          <span className="p-3 flex items-center overflow-auto ">
            <div className="px-4 flex items-start py-2 w-auto bg-slate-500 text-white rounded shadow">
              <div className="grid">
                {fid &&
                  data[0].map((el, ix) => {
                    return (
                      <span className="font-semibold" key={ix}>
                        {el}
                      </span>
                    );
                  })}
              </div>
              <div className="grid px-4 bg-slate-700 rounded ">
                {fid &&
                  data[fid].map((elm, i) => {
                    return (
                      <span className=" grid " key={i}>
                        {elm}
                      </span>
                    );
                  })}
              </div>
              <span className={`text-3xl p-3 ${fid ? `animate-pulse` : `animate-bounce`}`}>
                <FaRobot />
              </span>
            </div>
            <div ref={chatRef} /> {/* Scroll anchor */}
          </span>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about the data..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={handleQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded shadow flex items-center gap-2"
          >
            Ask <IoSend />
          </button>
        </div>
  </> );
}
 
export default Chat;