import { useEffect, useState } from "react";

function useSpeech() {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [pitch, setPitch] = useState(1);

  const synth = window.speechSynthesis;

  const speak = (selectedVoice) => {
    // Overwrite anything being played atm
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = synth.getVoices()[selectedVoice];
    utterance.pitch = pitch;
    utterance.onboundary = (e) => {
      console.log(e.charIndex);
    };

    synth.speak(utterance);
  };

  const speakCustomText = (text, selectedVoice) => {
    // Overwrite anything being played atm
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices()[selectedVoice];
    utterance.pitch = pitch;

    synth.speak(utterance);
  };

  const togglePause = () => {
    isPaused ? synth.resume() : synth.pause();
    setIsPaused(!isPaused);
  };

  const reset = () => {
    synth.cancel();
    setTextToSpeak("");
  };

  useEffect(() => {}, [textToSpeak]);

  return {
    textToSpeak,
    setTextToSpeak,
    speak,
    speakCustomText,
    togglePause,
    reset,
    pitch,
    setPitch,
  };
}

export { useSpeech };
