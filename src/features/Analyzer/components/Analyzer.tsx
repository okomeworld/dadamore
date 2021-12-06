import { useAnalyzerDialogViewModel } from "../hooks/useAnalyzerViewModel";
import { ErrorDialog } from "./ErrorDialog";
import { LoadingDialog } from "./LoadingDialog";
import { SucceededDialog, SucceededDialogProps } from "./SucceededDialog";

interface SuccessAnalyzerProps {
  status: "SUCCESS";
  dialogProps: SucceededDialogProps;
}

interface ErrorAnalyzerProps {
  status: "LOADING";
}

interface LoadingAnalyzerProps {
  status: "ERROR";
}

export type AnalyzerDialogViewModel =
  | SuccessAnalyzerProps
  | ErrorAnalyzerProps
  | LoadingAnalyzerProps;

export interface AnalyzerProps {
  recordedWav: DataView | null;
}

export const Analyzer = ({
  recordedWav,
}: AnalyzerProps): JSX.Element | null => {
  const props = useAnalyzerDialogViewModel(recordedWav);

  if (!props) return null;

  if (props.status === "SUCCESS") {
    return <SucceededDialog {...props.dialogProps} />;
  }
  if (props.status === "ERROR") {
    return <ErrorDialog />;
  }
  if (props.status === "LOADING") {
    return <LoadingDialog />;
  }

  return null;
};
