const conn = require("../config/dbConn");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '2h' });
}

const register = async (req, res) => {
  const { name, userName, password } = req.body;
//   if (!name || !userName || !password) {
//     let msg = "Pls enter the all fields";
//     return res.render("../views/pages/register.ejs", { errMsg: msg } )
//   } else {
	
    await conn.connect(async (err) => {
      let sql = `SELECT * FROM login WHERE email='${userName}'`;
      await conn.query(sql, async (err, result) => {
        if (err) throw err;
        if (result != "") {
			let msg = "User Already Exist. Please Login";
			return res.render("../views/pages/register.ejs", { errMsg: msg } )
        } else {
          // if (password === confirmPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const token = generateAccessToken({ username: userName,name: name, });
          const insert = `INSERT INTO login (name,password,email,role) VALUES ('${name}','${hashedPassword}','${userName}', '1')`;
          if (await conn.query(insert)) {
			res.cookie("token", token, { maxAge: 300 * 1000 }).redirect("/dashboard")
          }
        }
      });
    });
//   }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    await conn.connect(async (err) => {
      let sql = `SELECT * FROM login WHERE email='${userName}'`;
      await conn.query(sql, async (err, result) => {
        if (err) throw err;
        if (!result.length) {
          let msg = "User not found";
          return res.render("../views/pages/login.ejs", { errMsg: msg } )
        } else {
          let pwd;
          result.map((value) => {
            pwd = value.password;
          });
          //   console.log(pwd);
          let validPassword = await bcrypt.compare(password, pwd);
          if (!validPassword) {
            let msg = "Miss Matched Password";
            return res.render("../views/pages/login.ejs", { errMsg: msg } )
          } else {
            const token = generateAccessToken({ username: userName,name: result[0].name});
            if (token) {
				console.log(result);
				res.cookie("token", token, { maxAge: 300 * 1000 })
				.redirect("/home")
            }
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
