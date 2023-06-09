import watchtower, logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.addHandler(watchtower.CloudWatchLogHandler())
logger.info("Hi")
logger.info(dict(foo="bar", details={}))