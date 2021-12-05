import { useSetRecoilState } from "recoil";
import { recorderControlState } from "../store/RecorderControlState";
import { useRecorderInstance } from "./useRecorderInstance";

export const useRecorderController = () => {
  const recorder = useRecorderInstance();
  const setControlState = useSetRecoilState(recorderControlState);

  const startRecording = () => {
    if (!recorder) return;
    recorder.start();
    setControlState("IN_RECORDING");
  };

  const stopRecording = () => {
    if (!recorder) return;
    recorder.stop();
    setControlState("STOP");
  };

  return {
    startRecording,
    stopRecording,
  };
};
