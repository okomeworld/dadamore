import { rest } from "msw";
import type { EmpathResponse } from "../features/Analyzer";

export const handlers = [
  rest.post("https://api.webempath.net/v2/analyzeWav", (_, res, ctx) => {
    return res(
      ctx.json<EmpathResponse>({
        error: 0,
        calm: Math.round(Math.random() * 50),
        anger: Math.round(Math.random() * 50),
        joy: Math.round(Math.random() * 50),
        sorrow: Math.round(Math.random() * 50),
        energy: Math.round(Math.random() * 50),
      })
    );
  }),
];
