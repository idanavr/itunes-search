module.exports = {
    createItunesResultModel: (itunesResult) => {
        const clientModel = {
            trackName: itunesResult.trackName,
            artistName: itunesResult.artistName,
            collectionName: itunesResult.collectionName,
            primaryGenreName: itunesResult.primaryGenreName,
            trackPrice: itunesResult.trackPrice,
            trackId: itunesResult.trackId,
            collectionPrice: itunesResult.collectionPrice,
            currency: itunesResult.currency,
            previewUrl: itunesResult.previewUrl,
            kind: itunesResult.kind,
        };
        return clientModel;
    },
};