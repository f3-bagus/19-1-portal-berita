import Users from "../models/UserModels.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// Registrasi
export const Register = async (req, res) => {
  const { username, email, password, confPassword, role } = req.body;

  // Validasi Request
  if (!username || !email || !password || !confPassword || !role) {
    return res
      .status(400)
      .json({ success: false, msg: "Semua field harus diisi" });
  }

  // Konfirmasi Password
  if (password !== confPassword) {
    return res
      .status(400)
      .json({ success: false, msg: "Password tidak sesuai" });
  }

  // Hash Password
  const hashPassword = await argon2.hash(password);

  try {
    // Validasi Email
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email sudah digunakan" });
    }

    // Validasi Role
    const validRoles = ["user", "author"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, msg: "Peran tidak valid" });
    }

    // Set status "pending" jika peran adalah "author"
    const status = role === "author" ? "pending" : "active";

    // Buat pengguna baru
    const newUser = await Users.create({
      username,
      email,
      password: hashPassword,
      role,
      status,
    });

    // Periksa apakah penciptaan pengguna berhasil
    if (newUser) {
      // Respon untuk registrasi author yang butuh validasi
      if (role === "author") {
        return res.status(201).json({
          success: true,
          msg: "Registrasi sebagai author berhasil, menunggu validasi admin",
        });
      }

      // Respon untuk registrasi role lainnya
      return res
        .status(201)
        .json({ success: true, msg: "Registrasi Berhasil" });
    } else {
      return res.status(500).json({ success: false, msg: "Registrasi Gagal" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Validasi Author
export const ValidateAuthor = async (req, res) => {
  const { user_id } = req.body;

  try {
    // Cari pengguna berdasarkan ID
    const user = await Users.findByPk(user_id);

    // Jika pengguna tidak ditemukan atau bukan dengan status pending
    if (!user || user.status !== "pending") {
      return res.status(404).json({
        success: false,
        msg: "Pengguna tidak ditemukan atau tidak membutuhkan validasi",
      });
    }

    // Perbarui status dan peran pengguna
    user.status = "active";
    user.role = "author";
    await user.save();

    res.status(200).json({ success: true, msg: "Validasi author berhasil" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Login
export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Email dan Password harus diisi" });
  }

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User tidak ditemukan" });
    }

    const match = await argon2.verify(user.password, password);

    if (!match) {
      return res.status(400).json({ success: false, msg: "Password salah" });
    }

    if (user.role === "author" && user.status !== "active") {
      return res
        .status(403)
        .json({ success: false, msg: "Akun belum divalidasi oleh admin" });
    }

    const user_id = user.user_id;
    const username = user.username;
    const userEmail = user.email;
    const role = user.role;

    const accessToken = jwt.sign(
      { user_id, username, userEmail, role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res
      .status(200)
      .json({ success: true, msg: "Login berhasil", token: accessToken, role: role});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Terjadi kesalahan pada server" });
  }
};

// Me
export const Me = async (req, res) => {
  try {
    // Mengambil token dari cookie atau header
    const accessToken = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      return res.status(401).json({ success: false, msg: "Mohon Login dengan akun Anda" });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Cari pengguna berdasarkan user_id yang didapat dari token
    const user = await Users.findOne({
      attributes: ["user_id", "username", "email", "role"],
      where: {
        user_id: decoded.user_id,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User tidak ditemukan" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, msg: "Token tidak valid, mohon login kembali" });
    }
    res.status(500).json({ success: false, msg: "Terjadi kesalahan pada server" });
  }
};

// Logout
export const LogOut = async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ success: true, msg: "Logout berhasil" });
};

// Forget Password Endpoint
export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "User tidak ditemukan" });
    }

    // Generate token reset password
    const resetToken = jwt.sign(
      { user_id: user.user_id },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Simpan token reset password ke database pengguna (opsional)
    user.resetPasswordToken = resetToken;
    await user.save();

    // Kirim tautan reset password ke halaman reset password di frontend
    res.status(200).json({ success: true, resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Reset Password Endpoint
export const resetPassword = async (req, res) => {
  const { resetToken, newPassword, confPassword } = req.body;

  try {
    // Dekode token reset password
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);

    // Cari pengguna berdasarkan ID yang terkait dengan token
    const user = await Users.findOne({ where: { user_id: decoded.user_id } });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, msg: "Pengguna tidak ditemukan" });
    }

    // Validasi kata sandi baru
    if (newPassword !== confPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Konfirmasi password baru tidak cocok" });
    }

    // Hash password baru
    const hashedPassword = await argon2.hash(newPassword);

    // Simpan password baru ke database pengguna
    user.password = hashedPassword;
    await user.save();

    // Response sukses reset password
    res.status(200).json({ success: true, msg: "Password berhasil direset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: error.message });
  }
};
