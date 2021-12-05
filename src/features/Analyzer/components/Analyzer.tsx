import { useState } from "react";
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export const Analyzer = (): JSX.Element => {
  const [open, setOpen] = useState(true);

  const data = [
    {
      subject: "落ち着き",
      value: 20,
      fullMark: 50,
    },
    {
      subject: "怒り",
      value: 20,
      fullMark: 50,
    },
    {
      subject: "喜び",
      value: 20,
      fullMark: 50,
    },
    {
      subject: "悲しみ",
      value: 0,
      fullMark: 50,
    },
    {
      subject: "元気さ",
      value: 20,
      fullMark: 50,
    },
  ];

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={() => {
        setOpen(false);
      }}
    >
      <AppBar position="relative">
        <Toolbar>
          <Stack width="100%" justifyContent="center" alignItems="center">
            <Typography>分析結果</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack>
          <Box height="40vh">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
                <PolarRadiusAxis domain={[0, 50]} />
                <Radar
                  name="分析結果"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
