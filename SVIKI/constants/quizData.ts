export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  subQuestion?: {
    triggerValue: string; // При каком ответе показать подвопрос
    question: string;
    options: string[];
  };
};

export const QUIZ_DATA: QuestionType[] = [
  {
    id: '1',
    question: "У вас есть действующие кредиты?",
    options: ["Да", "Нет"]
  },
  {
    id: '2',
    question: "Укажите количество кредиторов:",
    options: ["1", "2", "3", "более 3х"]
  },
  {
    id: '3',
    question: "Кто ваши кредиторы?",
    options: ["Банки", "МФО", "И те и другие"]
  },
  {
    id: '4',
    question: "Есть действующие просрочки?",
    options: ["Да", "Нет"]
  },
  {
    id: '5',
    question: "Есть залоговое кредитование или ипотека?",
    options: ["Да", "Нет"]
  },
  {
    id: '6',
    question: "Есть недвижимое имущество в собственности (кроме единственного жилья)?",
    options: ["Да", "Нет"]
  },
  {
    id: '7',
    question: "Есть автомобиль в собственности?",
    options: ["Да", "Нет"]
  },
  {
    id: '8',
    question: "Есть автокредит?",
    options: ["Да", "Нет"]
  },
  {
    id: '9',
    question: "Официально трудоустроены?",
    options: ["Да", "Нет"]
  },
  {
    id: '10',
    question: "Долги ФССП (судебные приставы)?",
    options: ["Да", "Нет"]
  },
  {
    id: '11',
    question: "Долги по налогам?",
    options: ["Да", "Нет"]
  }
];