import {Router} from 'express'
import register from '../controllers/users/register.js'
import login from '../controllers/users/login.js'

const router = Router()

router.post('/', register)

router.post("/login", login)

router.get('/', (req, res) => {
    res.send('usersdetails') 
})

export default router