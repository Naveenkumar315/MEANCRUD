var express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

router.post("/create", (req, res) => {
  let db = mongoose.connection.db;
  let collection = "students";
  db.collection(collection).insertOne(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      phoneNo: req.body.phoneNo, // Corrected line
    },
    function (err, result) {
      if (err) {
        res.send("0");
      } else {
        res.send("1");
      }
    }
  );
  res.send("1");
  console.log("**************" + JSON.stringify(req.body.firstName));
});

router.get("/get", (req, res) => {
  let db = mongoose.connection.db;
  let collection = "students";
  db.collection(collection)
    .find({})
    .toArray()
    .then((students) => {
      res.status(200).json({ students });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errmsg: err });
    });
});

router.put("/put", (req, res) => {
  let db = mongoose.connection.db;
  let collection = "students";
  console.log("IIIIIIIIIIIIIIIII" + req.body._id);
  db.collection(collection)
    .updateOne(
      { _id: new ObjectId(req.body._id) },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          age: req.body.age,
          phoneNo: req.body.phoneNo,
        },
      }
    )
    .then((result) => {
      console.log("updated success" + JSON.stringify(result));
      res.send('2'); // Send the updated result as response
    })
    .catch((err) => {
      console.log("update err" + err);
      res.send("0"); // Send '0' as response to indicate an error
    });
});

router.delete("/delete/:id", (req, res) => {
  let db = mongoose.connection.db;
  let collection = "students";
  let id = req.params.id;
  console.log("IIIIIIIIIIIIIIIII " + id);
  db.collection(collection)
    .deleteOne({ _id: new ObjectId(id) }) // Corrected line
    .then((student) => {
      console.log(JSON.stringify(student));
      res.send('1');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errmsg: err });
    });
});

module.exports = router;
