# Background
HomeInventoryPy was a hobby project for educational purposes. 

It's a Flask backend (this project) hosting a REST API. Data is persisted with MongoDB. That isn't really interesting, so I wrote a [React frontend](https://github.com/mbraha/home-inventory-py-frontend) to interact with it. Years later, I came back to this project to see if I could host it on AWS, and of course, automate the whole freakin' thing.
That juicyness can be found [here](https://github.com/mbraha/home-inventory-py-env).

Tracking home inventory...it's a stupid idea. But it provided just enough meat to cause interesting design problems. You got Users with Rooms and Stuff in those Rooms that have probably have some Value.

# home-inventory-py-backend
`application.py` is the launch point of the Flask application.<br>
`config.py` is used to configure the Flask applcation.<br>
`resources.py` provides the REST API endpoints for callers to use. It uses `models.py` to interact with our data model (Users, Rooms, Stuff, etc.).<br>
`db.py` is the layer that interacts with the database, currently MongoDB. 

# Prerequisites

1. \*Nix-like environment. The scripts below are shell scripts.

2. Python 3

   To check, `python -V` in a terminal.

3. MongoDB

   Install it for your OS: [MongoDB Install Instructions](https://docs.mongodb.com/manual/installation/)

   MongoDB must be running at the same `MONGO_URI` used in `config.py` for the application to use the database.

# Install

In the root of the project, run the install script:

`./install.sh`

# Usage

Update `config.py` and `application.py` to use the correct configuration.

To run, simply:

`flask run`

Enjoy!