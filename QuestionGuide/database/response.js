const Sequelize = require('sequelize')
const connection = require('./index')

const Response = connection.define('response', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
})

Response.sync({ force: true })

module.exports = Response
