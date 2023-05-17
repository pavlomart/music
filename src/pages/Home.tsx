import React, { useState } from "react";
import ModalWindow from "../components/ModalWindow";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="w-[100wh] h-[100vh] flex flex-col justify-center items-center gap-6 bg-slate-950">
      <span className="text-white">
        Describe your mood and I help find you music
      </span>

      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="text-white bg-slate-400 p-2 rounded-lg text-center"
      >
        Start describe
      </button>

      {modalOpen ? <ModalWindow setModalOpen={setModalOpen} /> : null}
    </div>
  );
};

export default Home;
