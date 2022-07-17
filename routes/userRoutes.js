import {Router} from 'express'
import register from '../controllers/users/register.js'
import login from '../controllers/users/login.js'
import userSearch from '../controllers/users/userSearch.js'
import getFriendList from '../controllers/users/getFriendList.js'
import getLeaderBoard from '../controllers/users/getLeaderBoard.js'
import getuserDetails from '../controllers/users/getuserDetails.js'

const router = Router()

router.post('/', register)

router.post("/login", login)

router.get('/', userSearch)

router.get('/:id', getuserDetails)

router.get('/friends/:id',getFriendList)

router.get('/leaderBoard',getLeaderBoard)

export default router