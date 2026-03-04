"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; includedLanguages: string; layout: number },
          containerId: string
        ) => void;
        InlineLayout: { SIMPLE: number };
      };
    };
  }
}

export function GoogleTranslate() {
  useEffect(() => {
    const existingScript = document.getElementById("google-translate-script");
    if (existingScript) return;

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "bn",
            includedLanguages: "bn,en,ar",
            layout: window.google.translate.InlineLayout?.SIMPLE || 0,
          },
          "google_translate_element"
        );
      }
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="flex items-center"
      aria-label="ভাষা পরিবর্তন"
    />
  );
}
