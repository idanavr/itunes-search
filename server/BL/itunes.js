const axios = require('axios');
const ItunesQueryModel = require('../models/db/userItunesQueries');
const itunesAdapters = require('../models/client/itunes');
const { itunesContentLimit } = global.config;

const self = {
    getItunesResults: (query, user) => {
        if (query === null || query === '')
            return [];
        return axios.get(`http://itunes.apple.com/search?term=${query}&limit=${itunesContentLimit}`)
            .then((res) => {
                if (!(res && res.data && res.data.results)) {
                    return [];
                }
                if (user) {
                    self.updateUserQueries(user.id, query);
                }
                const clientModelResponse = res.data.results.map((content) => itunesAdapters.createItunesResultModel(content));
                return clientModelResponse;
            });
    },

    getTop10Queries: (userId) =>
        ItunesQueryModel.findOne({ createdBy: userId })
            .exec()
            .then((itunesQuery) => {
                if (itunesQuery)
                    return itunesQuery.queries.slice(0, 10);
                return { err: 'User doesn\'t have queries' };
            }),

    updateUserQueries: (userId, query) =>
        ItunesQueryModel.findOne({ createdBy: userId })
            .exec()
            .then((itunesQuery) => {
                if (!query)
                    return itunesQuery;
                else if (!itunesQuery) {
                    const newItunesQuery = new ItunesQueryModel();
                    newItunesQuery.queries = [query];
                    newItunesQuery.createdBy = userId;
                    return newItunesQuery.save();
                }
                itunesQuery.queries = insertValueToListWithoutDuplications(itunesQuery.queries, query);
                // if (itunesQuery.queries.length > 10) { // in case limitation of 10 queries should be in db level
                //     newQueryList.splice(10);
                // }
                return itunesQuery.save();
            }),

};

function insertValueToListWithoutDuplications(list, value) {
    const filteredList = list.filter((v) => v && v !== value);
    return [value, ...filteredList];
}

module.exports = self;