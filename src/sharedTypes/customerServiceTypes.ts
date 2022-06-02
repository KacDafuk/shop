type QuestionArray = Array<{ title: string; text: string }>;
export interface CustomerServiceQuestions {
  delivery: QuestionArray;
  payment: QuestionArray;
  refund: QuestionArray;
}
