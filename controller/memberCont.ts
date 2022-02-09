const memberController = {
    login: (userid: string, userpw: string, callback: Function) => {
        (global as any).MemberModel.find(
            { Userid: userid, Userpw: userpw },
            (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                } else {
                    callback(null, result);
                }
            }
        );
    },

    join: (
        userid: string,
        userpw: string,
        name: string,
        callback: Function
    ) => {
        const member = new (global as any).MemberModel({
            Userid: userid,
            Userpw: userpw,
            Name: name,
        });
        member.save((err: any, result: any) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    },
};

module.exports = memberController;
