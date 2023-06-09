import * as Express from "express";
const app: Express.Application = Express();

app.use(Express.json());

interface User {
    username: string,
    password: string
};

const USERS: User[] = [
    { username: "jankowalski", password: "123" },
    { username: "antoniukwitold", password: "abc" }
];

interface Status {
    status: number,
    message: string
};

app.post("/login", (req: Express.Request, res: Express.Response) => {
    const body: User = {
        username: req.body.username,
        password: req.body.password
    };

    let status: Status;
    const user = USERS.find((u: User) => u.username == body.username && u.password == body.password);
    if(user !== undefined) {
        status = { status: 200, message: "Signed in successfully" };
    } else {
        status = { status: 404, message: "User with that username and password not found" };
    }

    res.json(status);
});

app.listen(3000);
