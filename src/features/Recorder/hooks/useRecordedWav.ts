import { useRecoilValue } from "recoil";
import { recordedWavState } from "../store/RecordedWavState";

export const useRecordedWav = () => {
  return useRecoilValue(recordedWavState);
};
