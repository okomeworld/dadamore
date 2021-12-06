import { useState } from "react";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export const ErrorDialog = (): JSX.Element => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog open={open} fullWidth>
      <AppBar position="relative">
        <Toolbar>
          <Stack width="100%" justifyContent="center" alignItems="center">
            <Typography>エラー</Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Stack>
          <Typography>
            何らかの不具合で分析できませんでした。ごめんね！
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(false)}
          >
            閉じる
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
