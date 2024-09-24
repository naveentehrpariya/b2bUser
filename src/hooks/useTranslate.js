import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "../utils/LanguageContext";

export const useTranslate = (text = "") => {
  const { language } = useContext(LanguageContext); // Get the language code from context
  const [translatedText, setTranslatedText] = useState(text); // Default to original text
  useEffect(() => {
    if (text && language) {
      const translateText = async () => {
        try {
          const response = await axios.post(
            process.env.REACT_APP_GOOGLE_API_URL,
            {},
            {
              params: {
                q: text,
                target: language,
                key: process.env.REACT_APP_GOOGLE_API_KEY,
              },
            }
          );
          setTranslatedText(
            response?.data?.data?.translations?.[0]?.translatedText ?? ""
          );
        } catch (error) {
          console.error("Error translating text:", error);
        }
      };

      translateText();
    }
  }, [text, language]); // Re-run effect when text or language changes

  return translatedText;
};
