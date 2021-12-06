import { useSetRecoilState } from "recoil";
import { recordedWavState } from "../store/RecordedWavState";
import { recorderControlState } from "../store/RecorderControlState";
import { useRecorderInstance } from "./useRecorderInstance";

export const useRecorderController = () => {
  const recorder = useRecorderInstance();
  const setControlState = useSetRecoilState(recorderControlState);
  const setRecordedWavState = useSetRecoilState(recordedWavState);

  const startRecording = () => {
    if (!recorder) return;
    recorder.start();
    setControlState("IN_RECORDING");
  };

  const stopRecording = () => {
    if (!recorder) return;
    recorder.stop();
    setControlState("STOP");
    setRecordedWavState(recorder.generateRecordedWave());
    setControlState("READY"); // TODO: いらないかもしれないので後で確認する
  };

  return {
    startRecording,
    stopRecording,
  };
};
