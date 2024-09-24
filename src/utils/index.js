import axios from "axios";

export const translate = async (q = "", target = "en") => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_GOOGLE_API_URL,
      {},
      {
        params: {
          q,
          target, // Russian language code
          key: process.env.REACT_APP_GOOGLE_API_KEY,
        },
      }
    );
    return response?.data?.data?.translations?.[0]?.translatedText ?? "";
  } catch (error) {
    console.error("Error translating text:", error);
    return q;
  }
};
