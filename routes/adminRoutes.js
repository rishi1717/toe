import { Router } from "express"
import adminLogin from "../controllers/admin/adminLogin.js"
import createAdmin from "../controllers/admin/createAdmin.js"

const router = Router()

router.post("/", adminLogin)

router.post("/create", createAdmin)

export default router