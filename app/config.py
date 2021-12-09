import os, datetime


class Config(object):
    '''
    Configuration of application
    '''
    TESTING = False
    DEBUG = True

    # JWT, hopefully an easy way to do auth
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=3)
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']


class ProductionConfig(Config):
    MONGO_USERNAME = os.environ.get('MONGO_USERNAME')
    MONGO_PASSWORD = os.environ.get('MONGO_PASSWORD')
    MONGO_URI = f"mongodb+srv://{MONGO_USERNAME}:{MONGO_PASSWORD}@{os.environ.get('MONGO_CONNECTION_STRING')}/myFirstDatabase?retryWrites=true&w=majority"


class DevConfig(Config):
    DEBUG = True

    MONGO_URI = 'mongodb://localhost:27017'


class TestConfig(Config):
    TESTING = True