import React from 'react';
import { PropTypes } from 'prop-types';
import './itunesContentProfile.scss';

function ItunesContentProfile({ history }) {
    if (!(history && history.location && history.location.state && history.location.state.content)) {
        history.replace('/');
        return null;
    }
    const { content } = history.location.state;

    const previewContent = (content.kind && content.kind.match('/(.*video.*)|(.*movie.*)'))
        ? (<video controls>
            <source src={content.previewUrl} type="video/mp4" />
            Your browser does not support this type of video.
        </video>)
        :
        (<audio controls>
            <source src={content.previewUrl} type="audio/mp3" />
            Your browser does not support this type of audio.
        </audio>);


    return (
        <div id="itunes-content-profile" className="animated fadeIn">
            <h3>
                <span className="track-name">{content.trackName}</span> - <span className="artist-name">{content.artistName}</span>
            </h3>
            <div>
                <span className="collection-name">{content.collectionName}</span>
            </div>
            <div>
                Only for: {content.trackPrice} {content.currency}
            </div>
            <div className="preview">
                {previewContent}
            </div>
        </div>
    );
}

ItunesContentProfile.propTypes = {
    history: PropTypes.shape({
        location: PropTypes.shape({
            state: PropTypes.shape({
                content: PropTypes.object.isRequired,
            }),
        }),
        replace: PropTypes.func.isRequired,
    }),
};

export default ItunesContentProfile;