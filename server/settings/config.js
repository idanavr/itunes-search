const envType = process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'test' ? 'test' : 'production';

const config = {
    production: {
        connStr: 'mongodb://anyvision:a123456@ds125680.mlab.com:25680/itunes-search',
        logPath: 'log/production',
    },
    test: {
        connStr: '',
        logPath: 'log/test',
    },
    common: {
        port: 3000,
        jwtKey: 'token',
        itunesContentLimit: 25,
    },
};

module.exports = Object.assign(config.common, config[envType]);