interface calendarContInter {
    connectDB: Function;
    insert: Function;
    getList: Function;
    remove: Function;
    update: Function;
}

interface query {
    year: string;
    month: string;
    date: string;
}

interface schedule {
    StartDateTime: number;
    EndDateTime: number;
    Title: string;
    Memo: string;
    AllDay: boolean;
}

const arLastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const calendarController = {
    insert: (
        StartDateTime: string,
        EndDateTime: string,
        UserKey: Number,
        Title: String,
        Memo: String,
        AllDay: Boolean,
        callback: Function
    ) => {
        console.log(UserKey);
        const schedule = new (global as any).CalModel({
            StartDateTime: new Date(StartDateTime).getTime() + 3600000 * 9,
            EndDateTime: new Date(EndDateTime).getTime() + 3600000 * 9,
            UserKey: UserKey,
            Title: Title,
            Memo: Memo,
            AllDay: AllDay,
        });
        schedule.save((err: string, result: any) => {
            if (err) {
                console.log(err);
                callback(err, null);
                return;
            } else {
                callback(null, result);
                console.log(result);
            }
        });
    },

    getList: (UserKey: number, q: query, callback: Function) => {
        (global as any).CalModel.find(
            {
                UserKey: UserKey,
                StartDateTime: {
                    $gte:
                        new Date(
                            `${q.year}-${q.month}-${
                                q.date ? q.date : "01"
                            }T00:00`
                        ).getTime() +
                        3600000 * 9,
                    $lte:
                        new Date(
                            `${q.year}-${q.month}-${
                                q.date
                                    ? q.date
                                    : arLastDay[parseInt(q.month) - 1]
                            }T23:59`
                        ).getTime() +
                        3600000 * 9,
                },
            },
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

    remove: (id: string, UserKey: number, callback: Function) => {
        (global as any).CalModel.remove(
            { _id: id, UserKey: UserKey },
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

    update: (
        id: string,
        UserKey: number,
        schedule: schedule,
        callback: Function
    ) => {
        (global as any).CalModel.update(
            { _id: id, UserKey: UserKey },
            { $set: schedule },
            { multi: false },
            (err: any, result: any) => {
                if (err) {
                    console.log(err);
                    callback(err, null);
                    return;
                } else {
                    console.log(result);
                    callback(null, result);
                }
            }
        );
    },
};

module.exports = calendarController;
