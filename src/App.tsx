import { Mic } from "@mui/icons-material";
import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { RecordingToggleButton, useRecordedWav } from "./features/Recorder";
import { Analyzer } from "./features/Analyzer";

function App() {
  const recordedWav = useRecordedWav();

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
