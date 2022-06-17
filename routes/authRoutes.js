import {Router} from 'express'
import authUser from '../controllers/users/authUser.js'

const router = Router()

router.post('/', authUser)

export default router