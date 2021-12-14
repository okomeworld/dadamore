import { atom } from "recoil";
import { Recorder } from "../utils/Recorder";

export const recorderState = atom<Recorder | null>({
  key: "recorderState",
  default: null,
  dangerouslyAllowMutability: true,
});
