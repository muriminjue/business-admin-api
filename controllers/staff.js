const db = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const get = async (req, res) => {
    var staff = await db.Staff.findAll();
    console.log (req.user)
    res.send(staff);
}

const add = async (req, res) => {
    const {
        file,
        body: { name },
    } = req;

    if (
        file.detectedFileExtension == ".jpeg" ||
        file.detectedFileExtension == ".png" ||
        file.detectedFileExtension == ".jpg"
    ) {
        const filename = file.originalName;

        await pipeline(
            file.stream,
            fs.createWriteStream("public/uploads/images/" + filename)
        );
        await db.Staff.create({
            fname: req.body.firstname,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
            natid: req.body.natid,
            designation: req.body.designation,
            image: filename,
        });
        res.status(200).send("Submitted");
    } else {
        res.send("invalid image");
        console.log("invalid image");
    }
}

const staff = {
    get: get,
    add: add
}

module.exports = staff;