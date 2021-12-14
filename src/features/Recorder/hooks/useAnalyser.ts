import { useRecorderInstance } from "./useRecorderInstance";

export const useAnalyser = () => {
  const [recorder] = useRecorderInstance();
  return recorder?.analyser;
};
