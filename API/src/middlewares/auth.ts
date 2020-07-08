import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const key = config().SECRET ?? 'ebcf221a85be7f9f3866c9925286e6be';

const authMiddleware = async({request, response}: {request: any, response:any}, next: any) => {

    const authorization = request.headers.get("authorization");
    if (!authorization)
        response.status = 405;
        response.body = { message: "No token provided" }

    const parts = authorization.split(" ");

    if (parts.length != 2)
    {
        response.body = { message: "Invalid Token" }
        response.status = 405;
    }

    const jwt = parts[1];

    if((await validateJwt(jwt, key)).isValid) {
        await next();
        return;
    }
    else{
        response.status = 405;
        response.body = { message: "Invalid Token" }
    }
}

export default authMiddleware;