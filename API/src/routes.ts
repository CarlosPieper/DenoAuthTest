import { Router } from "https://deno.land/x/oak/mod.ts";
import { register, login, update, listUsersByCategory } from './app/controllers/UserController.ts';
import  authMiddleware  from './middlewares/auth.ts'

const router = new Router();
router.post('/users/register', register);
router.post('/users/login', login);
router.post('/users/update', authMiddleware, update);
router.get('/users/listUsersByCategory', authMiddleware, listUsersByCategory);
export default router;