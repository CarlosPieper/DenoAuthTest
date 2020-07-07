import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const key = config().SECRET;

const authMiddleware = async({request, response}: {request: any, response:any}, next: any) => {
    const header = request.headers.authorization;
    if (!header)
        response.status = 401;
        response.body = { message: "No token provided" }

    const parts = header.split(" ");

    if (parts.length !== 2)
    response.status = 401;
    response.body = { message: "Invalid Token" }

    const jwt = parts[1];

    if((await validateJwt(jwt, key)).isValid) {
        await next();
        return;
    }
    else{
        response.status = 401;
        response.body = { message: "Invalid Token" }
    }
}

export default authMiddleware;