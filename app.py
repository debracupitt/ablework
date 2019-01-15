import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd, search, create_dict

# Configure application
app = Flask(__name__)

# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///ablework.db")

@app.route("/", methods=["GET"])
@login_required
def index():
    """Home page - send to explore page if logged in already"""

    return redirect("/explore")

@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        email = request.form.get("email")
        password = request.form.get("password")

        # Ensure email and password was submitted
        if not email or not password:
            return apology("Must provide username and password", 400)

        # Query database for username
        user = db.execute("SELECT * FROM users WHERE email = :email", email=email)

        # Ensure username exists and password is correct
        if len(user) != 1 or not check_password_hash(user[0]["password"], password):
            return apology("Invalid username and/or password", 400)

        # Remember which user has logged in
        session["user_id"] = user[0]["userid"]

        # Redirect user to home page
        return redirect("/explore")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Create variables for all fields
        fname = request.form.get("fname")
        lname = request.form.get("lname")
        email = request.form.get("email")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        type = request.form.get("type")
        businessname = ""

        if request.form.get("bisname"):
            businessname = request.form.get("bisname")

        if type == "jobseeker":
            type = 1
        else:
            type = 2

        # Check all fields have content
        if not fname or not lname or not email or not password or not confirmation:
            return apology("Please fill out all the registration form fields", 400)

        # Query database for username too see if user already exists
        check = db.execute("SELECT * FROM users WHERE email = :email", email=email)

        if check is True:
            return apology("This user already exists, please login instead", 400)

        # Ensure password and confirmed password match
        if password != confirmation:
            return apology("Passwords do not match", 400)

        # Hash the user’s password
        pwd_hash = generate_password_hash(request.form.get("password"))

        # Insert the new user into users
        db.execute("INSERT INTO users (fname, lname, email, password, usertypeid, businessname) VALUES(:fname, :lname, :email, :password, :usertypeid, :businessname)", fname=fname, lname=lname, email=email, password=pwd_hash, usertypeid=type, businessname=businessname)

        # Query database for username again
        user = db.execute("SELECT * FROM users WHERE email = :email", email=email)

        # Remember which user has logged in
        session["user_id"] = user[0]["userid"]

        # Redirect user to home page
        return redirect("/explore")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("register.html")


@app.route("/explore", methods=["GET", "POST"])
@login_required
def explore():
    """Show home page"""
    user = session["user_id"]

    if request.method == "POST":

        opname = request.form.get("opname")
        opdescription = request.form.get("opdescription")
        opsector = request.form.get("opsector")
        link = request.form.get("link")
        closingdate = request.form.get("closingdate")
        hrsid = request.form.get("hours")
        disabilitieslist = [request.form.get("visibility"), request.form.get("hearing"), request.form.get("mobility")]

        def join(li, sep):
            string = ""
            for i in li:
                if i == None:
                    string = string
                else:
                    string += str(i) + str(sep)
            return string

        disabilities = join(disabilitieslist, ", ")

        if not opname or not opdescription or not opsector or not link or not closingdate or not hrsid or not disabilities:
            return apology("Please fill out all the form fields", 400)

        # Insert the new opportunity into opportunities
        db.execute("INSERT INTO opportunities (opname, opdescription, sectorid, link, closingdate, hrsid, disabilities, userid) VALUES(:opname, :opdescription, :sectorid, :link, :closingdate, :hrsid, :disabilities, :userid)", opname=opname, opdescription=opdescription, sectorid=opsector, link=link, closingdate=closingdate, hrsid=hrsid, disabilities=disabilities, userid=user)

        return redirect("/explore")

    else:

        # Create a dict of all job seekers
        users = db.execute("SELECT users.fname, users.lname, hours.hrs, sectors.sector FROM users JOIN sectors ON users.sectorid = sectors.sectorid JOIN hours ON users.hrsid = hours.hrsid WHERE users.usertypeid = 1")

        print(users)

        # Create a dict of all opportunities
        ops = db.execute("SELECT opportunities.opname, opportunities.opid, users.businessname, hours.hrs, sectors.icon FROM opportunities JOIN users ON opportunities.userid = users.userid JOIN hours ON opportunities.hrsid = hours.hrsid JOIN sectors ON opportunities.sectorid = sectors.sectorid")

        print(ops)

        return render_template("explore.html", ops=ops, users=users)


@app.route("/events", methods=["GET", "POST"])
@login_required
def events():
    """Show events page"""
    user = session["user_id"]

    if request.method == "POST":

        eventname = request.form.get("eventname")
        link = request.form.get("link")
        date = request.form.get("date")
        time = request.form.get("time")
        price = request.form.get("price")

        if not eventname or not link or not date or not time or not price:
            return apology("Please fill out all the form fields", 400)

        # Insert the new event into events
        db.execute("INSERT INTO events (eventname, link, date, time, price, userid) VALUES(:eventname, :link, :date, :time, :price, :userid)", eventname=eventname, link=link, date=date, time=time, price=price, userid=user)

        return redirect("/events")

    else:

        # Create a dict of all events
        events = db.execute("SELECT events.eventname, events.link, events.date, events.time, events.price FROM events")

        return render_template("events.html", events=events)


@app.route("/blog", methods=["GET", "POST"])
@login_required
def blog():
    """Show home page"""
    user = session["user_id"]

    if request.method == "POST":

        name = request.form.get("name")
        link = request.form.get("link")
        date = request.form.get("date")
        type = request.form.get("type")

        if not name or not link or not date or not type:
            return apology("Please fill out all the form fields", 400)

        # Insert the new event into events
        db.execute("INSERT INTO resources (name, link, date, typeid, userid) VALUES(:name, :link, :date, :type, :userid)", name=name, link=link, date=date, type=type, userid=user)

        return redirect("/blog")

    else:

        users = db.execute("SELECT users.fname, users.lname, hours.hrs, sectors.sector FROM users JOIN sectors ON users.sectorid = sectors.sectorid JOIN hours ON users.hrsid = hours.hrsid WHERE users.usertypeid = 1")

        # Create a dict of all events
        resources = db.execute("SELECT resources.name, resources.link, resources.date, resourcetype.type FROM resources JOIN resourcetype ON resources.typeid = resourcetype.typeid")

        return render_template("tips.html", resources=resources)


@app.route("/profile", methods=["GET", "POST"])
@login_required
def profile():
    """Show home page"""
    user = session["user_id"]

    usertype = db.execute("SELECT users.usertypeid FROM users WHERE users.userid = :userid", userid=user)

    type = usertype[0]["usertypeid"]

    if type == 1:

        if request.method == "POST":

            fname = request.form.get("fname")
            lname = request.form.get("lname")
            onesent = request.form.get("onesent")
            bio = request.form.get("bio")
            skills = request.form.get("skills")
            disabilities = request.form.get("disabilities")
            email = request.form.get("email")
            mobile = request.form.get("mobile")
            linkedin = request.form.get("linkedin")

            # if not fname or not link or not date or not type:
            #     return apology("Please fill out all the form fields", 400)

            # Insert the new event into events
            db.execute("UPDATE users SET fname = :fname, lname = :lname, onesent = :onesent, bio = :bio, skills = :skills, disabilities = :disabilities, email = :email, mobile = :mobile, linkedin = :linkedin WHERE userid = :userid", fname=fname, lname=lname, onesent=onesent, bio=bio, skills=skills, disabilities=disabilities, email=email, mobile=mobile, linkedin=linkedin, userid=user)

            return redirect("/profile")

        else:

            users = db.execute("SELECT users.fname, users.lname, users.email, users.mobile, users.linkedin, users.onesent, users.bio, users.skills, optype.name, hours.hrs, sectors.sector, users.disabilities FROM users JOIN optype ON users.optypeid = optype.optypeid JOIN sectors ON users.sectorid = sectors.sectorid JOIN hours ON users.hrsid = hours.hrsid WHERE users.userid = :userid", userid=user)

            user = users[0]

            fname = user["fname"]
            lname = user["lname"]
            onesent = user["onesent"]
            bio = user["bio"]
            skills = user["skills"]
            email = user["email"]
            mobile = user["mobile"]
            linkedin = user["linkedin"]
            disabilities = user["disabilities"]

            return render_template("jobs-profile.html", fname=fname, lname=lname, onesent=onesent, bio=bio, skills=skills, email=email, mobile=mobile, linkedin=linkedin, disabilities=disabilities)

    else:

        if request.method == "POST":

            fname = request.form.get("fname")
            lname = request.form.get("lname")
            onesent = request.form.get("onesent")
            bio = request.form.get("bio")
            disabilities = request.form.get("disabilities")
            businessname = request.form.get("businessname")
            email = request.form.get("email")
            mobile = request.form.get("mobile")
            website = request.form.get("website")

            # if not fname or not link or not date or not type:
            #     return apology("Please fill out all the form fields", 400)

            # Insert the new event into events
            db.execute("UPDATE users SET fname = :fname, lname = :lname, onesent = :onesent, bio = :bio, businessname = :businessname, disabilities = :disabilities, email = :email, mobile = :mobile, website = :website WHERE userid = :userid", fname=fname, lname=lname, onesent=onesent, bio=bio, businessname=businessname, disabilities=disabilities, email=email, mobile=mobile, website=website, userid=user)

            return redirect("/profile")

        else:

            users = db.execute("SELECT users.fname, users.lname, users.email, users.mobile, users.website, users.onesent, users.bio, optype.name, hours.hrs, sectors.sector, users.disabilities, users.businessname FROM users JOIN optype ON users.optypeid = optype.optypeid JOIN sectors ON users.sectorid = sectors.sectorid JOIN hours ON users.hrsid = hours.hrsid WHERE users.userid = :userid", userid=user)

            user = users[0]

            fname = user["fname"]
            lname = user["lname"]
            onesent = user["onesent"]
            bio = user["bio"]
            email = user["email"]
            mobile = user["mobile"]
            website = user["website"]
            disabilities = user["disabilities"]
            businessname = user["businessname"]

            return render_template("business-profile.html", fname=fname, lname=lname, businessname=businessname, onesent=onesent, bio=bio, email=email, mobile=mobile, website=website, disabilities=disabilities)


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/login")


@app.route("/account", methods=["GET", "POST"])
@login_required
def password():
    """Change password."""
    user = session["user_id"]
    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("currentpw"):
            return apology("must provide current password", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide new password", 400)

        # Ensure password is confirmed
        elif not request.form.get("confirmation"):
            return apology("must provide password confirmation", 400)

        # Ensure Current Password given is correct
        # Query database for username
        rows = db.execute("SELECT * FROM users WHERE id = :userid",
                          userid=user)

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(rows[0]["hash"], request.form.get("currentpw")):
            return apology("current password entered incorrect", 400)

        # Ensure password and confirmed password match
        elif request.form.get("password") != request.form.get("confirmation"):
            return apology("passwords do not match", 400)

        # Hash the user’s password
        pwd_hash = generate_password_hash(request.form.get("password"))
        db.execute("UPDATE users SET hash = :password WHERE id = :userid", password=pwd_hash, userid=user)

        # Show confirmation
        return render_template("passwordupdated.html")

    # User reached route via GET (as by clicking a link or via redirect): Display form to lookup stocks
    else:
        return render_template("account.html")


def errorhandler(e):
    """Handle error"""
    return apology(e.name, e.code)


# listen for errors
for code in default_exceptions:
    app.errorhandler(code)(errorhandler)
