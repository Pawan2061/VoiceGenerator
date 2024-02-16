import React, { useEffect, useState } from "react";

const Generate = () => {
  const [value, setValue] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);

  const msg = new SpeechSynthesisUtterance();

  useEffect(() => {
    const speechSynthesisVoices = window.speechSynthesis.getVoices();
    // const firstFourVoices = speechSynthesisVoices.slice(0, 4);

    setVoices(voices);
  }, []);

  const speechHandler = (msg) => {
    msg.text = value;
    if (selectedVoice) {
      console.log(selectedVoice);
      msg.voice = selectedVoice;
    }
    window.speechSynthesis.speak(msg);
  };

  const errorHandler = (msg) => {
    msg.text = "msg is requested to speak in their article";
    // if (selectedVoice) {
    //   msg.voice = selectedVoice;
    // }
    msg.voice = voices[3];
    window.speechSynthesis.speak(msg);
  };

  const thanksHandler = (msg) => {
    msg.text = "Thank your for the presentation ";
    if (selectedVoice) {
      msg.voice = selectedVoice;
    }
    window.speechSynthesis.speak(msg);
  };

  const handleVoiceChange = (event) => {
    const selectedOption = event.target.value;
    const voice = voices.find((voice) => voice.name === selectedOption);
    setSelectedVoice(voice);
  };

  return (
    <div>
      <div className="App">
        <h1 className="text-5xl">Voice Generator for conference</h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          <input
            type="text"
            id="large-input"
            placeholder="Write information here"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <select
          onChange={handleVoiceChange}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <label
            htmlFor=""
            for="voices"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a voice
          </label>

          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => speechHandler(msg)}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Speak
        </button>
        <button
          onClick={() => errorHandler(msg)}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Error
        </button>
        <button
          onClick={() => thanksHandler(msg)}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Thanks
        </button>
      </div>
    </div>
  );
};

export default Generate;
