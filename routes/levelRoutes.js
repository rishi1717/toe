import { Router } from "express"

const router = Router()

router.get('/',getLevels)

router.post("/", setlevel)

router.patch('/:id', updatelevel)

router.delete('/:id', deletelevel)