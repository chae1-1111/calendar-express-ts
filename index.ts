const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const auth = require("./auth/auth");
const conn = require("./controller/connectDB");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.all("*", (req: any, res: any, next: any) => {
    const apikey: string = req.body.apikey || req.query.apikey;
    if (!auth(apikey)) {
        res.status(401).json({ code: 401, message: "Invalid API key" });
    } else {
        next();
    }
});

app.use("/test", require("./router/testRouter"));

app.use("/calendar", require("./router/calendarRouter"));

app.use("/member", require("./router/memberRouter"));

app.use(cors());

app.disable("x-powered-by");

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행 중...`);
    conn();
});
