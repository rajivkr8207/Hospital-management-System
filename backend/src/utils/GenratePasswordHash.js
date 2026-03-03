// const bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'

const GenratePasswordHash = async (password)=>{
    return await bcrypt.hash(password, 10)
}

export default GenratePasswordHash