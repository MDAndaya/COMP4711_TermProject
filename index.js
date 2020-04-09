let express = require('express')
let app = express();
let path = require('path');
let discModel = require('./models/discData');

// Body parser
let bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware
// parse application/json
app.use(bodyParser.json()) // middleware

// Routing
let loginRoutes = require('./routes/login-routes');
let discussionsRoutes = require('./routes/discussions-routes');
let msgRoutes = require('./routes/msg-routes');
let homepageRoutes = require('./routes/homepage-routes');
let profileRoutes = require('./routes/profile-routes');
// TODO: Add routes here like this
// let artistRoutes = require('./routes/artists');
// let loginRoutes = require('./routes/login');
// app.use(loginRoutes);
app.use('/msg', msgRoutes);
app.use(
  homepageRoutes, 
  profileRoutes
);
// app.use(loginRoute);
//app.use(discussionsRoute);

// Database
let db = require('./util/database');

const session = require('express-session');
app.use(session({
  secret: 'secret token',
  resave: true,
  saveUninitialized: true,
}));

// Handlebars for view
const expressHbs = require('express-handlebars');
app.engine(
  'hbs',
  expressHbs({
    layoutsDir: 'views/layouts/',
    defaultLayout: 'main-layout',
    extname: 'hbs'
  })
);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));

// Default path
app.get('/', function (req, res) {
// TODO: USE EXPRESS SESSION HERE TO SAVE SESSION LIKE THIS
//   let user = req.session.user;
//   // user = null;
//   console.log('index' + user);
//   if (!user) {
//     return res.render('login');
//   }
//   res.redirect(301, '/artists');

//TODO: get user id and pass it

  // let discussions = discModel.getAllDiscussions(userid);
    // this should be implemented in homepage controller render 
    // res.render('homepage', { homepageCSS: true, discussionsCSS: true, discussions: data.rows });

    //res.redirect('/homepage');
    //res.render('homepage', { homepageCSS: true });
    res.render('login', { loginCSS: true });
});

// app.post('/register', (req,res) => {

//   //alert("test");
//   console.log("does it go here or ?");

//   // // // lets assume that our app has 2 users
//   // // let users = ['user1','user2'];
//   // let username = req.body.username;
//   // let password = req.body.password;
//   // // You will likely need to connect to connect to DB
//   // // Check if username/password is valid
//   // if(users.includes(username) && password=='password') {
//   //   req.session.username = username;  // now on every request, username is made available
//   //   req.session.cookie.maxAge = 60000; // set the expiry of session, in milliseconds = 1 min
//   //   res.redirect('/peoples');
//   // } else {
//   //   res.redirect('/');
//   // }
// });

app.listen(process.env.PORT || 4000, () => console.log('Server ready on environment variable port or 4000'))
