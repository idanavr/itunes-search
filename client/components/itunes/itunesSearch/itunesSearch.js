import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { getContentListAction, getTopQueries, resetTopQueries } from './itunesSearch.action';
import './itunesSearch.scss';
import SearchForm from './searchForm/searchForm';
import ContentList from './contentList/contentList';

function ItunesSearch({ history }) {
    const props = useSelector((state) => state.itunesSearchReducer);
    const user = useSelector((state) => state.loginReducer.user);    
    const dispatch = useDispatch();

    const { contents, topQueries, statusMessage } = props;
    const isRegistered = Boolean(user);
    const contentBlock = statusMessage !== null ? getMessageBlock(statusMessage) : getContentListBlock();

    return (
        <div id="itunes-search">
            <h2>iTunes Search</h2>
            <SearchForm
                queries={topQueries}
                isRegistered={isRegistered}
                searchOnClick={(query) => searchOnClick(query)}
                topQueriesOnClick={() => dispatch(getTopQueries())}
                topQueriesOnBlur={() => setTimeout(() => dispatch(resetTopQueries()), 200)}
            />
            <div>
                {contentBlock}
            </div>
        </div>
    );

    function getMessageBlock(message) {
        return (
            <div>
                {message}
            </div>
        );
    }

    function getContentListBlock() {
        return (
            <div>
                <ContentList
                    contents={contents}
                    contentOnClick={contentOnClick}
                />
            </div>
        );
    }

    function searchOnClick(query) {
        dispatch(getContentListAction(query));
        dispatch(resetTopQueries());
    }

    function contentOnClick(content) {
        history.push(`/itunes/content/${content.trackId}`, {
            content
        });
    }
}

ItunesSearch.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.object),
    topQueries: PropTypes.arrayOf(PropTypes.string),
    statusMessage: PropTypes.string,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }),
};

export default ItunesSearch;