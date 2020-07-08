import { User } from '../models/User.ts';
import { Register, FindByEmail, Update, GetAllUsers } from '../repositories/UserRepository.ts';
import { compareSync, hashSync } from "https://deno.land/x/bcrypt@v0.2.1/mod.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt@v0.9.0/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const key = config().SECRET ?? 'ebcf221a85be7f9f3866c9925286e6be';

  const header: Jose = {
    alg: 'HS256',
    typ: 'JWT'
  };

const register = async (
  { request, response }: { request: any, response: any }) => {
    const {value} = await request.body();
    let name : string = value.name;
    let password : string = await hashSync(value.password);
    let email : string = value.email;
    var user: User = {
      name: name,
      password: password,
      email: email
    }
    if(!await FindByEmail(user.email))
    {
      const id = await Register(user);
      response.body = user;
      response.body.id = id;
      response.status = 200;
    }
    else
    {
      response.body = "Email already registered";
      response.status = 400;
    }
}

const login = async (
  { request, response }: { request: any, response: any }) => {
    const { value } = await request.body();
    const email: string = value.email;
    const password: string = value.password;
    const user = await FindByEmail(email);
    if (!user) {
      response.body = "Email not registered";
      response.status = 400;
    } else if (!compareSync(password, user.password)) {
      response.body = "Wrong Password";
      response.status = 400;
    } else {
      const payload : Payload = {
        iss: user.name,
        exp: setExpiration(Date.now() + 24000 * 60 * 60)
      };
      const jwt = makeJwt({ key: key || '', header, payload });
      response.body = 
      {
        jwt,
        user 
      }
      response.status = 200;
    }
  }

  const listUsersByCategory = async (
    { request, response } : { request: any, response: any}) => {
      var users = await GetAllUsers();
      response.body = { users: users }
      response.status = 200;
  }

  const update = async (
    { request, response } : { request: any, response: any}) => {
      const {value} = await request.body();
      let id : string = value.id;
      let name : string = value.name;
      let password : string = await hashSync(value.password);
      let email : string = value.email;
      let birthDate: Date = value.birthDate;
      let gender: string = value.gender;
      let description: string = value.description;
      let category: string = value.category;
      let subcategory: string = value.subcategory;
      let profilePic: File = value.profilePic;
      var user: User = {
        name,
        email,
        password,
        birthDate,
        gender,
        description,
        category,
        subcategory,
        profilePic,
      }
      await Update(user, id);
      response.body = { user: user, id: id }
      response.status = 200;
  }
  
  export { register, login, update, listUsersByCategory }
