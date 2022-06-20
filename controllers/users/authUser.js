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

		let user = await Users.findOne({ email: payload?.email })
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
			console.log(userName)
			user = await new Users({
				email: payload.email,
				fullName: payload.name,
				userName: userName,
			})
			await user.save()
			res.send({message:"user created", user})
		}
		res.send({ user, token, message: "user authorized" })
	} catch (err) {
		console.log(err.message)
	}
}

export default authUser
