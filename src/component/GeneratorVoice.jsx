import { useSpeechSelector } from "../hooks/use-voice-selector";
import { useSpeech } from "../hooks/use-speech";

const GeneratorVoice = () => {
  const { voices, selectedVoice, handleVoiceChange } = useSpeechSelector();
  const {
    setTextToSpeak,
    speak,
    textToSpeak,
    speakCustomText,
    togglePause,
    reset,
    pitch,
    setPitch,
  } = useSpeech();

  const speechHandler = () => {
    speak(selectedVoice);
  };

  const errorHandler = () => {
    const errorMsg = "msg is requested to speak in their article";
    speakCustomText(errorMsg, selectedVoice);
  };

  const thanksHandler = () => {
    const thanksMsg = "Thank your for the presentation ";
    speakCustomText(thanksMsg, selectedVoice);
  };

  return (
    <div>
      <div className="App">
        <h1 className="text-5xl">Voice Generator for conference</h1>

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          <input
            type="text"
            id="large-input"
            placeholder="Write information here"
            value={textToSpeak}
            onChange={(e) => setTextToSpeak(e.target.value)}
            className="block w-full h-32 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <select
          onChange={handleVoiceChange}
          className="block w-full p-2 my-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <label
            htmlFor="voices"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
          onClick={() => speechHandler()}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Speak
        </button>
        <button
          onClick={() => errorHandler()}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Error
        </button>
        <button
          onClick={() => thanksHandler()}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Thanks
        </button>
        {/* TODO: toggle pause and resume state in btn */}
        <button
          onClick={() => togglePause()}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          pause
        </button>
        {/* Reset Btn */}
        <button
          onClick={() => reset()}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          reset
        </button>

        <div>
          <input
            type="range"
            id="cowbell"
            name="cowbell"
            min="0"
            max="2"
            step="0.25"
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
          />
          <label htmlFor="cowbell">Adjust Pitch {pitch}</label>
        </div>
      </div>
    </div>
  );
};

export default GeneratorVoice;
