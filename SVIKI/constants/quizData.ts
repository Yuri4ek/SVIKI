export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  subQuestion?: {
    triggerValue: string;
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
      question: "Сколько месяцев длится просрочка?",
      options: ["1", "2", "3", "более 3х месяцев"]
    }
  },
  {
    id: '5',
    question: "Есть залоговое кредитование или ипотека?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Какой примерный остаток по ипотеке?",
      options: ["до 1 млн", "до 2х млн", "до 3х млн", "свыше 3 млн"]
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
    question: "Есть автокредит?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Остаток по автокредиту:",
      options: ["до 1 млн", "свыше 1 млн"]
    }
  },
  {
    id: '9',
    question: "Официально трудоустроены?",
    options: ["Да", "Нет"]
  },
  {
    id: '10',
    question: "Долги ФССП (судебные приставы)?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Какая сумма долга ФССП?",
      options: ["до 100т", "до 300т", "до 500т", "до 1 млн", "до 2х млн", "до 3х млн", "свыше 3 млн"]
    }
  },
  {
    id: '11',
    question: "Долги по налогам?",
    options: ["Да", "Нет"],
    subQuestion: {
      triggerValue: "Да",
      question: "Какая сумма долга по налогам?",
      options: ["до 100т", "до 300т", "до 500т", "до 1 млн", "до 2х млн", "до 3х млн", "свыше 3 млн"]
    }
  }
];