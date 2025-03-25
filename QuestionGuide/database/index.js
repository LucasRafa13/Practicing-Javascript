const Sequelize = require('sequelize')

const connection = new Sequelize('question_guide', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
})

module.exports = connection
