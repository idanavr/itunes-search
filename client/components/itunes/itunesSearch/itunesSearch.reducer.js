import { updateContentList, updateTopQueryList, updateItunesSearchStatusMessage } from './itunesSearch.action';
const defaultState = { contents: [], topQueries: [], statusMessage: null };

export default function (state = defaultState, action) {
    switch (action.type) {
        case updateContentList:
            return { ...state, contents: action.contents, statusMessage: null };

        case updateTopQueryList:
            return { ...state, topQueries: action.queries, statusMessage: null };

        case updateItunesSearchStatusMessage:
            return { ...state, statusMessage: action.msg };

        default:
            return state;
    }
}