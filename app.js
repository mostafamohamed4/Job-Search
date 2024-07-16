import express from 'express'
import { bootstrap } from './src/moodules/bootstrap.js'
import { globalError } from './middleware/globalError.js'
const app = express()
const port = 3000
app.use(express.json())
app.use('/uploads', express.static('uploads'));
bootstrap(app)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
