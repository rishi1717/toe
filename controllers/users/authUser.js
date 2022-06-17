import { OAuth2Client } from "google-auth-library"
import Users from "../../models/userModel.js"

const client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const authUser = async (req, res) => {
	const { token } = req.body
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	})
	const payload = ticket.getPayload()
	let user = await Users.findOne({ email: payload?.email })
	if (!user) {
		user = await new Users({
			email: payload?.email,
			name: payload?.name,
		})
		await user.save()
	}
	res.json({ user, token })
}

export default authUser