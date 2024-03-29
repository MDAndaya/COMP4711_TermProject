
const profileModel = require('../models/profile');
const discModel = require('../models/discData');
// exports.getAllPeople = (req,res,next) => {
//    let Peoples = peopleModel.getall();
//    let name = req.session.username;
//    Peoples.then( ([rows, fieldData]) => {
//         res.render('peoples', { people: rows, 
//                                 username: name,  
//                                 peoplesCSS: true });
//    });
// };

//from POST /register.  Create user, login, set session id
exports.register = (req, res) => {
    const user = req.body;


    if (req.body.password === req.body.confirm_pass) {
        profileModel.createUser(user).then((data) => {
            profileModel.login(user).then((data) => {
                if (data.rows[0] && data.rows[0].id && data.rows[0].firstname && data.rows[0].lastname) {
                    req.session.userID = data.rows[0].id;
                    req.session.firstname = data.rows[0].firstname;
                    req.session.lastName = data.rows[0].lastname;
                    //added for getting number of total discussion for this user for the pagination.



                    res.redirect('/homepage');
                } else {
                    req.session.destroy();
                    console.log("ERROR");
                    res.redirect('/');
                }
            })
                .catch((err) => {
                    console.log(err)
                })
        })
            .catch((err) => {
                console.log(err)
            })
    }
}

//from POST /register.  Create user, login, set session id
exports.login = (req, res, next) => {
    profileModel.login(req.body).then((data) => {
        if (data.rows[0] && data.rows[0].id && data.rows[0].firstname && data.rows[0].lastname) {
            req.session.userID = data.rows[0].id;
            req.session.firstname = data.rows[0].firstname;
            req.session.lastName = data.rows[0].lastname;



            res.redirect('/homepage');
        } else {
            req.session.destroy();
            console.log("ERROR");
            res.redirect('/');
        }
    })
        .catch((err) => {
            console.log(err)
        })
}

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return console.log(err);
    });
    req.session = null;
    res.redirect(301, '/');
}
