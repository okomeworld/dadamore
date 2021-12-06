import { Backdrop, CircularProgress } from "@mui/material";

export const LoadingDialog = (): JSX.Element => {
  return (
    <Backdrop open={true}>
      <CircularProgress />
    </Backdrop>
  );
};
