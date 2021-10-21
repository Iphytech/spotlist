import express, { Express } from 'express';
import 'express-async-errors' //for catching async errrors in express
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import cookieSession from 'cookie-session'

// require those routes which I created seperately
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';
import { errorHandler } from './middlewares/error-handler'
import { PageNotFoundError } from './errors/page-not-found-error'

const app: Express = express();
app.set('trust proxy', true)
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(
  cookieSession({
    signed: false
  })
)

dotenv.config();

//Routes imported here
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.all('*', () => {
  throw new PageNotFoundError()
})


app.use(errorHandler)

export { app }