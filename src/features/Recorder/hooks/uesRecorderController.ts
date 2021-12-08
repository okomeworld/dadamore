import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { recordedWavState } from "../store/RecordedWavState";
import { recorderControlState } from "../store/RecorderControlState";
import { useRecorderInstance } from "./useRecorderInstance";

export const useRecorderController = () => {
  const recorder = useRecorderInstance();
  const setControlState = useSetRecoilState(recorderControlState);
  const setRecordedWavState = useSetRecoilState(recordedWavState);
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  const startRecording = () => {
    if (!recorder) return;
    recorder.start();
    setTimeoutId(
      setTimeout(() => {
        stopRecording();
      }, 4500)
    );
    setControlState("IN_RECORDING");
  };

  const stopRecording = () => {
    if (!recorder) return;
    recorder.stop();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setControlState("STOP");
    setRecordedWavState(recorder.generateRecordedWave());
    setControlState("READY"); // TODO: いらないかもしれないので後で確認する
  };

  return {
    startRecording,
    stopRecording,
  };
};
