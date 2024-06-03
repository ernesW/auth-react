const mongoose = require("mongoose"); 
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, } = require("../auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token");

// Estructura de Usuarios para la base de datos

const UserSchema = new mongoose.Schema({ 
    id: { type: Object},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
});

// Antes de guardar el usuario, si la contraseña es nueva o ha sido modificada, la encriptamos
UserSchema.pre('save', function(next) { 
    if(this.isModified('password') || this.isNew) {
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash) => {
            if(err) {
                next(err);
            } else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

//comprobar si el nombre de usuario ya existe
UserSchema.methods.usernameExist = async function(username) {
    const result = await mongoose.model('User').find({ username });
    
    return result.length > 0;
};

//comprobar si la contraseña es correcta
UserSchema.methods.comparePassword = async function(password, hash) {
    const same = bcrypt.compareSync(password, hash);
    return same;
};

//crear token de acceso
UserSchema.methods.createAccessToken = function() {
    return generateAccessToken(getUserInfo(this));
}

//crear token de refresco y guardarlo en la base de datos
UserSchema.methods.createRefreshToken =  async function() {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {
        await new Token({token: refreshToken}).save();
        return refreshToken;

    } catch (error) {
        console.error(error);
        
    }
}

// acabo de cambiar mongoose a Mongoose

module.exports = mongoose.model('User', UserSchema);