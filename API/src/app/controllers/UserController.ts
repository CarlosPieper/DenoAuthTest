import { User } from '../models/Users.ts';
import { Register, FindByEmail } from '../repositories/UserRepository.ts';
import { compareSync, hashSync } from "https://deno.land/x/bcrypt@v0.2.1/mod.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt@v0.9.0/create.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const key = config().SECRET;

const header: Jose = {
    alg: 'HS256',
    typ: 'JWT'
  };

const register = async ({request, response}: {request: any, response: any}) => {
    const {value} = await request.body();
    let name : string = value.name;
    let password : string = await hashSync(value.password);
    let gender : string = value.gender;
    let email : string = value.email;
    let birthDate : Date = value.birthDate;
    let description : string = value.description;
    var user: User = {
      name: name,
      password: password,
      gender: gender,
      email: email,
      birthDate: birthDate,
      description: description
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

const login = async ({request, response}: {request: any, response: any}) => {
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
      const payload :  Payload = {
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
  
  export { register, login }
