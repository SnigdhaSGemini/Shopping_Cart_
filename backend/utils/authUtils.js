import bcrypt from 'bcrypt'

// bcrypt password
export const bcryptPassword = async(password)=>{
    try{
        const saltRounds = 7;
        const bcryptedPassword  = await bcrypt.hash(password,saltRounds)
        return bcryptedPassword;

    }catch(err){
        console.log(err);
    }
}

// check password
export const checkPassword = async (password,bcryptedPassword)=>{
    return bcrypt.compare(password,bcryptedPassword)
}