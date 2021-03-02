const bcrypt = require('bcrypt')
const LocaStrategy = require('passport-local').Strategy
const User = require('./src/User')

module.exports = function(passport){
    passport.use(new LocaStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try{
                const user = await findUser(username)

                if(!user){return done(null, false)}

                const isValid = await bcrypt.compare(password, user.password)
                if(!isValid){return done(null, false)}

                return done(null, user)
            } catch(err){
                done(err, false)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findUserById(id)
            done(null, user)
        } catch (err){
            done(err, null)
        }
    })

    async function findUser(username){
        const user = await User.findOne({name: username})
        return user
    }
    
    async function findUserById(id){
        return await User.findById(id)
    }

}