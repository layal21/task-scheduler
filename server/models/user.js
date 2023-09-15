const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    
    username:{
        type : String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    password:{
        type : String,
        required: true
    }
})

//hashing password
userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next()
        }
        const salt = 10
        const hash = await bcrypt.hash(this.password , salt)
        this.password = hash
        return next()

    }catch(err){
        return next(err)
    }
})
userSchema.methods.comparedPassword = function(password){
    return bcrypt.compare(password, this.password)
}

userSchema.index({userId: 1})
const User = mongoose.model('User', userSchema)

module.exports = User