import { useRecoilState } from "recoil";
import { recorderState } from "../store/RecorderState";

export const useRecorderInstance = () => {
  return useRecoilState(recorderState);
};
