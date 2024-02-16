import { useCallback, useEffect, useState } from "react";

const synth = window.speechSynthesis;

function useSpeechSelector() {
  const [voices, setVoices] = useState([]);

  const [selectedVoice, setSelectedVoice] = useState(null);

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices(newVoices);
  }, []);

  const handleVoiceChange = (event) => {
    const selectedOption = event.target.value;
    const voice = voices.find((voice) => voice.name === selectedOption);
    setSelectedVoice(voice);
  };

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList]);

  return { voices, selectedVoice, handleVoiceChange };
}

export { useSpeechSelector };
