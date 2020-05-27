module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("seasons", [
      {
        id: "110",
        name: "2012, Short Rain",
        startDate: "2012-01-08T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "120",
        name: "2013, Long Rain",
        startDate: "2013-01-03T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "130",
        name: "2013, Short Rain",
        startDate: "2013-01-08T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "140",
        name: "2014, Long Rain",
        startDate: "2014-01-03T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "150",
        name: "2014, Short Rain",
        startDate: "2014-01-08T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "160",
        name: "2015, Long Rain",
        startDate: "2015-01-03T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "170",
        name: "2015, Short Rain",
        startDate: "2015-01-08T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "180",
        name: "2016, Long Rain",
        startDate: "2016-01-03T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "190",
        name: "2016, Short Rain",
        startDate: "2016-01-08T00:00:00+02:00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("seasons", null, {});
  },
};
