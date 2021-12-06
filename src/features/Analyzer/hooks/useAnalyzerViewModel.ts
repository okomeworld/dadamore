import { useEffect, useState } from "react";
import { AnalyzerDialogViewModel } from "../components/Analyzer";
import { requestAnalyzeWav } from "../api/requestAnalyzeWav";
import { makeAnalyzedResults } from "../utils/makeAnalyzedResults";

export const useAnalyzerDialogViewModel = (
  wav: DataView | null
): AnalyzerDialogViewModel | null => {
  const [viewModel, setViewModel] = useState<AnalyzerDialogViewModel | null>(
    null
  );

  useEffect(() => {
    if (!wav) {
      setViewModel(null);
      return;
    }

    setViewModel({ status: "LOADING" });

    const blob = new Blob([wav], { type: "audio/wav" });
    requestAnalyzeWav(blob)
      .then((res) => {
        setViewModel({
          status: "SUCCESS",
          dialogProps: {
            results: makeAnalyzedResults(res),
            wavUrl: window.URL.createObjectURL(blob),
          },
        });
      })
      .catch(() => {
        setViewModel({ status: "ERROR" });
      });
  }, [wav]);

  return viewModel;
};
