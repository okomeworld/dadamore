import { useRecoilValueLoadable } from "recoil";
import { recorderState } from "../store/RecorderState";

export const useRecorderInstance = () => {
  const loadable = useRecoilValueLoadable(recorderState);

  return loadable.state === "hasValue" ? loadable.contents : null;
};
