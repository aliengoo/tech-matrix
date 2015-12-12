module.exports = {
  token: {
    secret: "milesandmilesandmilesofroad"
  },
  ldap: {
    url: "ldap://10.0.0.16:389",
    usersDn: "cn=users,dc=diskstation,dc=com"
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
