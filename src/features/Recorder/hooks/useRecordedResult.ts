import { useRecorderInstance } from "./useRecorderInstance";

export const useRecordedResult = () => {
  const recorder = useRecorderInstance();
  return recorder?.generateRecordedWave();
};
