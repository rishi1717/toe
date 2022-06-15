import {Router} from 'express'
import register from '../controllers/users/register.js'

const router = Router()

router.post('/', register)

router.post("/login", (req, res) => {
	res.send("login")
})

router.get('/', (req, res) => {
    res.send('usersdetails') 
})

export default router