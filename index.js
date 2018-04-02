const Client = require('pg').Client;

function PingService() {}

exports = module.exports = PingService;

PingService.prototype.ping = function(service, callback) {
    var startTime = +new Date();
    const client = new Client({
        connectionString: service.url
    });
    client.connect(err => {
        if (err) {
            callback(err.toString(), '', '', +new Date() - startTime);
            return;
        }
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                callback(err.toString(), '', res, +new Date() - startTime);
            } else {
                callback(null, '', res, +new Date() - startTime);
            }
            client.end();
        });
    });
};

PingService.prototype.getDefaultOptions = function() {
    return {}; // there is not need for UI confi options for this ping service
};
