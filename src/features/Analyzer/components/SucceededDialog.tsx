import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
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

interface AnalyzedData<T extends string> {
  subject: T;
  value: number;
}

export type AnalyzedResults = [
  AnalyzedData<"落ち着き">,
  AnalyzedData<"怒り">,
  AnalyzedData<"喜び">,
  AnalyzedData<"悲しみ">,
  AnalyzedData<"元気さ">
];

export interface SucceededDialogProps {
  results: AnalyzedResults;
  wavUrl: string;
}

export const SucceededDialog = ({
  results,
  wavUrl,
}: SucceededDialogProps): JSX.Element => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} fullWidth>
      <AppBar position="relative">
        <Toolbar>
          <Stack width="100%" justifyContent="center" alignItems="center">
            <Typography>分析結果</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack alignItems="center">
          <Box>
            <audio controls src={wavUrl} />
          </Box>
          <Box width="100%" height="40vh">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "white" }} />
                <PolarRadiusAxis domain={[0, 50]} />
                <Radar
                  name="分析結果"
                  dataKey="value"
                  stroke="#dd57a5"
                  fill="#f0b2d6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
          <Box>
            <Button
              variant="contained"
              size="large"
              onClick={() => setOpen(false)}
            >
              閉じる
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
