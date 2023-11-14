const User = require('../models/user-model');
 
module.exports.findAllUsers = (req, res) => {
    User.find()
        .then((allDaUsers) => {
            res.json(allDaUsers)
        })
        .catch((err) => {
            res.json(err)
        });
}
 
module.exports.findOneSingleUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(oneSingleUser => {
            res.json(oneSingleUser)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.createNewUser = (req, res) => {
    User.create(req.body)
        .then(newlyCreatedUser => {
            res.json(newlyCreatedUser)
        })
        .catch((err) => {
            res.status(400).json(err)
        });}
 
module.exports.updateExistingUser = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch((err) => {
            res.json(err)
        });}
 
module.exports.deleteAnExistingUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch((err) => {
            res.json(err)
        });}

module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}