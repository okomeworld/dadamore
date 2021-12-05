import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const customEnv = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: {
      "process.env.EMPATH_API_KEY": JSON.stringify(
        customEnv.VITE_EMPATH_API_KEY
      ),
    },
  });
};
