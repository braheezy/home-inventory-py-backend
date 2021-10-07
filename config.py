import os, datetime


class Config(object):
    '''
    Configuration of application
    '''
    TESTING = False

    # JWT, hopefully an easy way to do auth
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=3)
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

    MONGO_URI = os.environ.get('DATABASE_URL')


class ProductionConfig(Config):
    pass


class DevConfig(Config):
    DEBUG = True

    MONGO_URI = os.environ.get('DATABASE_URL') or \
        'mongodb://' + 'localhost:27017'


class TestConfig(Config):
    TESTING = True