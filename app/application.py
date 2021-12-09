from flask import Flask, g
from flask_cors import CORS
from db import db
from config import ProductionConfig, DevConfig
from flask_jwt_extended import JWTManager
from flask_restful import Api
from marshmallow import Schema, fields
from bson import ObjectId
import logging

def create_app(config_class):

    app = Flask(__name__)
    app.config.from_object(config_class)

    # Extension stuff
    # Because we want JS, handles CORS.
    CORS(app, resources={r"/*": {"origins": "*"}})
    logging.getLogger('flask_cors').level = logging.DEBUG
    # JWT for auth.
    jwt = JWTManager(app)
    # REST API extension
    api = Api(app)

    import resources
    import models

    # from app.main import bp as main_bp
    app.register_blueprint(resources.bp)
    app.register_blueprint(models.bp)

    @jwt.token_in_blacklist_loader
    def check_if_token_in_blacklist(decrypted_token):
        jti = decrypted_token['jti']
        return models.BlacklistToken.is_jti_blacklisted(jti)

    @app.teardown_appcontext
    def teardown_db(self):
        db = g.pop('db', None)

        if db is not None:
            print('closing db')
            db.client.close()

    api.add_resource(resources.Register, '/register')
    api.add_resource(resources.Users, '/users')
    api.add_resource(resources.Login, '/login')
    api.add_resource(resources.LogoutAccess, '/logout/access')
    api.add_resource(resources.LogoutRefresh, '/logout/refresh')
    api.add_resource(resources.TokenRefresh, '/token/refresh')
    api.add_resource(resources.TestResource, '/test')

    api.add_resource(resources.Room, '/room')
    api.add_resource(resources.Stuff, '/stuff')

    return app


application = create_app(ProductionConfig)

if __name__ == "__main__":
    application.run()