import React, { createContext, useState, useEffect } from "react";

// Create the Language Context
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Retrieve language from localStorage or default to 'en'
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("LANG_CODE") || "en";
  });

  // Function to toggle language and persist to localStorage
  const toggleLanguage = (language = "en") => {
    setLanguage(() => {
      localStorage.setItem("LANG_CODE", language);
      return language;
    });
  };

  // Ensure language is persisted on initial load
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
