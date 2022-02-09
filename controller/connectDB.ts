const mongoose = require("mongoose");
const mongoConf = require("../config/mongoDB.json");

const autoIncrement = require("mongoose-auto-increment");

const connectDB = () => {
    mongoose.Promise = global.Promise;

    mongoose.connect(mongoConf.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    (global as any).database = mongoose.connection;
    (global as any).database.on("error", () =>
        console.error.bind(console, "Connect Error in MongoDB!")
    );
    (global as any).database.on("open", () => {
        console.log("Connect Database!");
        autoIncrement.initialize(mongoose);
        (global as any).CalSchema = mongoose.Schema(
            {
                StartDateTime: Date,
                EndDateTime: Date,
                UserKey: Number,
                Title: String,
                Memo: String,
                AllDay: Boolean,
            },
            { versionKey: false }
        );
        (global as any).MemberSchema = mongoose.Schema(
            {
                UserKey: Number,
                Userid: String,
                Userpw: String,
                Name: String,
            },
            { versionKey: false }
        );

        (global as any).MemberSchema.plugin(autoIncrement.plugin, {
            model: "MemberModel",
            field: "UserKey",
            startAt: 100000,
            increment: 1,
        });

        (global as any).CalModel = mongoose.model(
            "calendar",
            (global as any).CalSchema
        );
        (global as any).MemberModel = mongoose.model(
            "member",
            (global as any).MemberSchema
        );
    });
};

module.exports = connectDB;
