import db from '../../database/mongo.ts';
//import { Category } from '../models/Category.ts';
const categories = db.collection('Categories');

const GetAllCategories = async () => {
    return categories.find();
}

export{ GetAllCategories }