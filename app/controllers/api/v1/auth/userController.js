const userService = require("../../../../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const hashPassword = await bcrypt.hashSync(req.body.password, 10);
      const data = await userService.create({
        role: req.body.role,
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        image: req.body.image,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        status: true,
        message: "User successfully registered!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async login(req, res) {
    try {
      // login user
      const mail = req.body.email;
      const user = await userService.getByEmail(mail);
      if (!user) return res.status(404).send({ message: "Email Not Found" });

      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ message: "Wrong Password" });

      const id = user.id;
      const role = user.role;
      const name = user.name;
      const email = user.email;
      const accessToken = jwt.sign(
        { id, role, name, email },
        process.env.ACCESS_TOKEN || "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        status: true,
        message: "Login Success!",
        accessToken: accessToken,
      });
    } catch (err) {
      res.status(404).json({
        status: false,
        message: err.message,
      });
    }
  },

  async profile(req, res) {
    try {
      const userTokenId = req.user.id
      const data = await userService.getById(userTokenId);
        res.status(200).json({
          status: true,
          message: "Successfully find data user",
          data: data,
        });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
  async updateProfile(req, res) {
    try {
      const userTokenId = req.user.id;
      await userService.updateCurrentUser(userTokenId, req.body);
      const updatedData = await userService.getById(userTokenId);

      res.status(200).json({
        status: true,
        message: "Successfully update data user",
        data: updatedData,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async changePassword(req, res) {
    try {
      const userTokenEmail = req.user.email;
      const userTokenId = req.user.id;
      const user = await userService.getByEmail(userTokenEmail);

      const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
      if (!isMatch) {
        res.status(400).json({
          status: false,
          message: "Password is incorrect!",
        });
        return;
      }
      await userService.updateCurrentUser(userTokenId, req.body);

      res.status(200).json({
        status: true,
        message: "Successfully change password!",
      });
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },
};