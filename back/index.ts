import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import dataJson from './data/data.json';

const app: Application = express();
app.use(cors());
app.use(express.json());

type User = { email: string; number: string; };
type Users = { users: User[]; }


let dataBase: Users;

app.listen(5038, () => {
    dataBase = dataJson;
    console.log('CONNECTED')
})

let timerId: ReturnType<typeof setTimeout>;
let timerActive: boolean = false;
let prevRes: Response;

const GetUserApi = (req: Request, res: Response) => {
    try {
        const data = req.body;
        const responseData = dataBase.users.find((user) => user.email.toLowerCase() === data.email.toLowerCase() && (data.number ? user.number === data.number.toString() : true));
        res.send(responseData);
        timerActive = false;
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

app.post('/api/testapp/GetUser', (req: Request, res: Response) => {
    if (timerActive) {
        clearTimeout(timerId);
        prevRes.status(500).send('error');
    }
    timerActive = true;
    timerId = setTimeout(() => { GetUserApi(req, res) }, 5000);
    prevRes = res;
});