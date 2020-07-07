import db from '../../database/mongo.ts';
import { User } from '../models/Users.ts';
const users = db.collection('Users');

const Register = async (user: User) => {
    return await users.insertOne(user);
}

const FindByEmail = async(email: string) => {
    var user: User = await users.findOne({email:email});
    return user;
}

export { Register, FindByEmail };