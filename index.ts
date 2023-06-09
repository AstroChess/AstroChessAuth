import * as Express from "express";
const app: Express.Application = Express();

app.use(Express.json());

enum HttpStatus {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    OK = 200
};

interface User {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string
};

interface UserLoginBody {
    username: string,
    password: string
};

interface UserRegisterBody {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string
};

const USERS: User[] = [
    { firstname: "Jan", lastname: "Kowalski", username: "jankowalski", email: "kowalskijan@interia.com", password: "123" },
    { firstname: "Witold", lastname: "Antoniuk", username: "antoniukwitold", email: "antoniukwitold@wp.pl", password: "abc" }
];

interface Status {
    status: number,
    message: string
};

app.post("/login", (req: Express.Request, res: Express.Response) => {
    const body: UserLoginBody = {
        username: req.body.username,
        password: req.body.password,
    };

    let status: Status;
    const user = USERS.find((u: User) => u.username == body.username && u.password == body.password);
    if(user !== undefined) {
        status = { status: HttpStatus.OK, message: "Signed in successfully" };
        res.status(HttpStatus.OK).json(status);
        return;
    } else {
        status = { status: HttpStatus.NOT_FOUND, message: "User with that username and password not found" };
        res.status(HttpStatus.NOT_FOUND).json(status);
        return;
    }
});

app.post("/register", (req: Express.Request, res: Express.Response) => {
    const body: UserRegisterBody = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirm_password: req.body.confirm_password
    };

    let status: Status;
    if(body.password !== body.confirm_password) {
        status = { status: HttpStatus.BAD_REQUEST, message: "Password and confirm password fields have to be the same" };
        res.status(HttpStatus.BAD_REQUEST).json(status);
        return;
    }

    const user = USERS.find((u: User) => u.username == body.username || u.email == body.email);
    if(user !== undefined) {
        status = { status: HttpStatus.BAD_REQUEST, message: "User with that username or email already exist" };
        res.status(HttpStatus.BAD_REQUEST).json(status);
        return;
    }

    const new_user: User = {
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        email: body.email,
        password: body.password
    };
    USERS.push(new_user);

    status = { status: HttpStatus.OK, message: "User registered successfully" };
    res.status(HttpStatus.OK).json(status);
});

app.listen(3000);
