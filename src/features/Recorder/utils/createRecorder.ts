import { Recorder } from "./Recorder";

export const createRecorder = async () => {
  const stream = await window.navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  const context = new AudioContext();

  return new Recorder(stream, context);
};
