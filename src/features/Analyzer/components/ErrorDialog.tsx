import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
        <DialogContentText>
          何らかの不具合で分析できませんでした。ごめんね！
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => setOpen(false)}
          >
            閉じる
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
