import Users from "../models/UserModels.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["user_id", "username", "email", "role", "status"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["user_id", "username", "email", "role", "status"],
      where: {
        user_id: req.params.id,
      },
    });
    if (!response) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, email, password, confPassword, role } = req.body;
  if (password !== confPassword)
    return res.status(400).json({
      success: false,
      msg: "Password dan Confirm Password tidak cocok",
    });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      username: username,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(201).json({ success: true, msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        user_id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { username, email, password, confPassword, role } = req.body;
    let hashPassword;

    if (password === "" || password === null) {
      hashPassword = user.password;
    } else {
      if (password !== confPassword) {
        return res
          .status(400)
          .json({ msg: "Password and Confirm Password do not match" });
      }
      hashPassword = await argon2.hash(password);
    }

    // Update only the necessary fields
    await Users.update(
      {
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          user_id: user.user_id,
        },
      }
    );

    return res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(400).json({ msg: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        user_id: req.params.id,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    await Users.destroy({
      where: {
        user_id: user.user_id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
