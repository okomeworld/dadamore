import axios from "axios";

export interface EmpathResponse {
  error: number;
  msg?: string;
  calm: number;
  anger: number;
  joy: number;
  sorrow: number;
  energy: number;
}

export const requestAnalyzeWav = async (wav: Blob): Promise<EmpathResponse> => {
  const url = "https://api.webempath.net/v2/analyzeWav";

  try {
    const body = new FormData();
    body.append("apikey", process.env.EMPATH_API_KEY);
    body.append("wav", wav);

    const { data } = await axios.post<EmpathResponse>(url, body);

    // Empath側でエラーを検知した場合
    if (data.error > 0) {
      throw Error(`Empath error ${data.error}: ${data.msg}`);
    }

    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
