import db from '../../database/mongo.ts';
import { User } from '../models/User.ts';
const users = db.collection('Users');

const Register = async (user: User) => {
    return await users.insertOne(user);
}

const FindByEmail = async(email: string) => {
    return await users.findOne({ email: email });
}

const Update = async (user: User, id: string) => {
    return await users.updateOne({_id: id}, user)
}

const GetAllUsers = async () => {
    return await users.find();
}

export { Register, FindByEmail, Update, GetAllUsers };