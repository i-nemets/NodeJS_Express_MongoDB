const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todosRoutes = require('./rotes/todos')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todosRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://nemets:cGi0OoSLYzRMdsUn@cluster0.uwwso.mongodb.net/todos',
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )

    app.listen(PORT, () => {
      console.log(`Server has been started ... PORT = ${PORT}`)
    })
  } catch (e) {
    console.log(`error --> ${e}`)
  }
}

start()
