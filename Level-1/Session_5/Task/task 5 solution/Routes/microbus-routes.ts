import { Router } from 'express'
import  {getAllMicroBuses , getMicroBusByID , createNewMicroBus 
         , deleteMicroBus , filterByMaxFare , getRates , updateMicrobus} 
         from '../controllers/microbus-controlllers'

import {validateMicrobus} from '../middlerwares/microbus-middleware'


export const router = Router();

router.get('/' , getAllMicroBuses);

router.get('/rate/:id' , getRates);

router.get('/filter' , filterByMaxFare);

router.get('/:id' , getMicroBusByID);

router.post('/' , validateMicrobus , createNewMicroBus);

router.put('/:id' , validateMicrobus , updateMicrobus);

router.delete('/:id' , deleteMicroBus);
