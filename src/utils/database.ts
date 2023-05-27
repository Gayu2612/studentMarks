"use strict";
import * as mongoose from "mongoose";
import { User } from "../models/user.model";
import * as Config from "../config";

//Connect to MongoDB
export class mongoconnect {
  connectToDb(): any {
    try {
      mongoose.set("debug", true);
      mongoose.connect(Config.SERVER.MONGODB_URL);
      console.info("Connect to Database");
      var db = mongoose.connection;
      db.on("error", console.error.bind(console, "connection error:"));
      db.once("open", function () {
        var fs = require("fs"),
          obj3;
        fs.readFile("./src/upload/user.json", handleFileUser);

        function handleFileUser(err, data3) {
          if (err) throw err
          obj3 = JSON.parse(data3)
          User.find().countDocuments(function (err, count) {
            if (count === 0) {
              User.collection.insertMany(obj3, function (err, docs) {
                if (err) {
                  return console.error(err);
                } else {
                  console.log("Multiple documents inserted to Collection");
                }
              });
            }
          });
        }
      });
    } catch (err) {
      console.error("Connection error" + err);
    }
  }
}
