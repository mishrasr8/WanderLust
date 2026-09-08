const User=require("../model/user.js");

//Render Signup

module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
};

//Signup

module.exports.signup=async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({username,email});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

//Render Login

module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

//Login

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl || "/"
    res.redirect(redirectUrl);
};

//Logout

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are succesfully logged out!");
        res.redirect("/");
    })
};