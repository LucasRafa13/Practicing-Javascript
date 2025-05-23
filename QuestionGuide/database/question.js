const Sequelize = require('sequelize')
const connection = require('./index')

const Question = connection.define('question', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
})

Question.sync({ force: false }).then(() => {})

module.exports = Question
