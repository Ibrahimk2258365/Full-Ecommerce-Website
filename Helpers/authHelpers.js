import bcrypt from "bcrypt";
import colors from "colors";
export const hashPassword = async (password) => {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword;
    } catch (error) {
        console.log(`error in hasing password ${error}`.bgRed.white);
    }
}

//compare password

export const comparedPassword = async (password, hashPassword) => {
    try {
        const matchedPassword = await bcrypt.compare(password, hashPassword);
        return matchedPassword;
    } catch (error) {
        console.log(`error while compared password ${error}`.bgRed.white);
    }
}