const User = require('../models/user.js');

module.exports.login = (req, res, next) => {
    const neptunId = req.body.neptunId;
    let isRegistered = false;

     try {
        User.find({}, (err, users) => {
            if (err) return res.json({ success: false, msg: 'Something has gone wrong! :('});
            for (let user of users) {
                user.classes.forEach((classId) => {
                    if (classId.studentIds.includes(neptunId)) {
                        isRegistered = true;
                        return
                    }
                })
            }
            if (isRegistered) {
                res.status(201).json({ success: true, msg: 'Student succesfully logged in!', neptunId})
            } else {
                res.status(400).json({ success: false, msg: 'Student has not been registered yet!', neptunId})
            }
        })
     } catch(err) {
        console.error("error")
     }    
}