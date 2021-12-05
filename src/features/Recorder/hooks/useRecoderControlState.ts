import { useRecoilState } from "recoil";
import { recorderControlState } from "../store/RecorderControlState";

export const useRecorderControlState = () => {
  return useRecoilState(recorderControlState);
};
