import { Circle, PauseCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useRecorderController } from "../hooks/uesRecorderController";
import { useRecorderControlState } from "../hooks/useRecoderControlState";

export const RecordingToggleButton = (): JSX.Element => {
  const { startRecording, stopRecording } = useRecorderController();
  const [controlState] = useRecorderControlState();

  if (controlState === "IN_RECORDING") {
    return (
      <Button
        variant="contained"
        size="large"
        startIcon={<PauseCircle />}
        onClick={stopRecording}
      >
        停止
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      size="large"
      startIcon={<Circle sx={{ color: "#d32f2f" }} />}
      onClick={startRecording}
    >
      録音
    </Button>
  );
};
