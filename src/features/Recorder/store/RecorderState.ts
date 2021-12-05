import { atom, selector } from "recoil";
import { createRecorder } from "../utils/createRecorder";

export const recorderState = atom({
  key: "recorderState",
  default: selector({
    key: "createRecorder",
    async get() {
      return await createRecorder();
    },
    dangerouslyAllowMutability: true,
  }),
  dangerouslyAllowMutability: true,
});
