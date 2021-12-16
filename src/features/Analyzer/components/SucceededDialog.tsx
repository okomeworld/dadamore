import React, { ReactElement, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Theme } from "@mui/system";
import { TransitionProps } from "@mui/material/transitions";
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

const Transition = React.forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref) => {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);
Transition.displayName = "Transition";

export const SucceededDialog = ({
  results,
  wavUrl,
}: SucceededDialogProps): JSX.Element => {
  const inMobile = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.down("sm")
  );
  const [open, setOpen] = useState(true);

  const dialogProps = useMemo(() => {
    const props: DialogProps = {
      open,
      fullWidth: !inMobile,
      fullScreen: inMobile,
    };

    if (inMobile) {
      props.TransitionComponent = Transition;
    }

    return props;
  }, [open, inMobile]);

  return (
    <Dialog {...dialogProps}>
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
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "white" }}
                  orient="inner"
                />
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
