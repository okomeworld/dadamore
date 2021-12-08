import { Recorder } from "./Recorder";

export const createRecorder = async () => {
  const context = new AudioContext();
  const stream = await window.navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  return new Recorder(stream, context);
};
