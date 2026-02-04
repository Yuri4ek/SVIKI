export const MOCK_USER_DATA = {
  clients: [
    {
      id: 101,
      email: "client1@mail.ru",
      name: "Иван И.",
      phone: "89001112233",
      progress: 30,
    },
    {
      id: 102,
      email: "client2@gmail.com",
      name: "Петр П.",
      phone: "89004445566",
      progress: 60,
    },
    {
      id: 103,
      email: "client3@yandex.ru",
      name: "Анна С.",
      phone: "89007778899",
      progress: 90,
    },
  ],
  agents: [
    {
      id: 201,
      email: "agent@sviki.ru",
      name: "Агент 007",
      phone: "88005553535",
      progress: 0,
    },
  ],
  lawyers: [
    {
      id: 301,
      email: "lawyer@sviki.ru",
      name: "Сол Гудман",
      phone: "505-503-4455",
      progress: 0,
    },
  ],
  // Данные для клиента (его менеджеры)
  myManagers: [
    {
      id: 201,
      role: "Мой Агент",
      name: "Алексей Смирнов",
      phone: "+7 999 000-00-01",
    },
    {
      id: 301,
      role: "Мой Юрист",
      name: "Елена Кузнецова",
      phone: "+7 999 000-00-02",
    },
  ],
};