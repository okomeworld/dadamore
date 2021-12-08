import { useMemo } from "react";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import {
  RecordingToggleButton,
  useAnalyser,
  useRecordedWav,
  useRecorderControlState,
} from "./features/Recorder";
import { Analyzer } from "./features/Analyzer";
import { Visualizer } from "./features/Visualizer";

function App() {
  const [recorderState] = useRecorderControlState();
  const recordedWav = useRecordedWav();
  const analyser = useAnalyser();

  const isVisualizerEnabled = useMemo(() => {
    return recorderState === "IN_RECORDING";
  }, [recorderState]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="sm">
            <Stack justifyContent="center" alignItems="center">
              <Typography>DADAMORE</Typography>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Stack mt={8} spacing={4} justifyContent="center" alignItems="center">
          <Visualizer enabled={isVisualizerEnabled} analyser={analyser} />
          <RecordingToggleButton />
        </Stack>
      </Container>
      <Analyzer recordedWav={recordedWav} />
    </>
  );
}

export default App;
