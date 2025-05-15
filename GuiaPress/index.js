const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')

const CategoriesController = require('./categories/CategoriesController')
const ArticleController = require('./articles/ArticlesController')

const Article = require('./articles/Article')
const Category = require('./categories/Category')

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database connection
connection
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!')
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error)
  })

// Routes
app.use('/', CategoriesController)
app.use('/', ArticleController)

app.get('/', (req, res) => {
  Article.findAll({
    order: [['id', 'DESC']],
  }).then((articles) => {
    Category.findAll().then((category) => {
      res.render('index', { articles: articles, categories: category })
    })
  })
})

app.get('/:slug', (req, res) => {
  var slug = req.params.slug
  Article.findOne({
    where: {
      slug: slug,
    },
  })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((category) => {
          res.render('article', { article: article, categories: category })
        })
      } else {
        res.redirect('/')
      }
    })
    .catch((error) => {
      console.error('Erro ao buscar o artigo:', error)
      res.redirect('/')
    })
})

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug
  Category.findOne({
    where: {
      slug: slug,
    },
    include: [{ model: Article }],
  })
    .then((category) => {
      if (category != undefined) {
        Category.findAll().then((categories) => {
          res.render('index', {
            articles: category.articles,
            categories: categories,
          })
        })
      } else {
        res.redirect('/')
      }
    })
    .catch((err) => {
      console.error('Erro ao buscar a categoria:', err)
      res.redirect('/')
    })
})

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080')
})
