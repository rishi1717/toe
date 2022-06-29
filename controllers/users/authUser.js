import { OAuth2Client } from "google-auth-library"
import Users from "../../models/userModel.js"

const client = new OAuth2Client({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
})

const authUser = async (req, res) => {
	try {
		const { token } = req.body
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		})
		const payload = ticket.getPayload()
		let userName = payload.given_name

		let user = await Users.findOne(
			{ email: payload?.email },
			{ createdAt: 0, updatedAt: 0, __v: 0 }
		)
		if (!user) {
			async function getUserName(userName) {
				const userExists = await Users.exists({ userName: userName })
				if (userExists) {
					function getRandomInt(max) {
						return Math.floor(Math.random() * Math.floor(max))
					}
					userName = userName + getRandomInt(9999)
					getUserName(userName)
				}
				return userName
			}
			userName = await getUserName(userName)
			user = await new Users({
				email: payload.email,
				fullName: payload.name,
				userName: userName,
			})
			await user.save()
			const token = user.generateToken(user)
			user.password = undefined
			user = { ...user._doc, token }
			res.send({ message: "user created", user })
		} else {
			const token = user.generateToken(user)
			user.password = undefined
			user = { ...user._doc, token }
			res.send({ user, message: "user authorized" })
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err.message)
	}
}

export default authUser
