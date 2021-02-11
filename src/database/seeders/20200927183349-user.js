"use strict";
import authUtils from "../../utils/authUtil";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import genKey from '../../utils/apiKeyGen';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid:uuidv4(),
          firstName: "mucyo",
          lastName: "christian",
          email: "mucyochristian2@gmail.com",
          phoneNumber: "+250781468561",
          password: await authUtils.hashPassword("chris@32"),
          role: 'ADMIN',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    const users = await queryInterface.sequelize.query(
      'SELECT uuid from users;'
  );
  await queryInterface.bulkInsert(
    "api_features",
    [
      {
        uuid:uuidv4(),
        feature: "monthly",
        createdAt: moment(new Date()).format(),
        updatedAt: moment(new Date()).format(),
      },
    ],
    {}
  );
  const api_feature = await queryInterface.sequelize.query(
    'SELECT uuid from api_features;'
);
console.log(api_feature)
console.log(api_feature[0][0].uuid)
await queryInterface.bulkInsert(
  "shops",
  [
    {
      uuid:uuidv4(),
      apiFeatureId: api_feature[0][0].uuid,
      apiKey: genKey(),
      name: "kigalimart",
      email: "kigalimart@gmail.com",
      phoneNumber: "+250781468561",
      host: 'http://127.0.0.1:5500',
      api_createdAt: moment(new Date()).format(),
      createdBy: users[0][0].uuid,
      createdAt: moment(new Date()).format(),
      updatedAt: moment(new Date()).format(),
    },
    {
      uuid:uuidv4(),
      apiFeatureId: api_feature[0][0].uuid,
      apiKey: genKey(),
      name: "hehemart",
      email: "hehe@gmail.com",
      phoneNumber: "+250781468561",
      host: 'http://localhost',
      api_createdAt: moment(new Date()).format(),
      createdBy: users[0][0].uuid,
      createdAt: moment(new Date()).format(),
      updatedAt: moment(new Date()).format(),
    },
  ],
  {}
);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete('shops', null, {});
    await queryInterface.bulkDelete('api_features', null, {});
  },
};
