import { atom } from "recoil";

export const recordedWavState = atom<DataView | null>({
  key: "recordedWavContext",
  default: null,
});
