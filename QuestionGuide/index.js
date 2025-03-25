const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const connection = require('./database')
const questionModel = require('./database/question')
const responseModel = require('./database/response')

const app = express()

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurar EJS
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
  questionModel
    .findAll({
      raw: true,
      order: [['id', 'DESC']],
    })
    .then((q) => {
      res.render('index', { questions: q })
    })
})

app.get('/question', (req, res) => {
  res.render('question')
})

app.post('/save-question', (req, res) => {
  var title = req.body.title
  var description = req.body.description
  questionModel
    .create({
      title: title,
      description: description,
    })
    .then(() => {
      res.redirect('/')
    })
})

app.get('/question/:id', (req, res) => {
  var id = req.params.id
  questionModel
    .findOne({
      where: { id: id },
    })
    .then((question) => {
      if (question != undefined) {
        responseModel
          .findAll({
            where: { questionId: question.id },
            order: [['id', 'DESC']],
          })
          .then((responses) => {
            res.render('question-detail', {
              question: question,
              responses: responses,
            })
          })
      } else {
        res.redirect('/')
      }
    })
})

app.post('/save-response', (req, res) => {
  var body = req.body.body
  var questionId = req.body.questionId
  responseModel
    .create({
      body: body,
      questionId: questionId,
    })
    .then(() => {
      res.redirect('/question/' + questionId)
    })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
