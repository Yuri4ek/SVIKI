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
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Укажите примерную сумму:",
      options: ["до 100т", "до 500т", "до 1 млн", "свыше 1 млн"]
    }
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
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Сколько месяцев длится просрочка и просужены ли долги?",
      options: ["1 мес", "2 мес", "3 мес", "Более 3х мес", "Долги просужены"]
    }
  },
  {
    id: '5',
    question: "Есть залоговое кредитование или ипотека?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Примерный остаток по ипотеке:",
      options: ["до 1 млн", "до 2 млн", "до 3 млн", "свыше 3 млн"]
    }
  },
  {
    id: '6',
    question: "Есть недвижимое имущество в собственности (кроме единственного жилья)?",
    options: ["Да", "Нет"]
  },
  {
    id: '7',
    question: "Есть автомобиль в собственности?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Стоимость автомобиля:",
      options: ["до 1 млн", "свыше 1 млн"]
    }
  },
  {
    id: '8',
    question: "Официально трудоустроены?",
    options: ["Да", "Нет"]
  },
  {
    id: '9',
    question: "Долги ФССП (судебные приставы)?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Какая сумма долга у приставов:",
      options: ["до 100т", "до 500т", "до 1 млн", "до 3 млн", "свыше 3 млн"]
    }
  }
];