import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { recordedWavState } from "../store/RecordedWavState";
import { recorderControlState } from "../store/RecorderControlState";
import { createRecorder } from "../utils/createRecorder";
import { Recorder } from "../utils/Recorder";
import { useRecorderInstance } from "./useRecorderInstance";

export const useRecorderController = () => {
  const [recorderInstance, setRecorderInstance] = useRecorderInstance();
  const recorderRef = useRef<Recorder>();
  const setControlState = useSetRecoilState(recorderControlState);
  const setRecordedWavState = useSetRecoilState(recordedWavState);
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();

  const startRecording = async () => {
    const recorder = await createRecorder();
    recorder.start();
    setTimeoutId(
      setTimeout(() => {
        stopRecording();
      }, 4500)
    );
    recorderRef.current = recorder;
    setRecorderInstance(recorder);
    setControlState("IN_RECORDING");
  };

  const stopRecording = () => {
    const { current: recorder } = recorderRef;
    if (!recorder) return;
    recorder.stop();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setControlState("STOP");
    setRecordedWavState(recorder.generateRecordedWave());
    setRecorderInstance(null);
    setControlState("READY"); // TODO: いらないかもしれないので後で確認する
  };

  return {
    startRecording,
    stopRecording,
  };
};
