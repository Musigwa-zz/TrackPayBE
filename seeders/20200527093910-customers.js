module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("customers", [
      {
        fullName: "Fred Barasa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Imelda Kundu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Leah Kundu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Beatrice Wafula Machuma",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "John Juma Shitoshe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Donald Masika",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Bilasio Masinde",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Peter Masinde",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Francis S. Misiko",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Peter Wechuli Nakitare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Mwanaisha Nekesa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "John Nyongesa",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("customers", null, {});
  },
};
