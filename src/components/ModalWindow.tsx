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

  const [apiKey, setApiKey] = useState("");

  const body = {
    mood: `My mood for now is ${selectedAnswer.mood}`,
    weather: `Weather for now is ${selectedAnswer.weather}`,
    thoughts: `My thoughts for now are ${selectedAnswer.thoughts}`,
  };

  console.log("apiKey>>>>>", apiKey);

  const key = apiKey;
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
        className="bg-white max-w-[500px] max-h-[500px] lg:max-w-[500px] lg:max-h-[500px] p-4 w-full h-full rounded-2xl flex flex-col gap-12 items-center justify-center"
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
              <div>
                <span className="text-xl font-bold">
                  What is your mood for now?
                </span>
                <div className="flex gap-4 mt-1">
                  <div
                    className={
                      selectedAnswer.mood === "Happy"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, mood: "Happy" })
                    }
                  >
                    Happy
                  </div>
                  <div
                    className={
                      selectedAnswer.mood === "Sad"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, mood: "Sad" })
                    }
                  >
                    Sad
                  </div>
                  <div
                    className={
                      selectedAnswer.mood === "Excited"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, mood: "Excited" })
                    }
                  >
                    Excited
                  </div>
                  <div
                    className={
                      selectedAnswer.mood === "Anxious"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, mood: "Anxious" })
                    }
                  >
                    Anxious
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xl font-bold">
                  What is the weather like now?
                </span>
                <div className="flex gap-4 mt-1">
                  <div
                    className={
                      selectedAnswer.weather === "Sunny"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, weather: "Sunny" })
                    }
                  >
                    Sunny
                  </div>
                  <div
                    className={
                      selectedAnswer.weather === "Rainy"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({ ...selectedAnswer, weather: "Rainy" })
                    }
                  >
                    Rainy
                  </div>
                  <div
                    className={
                      selectedAnswer.weather === "Cloudy"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        weather: "Cloudy",
                      })
                    }
                  >
                    Cloudy
                  </div>
                  <div
                    className={
                      selectedAnswer.weather === "Stormy"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        weather: "Stormy",
                      })
                    }
                  >
                    Stormy
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xl font-bold">
                  What are your thoughts now?
                </span>
                <div className="flex gap-4 mt-1">
                  <div
                    className={
                      selectedAnswer.thoughts === "Analytical"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        thoughts: "Analytical",
                      })
                    }
                  >
                    Analytical
                  </div>
                  <div
                    className={
                      selectedAnswer.thoughts === "Creative"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        thoughts: "Creative",
                      })
                    }
                  >
                    Creative
                  </div>
                  <div
                    className={
                      selectedAnswer.thoughts === "Empathetic"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        thoughts: "Empathetic",
                      })
                    }
                  >
                    Empathetic
                  </div>
                  <div
                    className={
                      selectedAnswer.thoughts === "Curious"
                        ? "bg-[#3631BB] text-white rounded-md p-1"
                        : ""
                    }
                    onClick={() =>
                      setSelectedAnswer({
                        ...selectedAnswer,
                        thoughts: "Curious",
                      })
                    }
                  >
                    Curious
                  </div>
                </div>
              </div>
            </div>
            <input
              onChange={(e) => setApiKey(e.target.value)}
              type="text"
              className="border rounded-md p-2"
              placeholder="api-key..."
            />
            <button
              onClick={handleSubmit}
              className="p-1 bg-[#3631BB] rounded-md text-white"
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
