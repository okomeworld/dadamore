import { EmpathResponse } from "../api/requestAnalyzeWav";
import { AnalyzedResults } from "../components/SucceededDialog";

export const makeAnalyzedResults = (res: EmpathResponse): AnalyzedResults => {
  return [
    {
      subject: "落ち着き",
      value: res.calm,
    },
    {
      subject: "怒り",
      value: res.anger,
    },
    {
      subject: "喜び",
      value: res.joy,
    },
    {
      subject: "悲しみ",
      value: res.sorrow,
    },
    {
      subject: "元気さ",
      value: res.energy,
    },
  ];
};
