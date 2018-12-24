import User from '../models/user';
import { get } from 'mongoose';

const UserController = {};

UserController.getAll = async (req, res) => {
    try {
       // await User.find().exec((err, users) => {
        const users = await User.find();
            if (!users) {
                res.status(500).send(err);
            }
            return  res.status(200).json({
                isSuccess: true,
                users: users
                });
      //  });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            message: err.message,
            error: err
        });
    }
};

UserController.getOneUser = async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(user);
       // await User.findById((_id), function(err, user) {
        const user = await User.findById(_id);
            if(!user) {
                throw err;
            } else {
                return  res.status(200).json({
                    isSuccess: true,
                    users: user
                    });
            }
            
       // });
    } catch(e) {
        return res.status(400).json({
            isSuccess: false,
            message: e.message,
            error: e
        });
    }
};

UserController.addUser = async (req, res) => {
    try {
        const { password, refNames, firstName, gender, email } = req.body;

        console.log(typeof gender);
        if (!password) {
            return res.status(400).json({
                isSuccess: false,
                error: {
                    message: 'password is required field'
                }
            });
        }
        const user = new User({
            password,
            refNames,
            firstName,
            gender,
            email
        });
        await user.save();
        return res.json({
            isSuccess: true,
            user
        });
        // const firstName = data.firstName;
        // const gender = data.gender;
        // const email = data.email;

    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        });
    }
};


 UserController.updateUser = async (req, res) => {

    try {
        const _id = req.params.id;
        const { password, refNames, firstName, gender, email } = req.body;
        //await User.findByIdAndUpdate(_id, { $set: { password, refNames, firstName, gender, email }}, (err, user) => {
        const user = await User.findByIdAndUpdate(_id, { $set: { password, refNames, firstName, gender, email }});
            if (!user) {
                return res.status(400).json({
                    isSuccess: false,
                     err: err.message
                    });
            } else {
                return res.status(200).json({
                    isSuccess: true,
                    user: user});
            }
   //   });
    } catch (e) {
        return res.status(400).json({
            isSuccess: false, 
            error: e.message
        });
    }
};


UserController.deleteUser = async (req, res) => {
    try {
        const _id = req.params.id;
        //await User.findByIdAndRemove(_id, (err, user) => {
        const user = await User.findByIdAndRemove(_id);
            if (!user) {
                return res.status(400).json({
                    isSuccess: false,
                    error: err.message
                });
            } else {
                return res.status(200).json({
                    isSuccess: true
                });
            }
        //});
    } catch (e) {
        return res.status(400).json({
            isSuccess: false,
            error: e.message
        });
    }
};


export default UserController;
