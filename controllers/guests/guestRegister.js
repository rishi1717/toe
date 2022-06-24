import Guest from "../../models/guestModel.js"

const guestRegister = async (req, res) => {
	try {
		async function getGuestId(guestId) {
			const guestExists = await Guest.exists({ guestId: guestId })
			if (guestExists) {
				function getRandomInt(max) {
					return Math.floor(Math.random() * Math.floor(max))
				}
				guestId = guestId + getRandomInt(999999)
				getGuestId(guestId)
			}
			return guestId
		}
        const guestId = await getGuestId('guest')
        console.log(guestId, req.body)
        const guest = await new Guest({
            guestId: guestId,
        }).save()
        res.status(201).send({guest, message:"Guest created successfully"})
	} catch (err) {
		res.status(500).send(err.message)
	}
}

export default guestRegister
