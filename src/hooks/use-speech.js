import { useEffect, useState } from "react";

function useSpeech() {
  const [textToSpeak, setTextToSpeak] = useState("");
  const [textToHighlight, setTextToHighlight] = useState("");

  const [isPaused, setIsPaused] = useState(false);
  const [pitch, setPitch] = useState(1);

  const synth = window.speechSynthesis;

  const speak = (selectedVoice) => {
    // Overwrite anything being played atm
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.onboundary = (e) => {
      console.log(e.charIndex);
      setTextToHighlight(textToSpeak.slice(0, e.charIndex));
    };

    utterance.onend = () => setTextToHighlight(textToSpeak);

    synth.speak(utterance);
  };

  const speakCustomText = (text, selectedVoice) => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.pitch = pitch;
    utterance.onboundary = (e) => {
      console.log(e.charIndex);
      setTextToHighlight(textToSpeak.slice(0, e.charIndex));
    };

    utterance.onend = () => setTextToHighlight(textToSpeak);

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
    textToHighlight,
  };
}

export { useSpeech };
