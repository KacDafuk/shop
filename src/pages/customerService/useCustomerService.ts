import React, { useRef, useState } from "react";
import styles from "./customerService.module.css";
type QuestionsType = "delivery" | "payment" | "refund";
export function useCustomerService() {
  const buttonsContainer = useRef<HTMLElement>(null);
  const [currentQuestions, setCurrentQuestion] =
    useState<QuestionsType>("delivery");
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(1);
  function changeQuestions(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (e.currentTarget.getAttribute("data-question")) {
      setCurrentQuestion(
        e.currentTarget.getAttribute("data-question") as QuestionsType
      );
    }
  }

  function getTextDisplayClass(idx: number) {
    if (idx === activeQuestionIdx) return styles.activeQuestion;
  }
  function getCorrectAccordionIcon(idx: number) {
    if (idx === activeQuestionIdx) return "fa-solid fa-minus";
    return "fa-solid fa-plus";
  }
  return {
    buttonsContainer,
    currentQuestions,
    setActiveQuestionIdx,
    changeQuestions,
    getCorrectAccordionIcon,
    getTextDisplayClass,
  };
}
