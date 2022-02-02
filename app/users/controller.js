const User = require('./model');
const bcrypt = require('bcryptjs');

module.exports = {
    viewSignIn: async(req , res) =>{
        try {
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");

            const alert = {message : alertMessage, status : alertStatus};
            if(req.session.user === null || req.session.user === undefined){
                 res.render('admin/users/view_signin',{
                alert
            });
            }else{
                res.redirect("/dashboard");
            }
           
           
           
        } catch (error) {
            console.log(error)
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/");
        }
    },
    actionSignin: async(req, res)=>{
        try {
            const { email, password} = req.body;
            const check = await User.findOne({ email: email});

            if(check){
                if(check.status === 'Y'){
                    const checkPassword = await bcrypt.compare(password, check.password);
                    if(checkPassword){
                        req.session.user = {
                            _id: check.id,
                            email: check.email,
                            status: check.status,
                            name: check.name
                        }
                        res.redirect("/dashboard");
                    }else{
                        req.flash("alertMessage", "Passowrd yang anda masukan salah");
                        req.flash("alertMessage", 'danger');
                        res.redirect("/");
                    }
                }else{
                    req.flash("alertMessage","Akun anda telah diblokir");
                    req.flash("alertMessage", 'danger');
                    res.redirect("/");
                }
            }else{
                req.flash("alertMessage","Email yang anda masukan salah");
                req.flash("alertMessage", 'danger');
                res.redirect("/");
            }
        } catch (error) {
            req.flash("alertMessage",`${error.message}`);
            req.flash("alertMessage", 'danger');
            res.redirect("/");
        }
    },
    actionLogout:(req, res) => {
        req.session.destroy();
        res.redirect('/');
    }
}