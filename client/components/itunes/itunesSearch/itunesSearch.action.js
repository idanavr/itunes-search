export const updateContentList = 'updateContentList';
export const updateTopQueryList = 'updateTopQueryList';
export const updateItunesSearchStatusMessage = 'updateItunesSearchStatusMessage';
import axios from 'axios';

export function getContentListAction(filter) {
    return (dispatch) => {
        if (!filter)
            return new Promise((resolve) => resolve());

        dispatch({ type: updateItunesSearchStatusMessage, msg: 'loading itunes results...' });
        return axios.get(`/api/itunes/${filter}`)
            .then((res) => dispatch({ type: updateContentList, contents: res.data }))
            .catch(() => dispatch({ type: updateItunesSearchStatusMessage, msg: 'search failed' }));
    };
}

export function getTopQueries() {
    return (dispatch) =>
        axios.get('/api/itunes')
            .then((res) => dispatch({ type: updateTopQueryList, queries: res.data }))
            .catch((err) => dispatch({ type: updateItunesSearchStatusMessage, msg: err.response.data }));
}

export function resetTopQueries() {
    return { type: updateTopQueryList, queries: [] };
}