const { default: mongoose } = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        userName: String,
        email: String,
        password: String
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;



//Parola hashlenmeli
//JWT alımı sırasında ayak izi kaydedilmeli ( IP adresi, cihaz bilgisi vb. )
//lastloginde ( en son giriş zamanı ) güncellemesi yapılmalı