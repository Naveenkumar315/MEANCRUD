var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const studentCollection = mongoose.connection.collection("students");

router.post("/create", (req, res) => {
  const { firstName, lastName, age, phoneNo } = req.body;

  studentCollection
    .insertOne({
      firstName,
      lastName,
      age,
      phoneNo,
    })
    .then(() => {
      res.send("1");
    })
    .catch((err) => {
      console.log(err);
      res.send("0");
    });
});

router.get("/get", (req, res) => {
  studentCollection
    .find({})
    .toArray()
    .then((students) => {
      res.status(200).json({ students });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errmsg: 'Error: ' + err });
    });
});

router.put("/put", (req, res) => {
  const { _id, firstName, lastName, age, phoneNo } = req.body;

  studentCollection
    .updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          firstName,
          lastName,
          age,
          phoneNo,
        },
      }
    )
    .then(() => {
      res.send("2");
    })
    .catch((err) => {
      console.log(err);
      res.send("0");
    });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  studentCollection
    .deleteOne({ _id: new ObjectId(id) })
    .then(() => {
      res.send("1");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errmsg: err });
    });
});

module.exports = router;
