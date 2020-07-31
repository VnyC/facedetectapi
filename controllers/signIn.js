const handleSignIn = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	db.select('email', 'hash').from('login').where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid) {
			return db.select('*').from('users').where('email', '=', email)
			.then(user => {
				res.json(user[0])
			})
			.catch(err => res.json('user not found, register!'))
		}
	})
	.catch(err => res.json('please enter right details'))
}

module.exports = {
	handleSignIn: handleSignIn
}