import { Mic } from "@mui/icons-material";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  RecordingToggleButton,
  useRecordedResult,
  useRecorderControlState,
} from "./features/Recorder";
import { Analyzer } from "./features/Analyzer";

const requestAnalyzeWav = async (wav: Blob) => {
  const url = "https://api.webempath.net/v2/analyzeWav";
  try {
    const body = new FormData();
    body.append("apikey", process.env.EMPATH_API_KEY);
    body.append("wav", wav);

    const { data } = await axios.post(url, body);
    return data;
  } catch (e) {
    console.error(e);
  }
};

function App() {
  const result = useRecordedResult();
  const [recorderState, setRecorderState] = useRecorderControlState();
  const [recordedSound, setRecordedSound] = useState<string>();

  const [recordedWav, setRecordedWav] = useState<DataView | null>(null);
  useEffect(() => {
    if (recorderState === "STOP" && result) {
      setRecordedWav(result);
      setRecorderState("READY");
    }
  }, [recorderState]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Container maxWidth="sm">
            <Stack justifyContent="center" alignItems="center">
              <Typography>だだもれ ver β</Typography>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Stack mt={8} spacing={4} justifyContent="center" alignItems="center">
          <Mic
            sx={{ fontSize: 240, filter: "drop-shadow(0px 0px 5px white)" }}
          />
          <RecordingToggleButton />
        </Stack>
      </Container>
      <Analyzer recordedWav={recordedWav} />
    </>
  );
}

export default App;
