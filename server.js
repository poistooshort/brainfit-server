const express = require('express');
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const knex = require('knex')(require('./knexfile.js').development);
const app = express();
const PORT = process.env.PORT || 5050;

const authRoutes = require('./routes/auth');
const exercisesRoutes = require('./routes/exercises');

require('dotenv').config();

app.use(express.json());
app.use(helmet());

app.use(express.static('public'));

app.use(
	cors({
		origin: true,
		credentials: true
	})
);

app.use(fileUpload());

app.use(
	expressSession({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL
		},
		(_accessToken, _refreshToken, profile, done) => {
			knex('users')
				.select('id')
				.where({ github_id: profile.id })
				.then(user => {
					if(user.length) {
						done(null, user[0]);
					}
					else {
						knex('users')
							.insert({
								github_id: profile.id,
								avatar_url: profile._json.avatar_url,
								username: profile.username
							})
							.then(userId => {
								done(null, { id: userId[0] });
							})
							.catch(err => {
								console.log('Error creating user', err);
							});
					}
				})
				.catch(err => {
					console.log('Error fetching a user', err);
				});
		})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	knex('users')
		.where({ id: userId })
		.then(user => {
			done(null, user[0]);
		})
		.catch(err => {
			console.log('Error finding user', err);
		});
});

app.use('/auth', authRoutes);

app.use('/exercises', exercisesRoutes);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}. 🚀`);
});
