const memberRouter = require("express").Router();
const memberCont = require("../controller/memberCont");

memberRouter.route("/").get((req: any, res: any) => {
    //login
    const userid = req.query.userid;
    const userpw = req.query.userpw;
    let resultJson: any = {};
    memberCont.login(userid, userpw, (err: any, result: any) => {
        if (err) {
            resultJson.code = 400;
            resultJson.message = "login Failed";
        } else {
            if (result.length != 0) {
                resultJson.code = 200;
                resultJson.message = "login Success";
                resultJson.userkey = result[0].UserKey;
                resultJson.name = result[0].Name;
            } else {
                resultJson.code = 201;
                resultJson.message = "no matching Users";
            }
        }
        res.status(resultJson.code).json(resultJson);
    });
});

memberRouter.route("/").post((req: any, res: any) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    let resultJson: any = {};
    memberCont.join(userid, userpw, name, (err: any, result: any) => {
        if (err) {
            resultJson.code = 400;
            resultJson.message = "Sign Up failed.";
        } else {
            resultJson.code = 200;
            resultJson.message = "Signed Up Successful";
            resultJson.UserKey = result.UserKey;
        }
        res.status(resultJson.code).json(resultJson);
    });
});

module.exports = memberRouter;
