const calendarRouter = require("express").Router();
const calendarCont = require("../controller/calendarCont");

calendarRouter.route("/").get((req: any, res: any) => {
    const UserKey = req.query.userkey;
    const q: {
        year: string;
        month: string;
        date: string;
    } = {
        year: req.query.year,
        month: req.query.month >= 10 ? req.query.month : "0" + req.query.month,
        date: req.query.date
            ? req.query.date >= 10
                ? req.query.date
                : "0" + req.query.date
            : null,
    };
    let resultJson: any = {};
    calendarCont.getList(UserKey, q, (err: any, result: any) => {
        if (err) {
            resultJson.code = 200;
            resultJson.message = "Connection to Database failed.";
            res.status(resultJson.code).json(resultJson);
        } else {
            resultJson.code = 200;
            resultJson.result = result;
            res.status(resultJson.code).json(resultJson);
        }
    });
});

calendarRouter.route("/").post((req: any, res: any) => {
    const StartDateTime = req.body.StartDateTime;
    const EndDateTime = req.body.EndDateTime;
    const UserKey = req.body.UserKey;
    const Title = req.body.Title;
    const Memo = req.body.Memo || ""; // Optional
    const AllDay = req.body.AllDay;
    let resultJson: any = {};
    calendarCont.insert(
        StartDateTime,
        EndDateTime,
        UserKey,
        Title,
        Memo,
        AllDay,
        (err: any, result: any) => {
            if (err) {
                resultJson.code = 400;
                resultJson.message = "Insert schedule failed.";
                res.status(resultJson.code).json(resultJson);
            } else {
                resultJson.code = 200;
                resultJson.message = "Insert schedule Successful";
                res.status(resultJson.code).json(resultJson);
            }
        }
    );
});

calendarRouter.route("/").delete((req: any, res: any) => {
    const id = req.body.id;
    const UserKey = req.body.UserKey;
    let resultJson: any = {};

    calendarCont.remove(id, UserKey, (err: any, result: any) => {
        if (err) {
            resultJson.code = 400;
            resultJson.message = "Delete Schedule Failed";
        } else {
            resultJson.code = 200;
            resultJson.message = "Delete Schedule Successful";
        }
        res.status(resultJson.code).json(resultJson);
    });
});

calendarRouter.route("/").put((req: any, res: any) => {
    const id = req.body.id;
    const UserKey = req.body.UserKey;
    const schedule = {
        StartDateTime: new Date(req.body.StartDateTime).getTime() + 3600000 * 9,
        EndDateTime: new Date(req.body.EndDateTime).getTime() + 3600000 * 9,
        Title: req.body.Title,
        Memo: req.body.Memo,
        AllDay: req.body.AllDay,
    };
    let resultJson: any = {};

    calendarCont.update(id, UserKey, schedule, (err: any, result: any) => {
        if (err) {
            resultJson.code = 400;
            resultJson.message = "Update Schedule Failed";
        } else {
            resultJson.code = 200;
            resultJson.message = "Update Schedule Successful";
        }
        res.status(resultJson.code).json(resultJson);
    });
});

module.exports = calendarRouter;
