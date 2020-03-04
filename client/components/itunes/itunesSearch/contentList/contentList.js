import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './contentList.scss';

function ContentList(props) {
    const { contents, contentOnClick } = props;
    
    let contentListBlock = '';
    if (contents && contents.length) {
        contentListBlock =
            <ul id="content-list">
                {contents.map((content) =>
                    <li key={uuidv4()} className="content" onClick={() => contentOnClick(content)}>
                        <div>
                            <span className="track-name">{content.trackName}</span> - <span className="artist-name">{content.artistName}</span>
                        </div>
                        <div>
                            <span className="collection-name">{content.collectionName}</span>
                        </div>
                    </li>)}
            </ul>;
    }
    return (
        <div>
            {contentListBlock}
        </div>
    );
}

ContentList.propTypes = {
    contents: PropTypes.arrayOf(PropTypes.object).isRequired,
    contentOnClick: PropTypes.func.isRequired
};

export default React.memo(ContentList);