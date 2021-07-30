const mongoose = require('../../database')

const UserGoogleSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    createdAt: { type: Date, default: Date.now },
    ahorros: { type: String, initialize: 0 },
    salario: { type: String, initialize: 0 },
    photoProfile: String,
    photoBanner: String,
})

UserGoogleSchema.pre('save', async function (next) {
    next()
})

const UserGoogle = mongoose.model('UserGoogle', UserGoogleSchema)

module.exports = UserGoogle