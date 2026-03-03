// const bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'


const GenrateTokenByEmail = async (email)=>{
    return await bcrypt.hash(email.toString(), 10)
}

export default GenrateTokenByEmail


