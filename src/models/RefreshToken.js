const { default: mongoose } = require("mongoose");


const refreshTokenSchema = new mongoose.Schema({
    token: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now, expires: '7d' } // Token 7 gün sonra geçersiz olur
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
