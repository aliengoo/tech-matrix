module.exports = {
  token: {
    secret: "milesandmilesandmilesofroad"
  },
  ldap: {
    url: process.env.LDAP_URI,
    usersDn: process.env.LDAP_BASE_DSN
  },
  dbConnection: {
    database: "techmatrix",
    username: "tm_admin",
    password: "trustno1",
    options: {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  }
};
