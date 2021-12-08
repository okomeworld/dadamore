import { useEffect, useRef, useState } from "react";
import { Mic } from "@mui/icons-material";

const disabledFilter = "none";

const enabledFilter = [
  "drop-shadow(0px 0px 5px rgba(64, 217, 204, 100%))",
  "drop-shadow(0px 0px 10px rgba(64, 217, 204, var(--shadow-opacity)))",
  "drop-shadow(0px 0px 20px rgba(64, 217, 204, var(--shadow-opacity)))",
  "drop-shadow(0px 0px 30px rgba(64, 217, 204, var(--shadow-opacity)))",
  "brightness(var(--brightness))",
].join(" ");

const enabledFillColor = "##004842";

export interface VisualizerProps {
  enabled: boolean;
  analyser: AnalyserNode | undefined;
}

export const Visualizer = ({
  enabled,
  analyser,
}: VisualizerProps): JSX.Element => {
  const ref = useRef<SVGSVGElement>(null);
  const reqId = useRef<number>(0);
  const [filter, setFilter] = useState(disabledFilter);
  const [fillColor, setFillColor] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) return;

    if (!enabled || !analyser) {
      setFilter(disabledFilter);
      setFillColor(undefined);
      return;
    }

    setFilter(enabledFilter);
    setFillColor(enabledFillColor);

    const { current: elm } = ref;
    const data = new Float32Array(analyser.fftSize);
    const execAnimate = () => {
      analyser.getFloatTimeDomainData(data);
      const param = Math.floor(Math.max.apply(null, Array.from(data)) * 200);
      elm.style.setProperty("--shadow-opacity", `${param}%`);
      elm.style.setProperty("--brightness", `${param / 4 + 100}%`);
      reqId.current = requestAnimationFrame(execAnimate);
    };

    reqId.current = requestAnimationFrame(execAnimate);

    return () => {
      cancelAnimationFrame(reqId.current);
    };
  }, [enabled, analyser]);

  return (
    <Mic
      ref={ref}
      sx={{
        fontSize: 240,
        filter,
        fill: fillColor,
      }}
    />
  );
};
