import { Router } from "express"
import deleteLevel from "../controllers/levels/deleteLevel.js"
import getLevels from "../controllers/levels/getLevels.js"
import setLevel from "../controllers/levels/setLevel.js"
import updateLevel from "../controllers/levels/updateLevel.js"

const router = Router()

router.get('/',getLevels)

router.post("/", setLevel)

router.patch('/:id', updateLevel)

router.delete('/:id', deleteLevel)

export default router