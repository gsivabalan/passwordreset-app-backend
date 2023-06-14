const express = require("express");
const mongodb = require("mongodb");

const app = express();
const db = mongodb.MongoClient.connect("mongodb+srv://passwordreset:passwordreset000@passwordreset0.g4ponpe.mongodb.net/?retryWrites=true&w=majority");

app.use(express.static("public"));

app.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

app.post("/forgot-password", (req, res) => {
  const email = req.body.email;

 
  const user = db.collection("users").findOne({ email });
  if (!user) {
    res.json({ error: "User not found!" });
    return;
  }

  
  const randomString = generateRandomString();
  const expiryDate = new Date().getTime() + 1000 * 60 * 60 * 24; 
  sendEmail(user.email, randomString, expiryDate);

  res.json({ success: true });
});

app.get("/reset-password/:randomString", (req, res) => {
  const randomString = req.params.randomString;

  const expiryDate = new Date(randomString);
  if (expiryDate < new Date()) {
    res.json({ error: "Link expired!" });
    return;
  }

  res.render("reset-password", { randomString });
});

app.post("/reset-password", (req, res) => {
  const randomString = req.body.randomString;
  const newPassword = req.body.newPassword;

  const expiryDate = new Date(randomString);
  if (expiryDate < new Date()) {
    res.json({ error: "Link expired!" });
    return;
  }


  db.collection("users").updateOne({ randomString }, { $set: { password: newPassword } });

  
  res.redirect("/login");
});


app.listen(9000, () => {
  console.log("Server started on port 9000");
});

