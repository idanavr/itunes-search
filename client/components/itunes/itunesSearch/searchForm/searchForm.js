import React, { useState, useRef } from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Autocomplete from 'react-autocomplete';
import './searchForm.scss';


function SearchForm(props) {
    const { queries, isRegistered, searchOnClick, topQueriesOnClick, topQueriesOnBlur } = props;
    const [inputValue, setInputValue] = useState('');
    const searchInput = useRef(null);

    const topQueriesBtn = isRegistered ?
        <div>
            <input type="button" value="Top 10 Queries"
                onBlur={topQueriesOnBlur}
                onClick={topQueriesOnClick} />
        </div>
        :
        '';

    return (
        <div id="search-form">
            <Autocomplete
                items={queries}
                ref={searchInput}
                inputProps={{ className: 'search-input' }}
                menuStyle={{
                    position: 'absolute',
                    fontSize: '90%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px 0 rgba(32,33,36,0.28)',
                    overflow: 'auto',
                }}
                open={true}
                getItemValue={(item) => item}
                renderItem={(item, highlighted) =>
                    <div key={uuidv4()}
                        className={`ddl ${highlighted
                            ? 'ddl-activeRow'
                            : 'ddl-row'}`}>
                        {item}
                    </div>
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onSelect={(value) => searchOnClick(value)}
            />
            <input type="button" value="Search" onClick={() => searchOnClick(searchInput.current.props.value)} />
            {topQueriesBtn}
        </div>
    );
}

SearchForm.propTypes = {
    queries: PropTypes.arrayOf(PropTypes.string),
    isRegistered: PropTypes.bool.isRequired,
    searchOnClick: PropTypes.func.isRequired,
    topQueriesOnClick: PropTypes.func.isRequired,
    topQueriesOnBlur: PropTypes.func.isRequired,
};

export default SearchForm;