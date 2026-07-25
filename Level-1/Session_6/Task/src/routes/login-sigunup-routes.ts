
import { Router } from 'express'
import {signin, signout, signup , userWelcomePage , adminWelcomePage} from '../controllers/controllers.js';
import { validateToken , validateAdminOnly} from '../middlewares/auth-middleware.js';

export const router = Router();

router.post('/signup' , signup);
router.post('/signin' , signin);
router.get('/signout'  , signout);
router.get('/profile' , validateToken , userWelcomePage);
router.get('/admin-only' , validateToken , validateAdminOnly , adminWelcomePage);
