import { atom } from "recoil";

export type RecorderControlStateValue =
  | "INIT"
  | "READY"
  | "IN_RECORDING"
  | "STOP";

export const recorderControlState = atom<RecorderControlStateValue>({
  key: "RecorderControlState",
  default: "INIT",
});
