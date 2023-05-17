//@ts-nocheck
import React, { useState } from "react";
import { questions } from "../mockedData";
import axios from "axios";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalWindow: React.FC<Props> = ({ setModalOpen }) => {
  const [selectedAnswer, setSelectedAnswer] = useState({
    mood: null,
    weather: null,
    thoughts: null,
  });

  const handleAnswerSelection = (questionIndex: number, answer: string) => {
    switch (questionIndex) {
      case 0:
        setSelectedAnswer({ ...selectedAnswer, mood: answer });
        break;
      case 1:
        setSelectedAnswer({ ...selectedAnswer, weather: answer });
        break;
      case 2:
        setSelectedAnswer({ ...selectedAnswer, thoughts: answer });
        break;
      default:
        break;
    }
  };

  const body = {
    mood: `My mood for now is ${selectedAnswer.mood}`,
    weather: `Weather for now is ${selectedAnswer.weather}`,
    thoughts: `My thoughts for now are ${selectedAnswer.thoughts}`,
  };

  console.log("body>>>>>", body);

  const key = "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";
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `imagine that you are a database with music, I am user who describe you, weather for now, my minds and my mood, all what you need to do, it's show me top 5 songs which peopels listening if them have same mood,weather and minds. Please show me only top 5 songs ${body}`,
          temperature: 0.5,
          max_tokens: 200,
          top_p: 1.0,
          frequency_penalty: 0.52,
          presence_penalty: 0.5,
          stop: ["11."],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
        }
      );

      setResponse(result.data.choices[0].text.trim());
    } catch (error) {
      console.error(error);
      setResponse("Error with the OpenAI API");
    }
  };

  return (
    <div
      onClick={() => setModalOpen(false)}
      className="fixed bg-[#000000] bg-opacity-50 flex justify-center items-center z-1 top-0 bottom-0 left-0 right-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-[320px] max-h-[420px] lg:max-w-[500px] lg:max-h-[500px] p-4 w-full h-full rounded-2xl flex flex-col gap-12 items-center justify-center"
      >
        {response ? (
          <>
            <div>{response}</div>
            <div
              onClick={() => setResponse("")}
              className="p-1 bg-slate-400 rounded-md text-white"
            >
              Thank you
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-8 text-start">
              {questions.map((question, idx) => {
                return (
                  <div key={idx}>
                    {question.question}
                    <div className="flex gap-4 mt-1">
                      {question.answers.map((answer, answerIdx) => (
                        <div
                          onClick={() => handleAnswerSelection(idx, answer)}
                          key={answerIdx}
                        >
                          {answer}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleSubmit}
              className="p-1 bg-slate-500 rounded-md text-white"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default ModalWindow;
