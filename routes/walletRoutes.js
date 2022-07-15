import { Router } from "express"
import addMoney from "../controllers/wallet/addMoney"
import withdrawMoney from "../controllers/wallet/withdrawMoney"

const router = Router()

router.patch("/:id", addMoney)

router.patch("/:id", withdrawMoney)

export default router