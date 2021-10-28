import express from 'express';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/bcryptjs
 * @reference https://www.npmjs.com/package/jsonwebtoken
 * @reference https://github.com/basir/amazona/blob/master/backend/routers/userRouter.js
 */
const userRouter = express.Router();

userRouter.get(
  '/',
  async (req, res) => {
    res.sendStatus(200)
  }
)

userRouter.get(
  '/seed',
  async (req, res) => {
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  }
);

userRouter.post(
  '/signin',

  async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(404).send('No user found.');

      }

      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET, {
          expiresIn: 86400
        })

      })
      return;

    }
  });


userRouter.post(
  '/register',
  async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      postCode: req.body.postCode,
      password: bcrypt.hashSync(req.body.password, 8),

    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      postCode: createdUser.postCode,
      token: jwt.sign({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        postCode: createdUser.postCode,
        isAdmin: createdUser.isAdmin,
      }, process.env.JWT_SECRET, {
        expiresIn: 86400
      })

    })
    return;

  }
);


export default userRouter;
