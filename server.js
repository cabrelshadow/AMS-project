const express = require("express")
const app = express()
const http = require("http")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { jwtAuth, localAuth } = require("./config/passport");
const expressHandlebars = require("express-handlebars");
const Handlebars = require("handlebars");
const {
	allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
app.engine(
	".hbs",
	expressHandlebars.engine({
		defaultLayout: "main",
		extname: ".hbs",
		handlebars: allowInsecurePrototypeAccess(Handlebars),
		helpers: {
			selected: function (option, value) {
				if (parseInt(option) === parseInt(value)) {
					return "selected";
				} else {
					return "";
				}
			},
			multiplyBy: function (valueOne, valueTwo) {
				return valueOne * valueTwo;
			},
			checkStatus: function (status) {},
			if_not: function (val1, val2, opts) {
				if (val1 !== val2) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			},
			addition: (val1, value2) => {
				return parseInt(val1) + parseInt(value2);
			},
			if_equal: function (val1, val2, opts) {
				if (val1 === val2) {
					return opts.fn(this);
				} else {
					return opts.inverse(this);
				}
			},
			formDate: function (val1) {
				return FormatDate(val1);
			},
			lessThan: function (val1, val2) {
				if (val2 <= val1) {
					return "background-color: #e74c3c; color: white; font-size: 20px; text-align: center";
				}
			},
		},
	}),
);
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");
app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: false,
		maxAge: new Date(Date.now() + 3600000),
		
	}),
);
app.use(passport.initialize());
app.use(passport.session());
jwtAuth(passport);
localAuth(passport);
// Connect flash
app.use((err, req, res, next) => {
	// Handle the error
	console.log(err);
	res.status(500).json({ error: "Internal Server Error" });
});

app.use(async function (req, res, next) {
	try {	
		res.locals.user = req.user || null;
		next();
	} catch (error) {
		next(error);
	}
});

http.createServer(app).listen(4500, () => {
    console.log(`server run on port 4500`)
})