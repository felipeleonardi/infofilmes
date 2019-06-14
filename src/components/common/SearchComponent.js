import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Image, Grid, Icon, Loader } from 'semantic-ui-react';
import * as actions from '../../actions/common/actions';

import removeAccents from 'remove-accents';
import _ from 'underscore';

class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.handleSearchMedia = this.handleSearchMedia.bind(this);
        this.resultRenderer = this.resultRenderer.bind(this);
        this.onResultSelect = this.onResultSelect.bind(this);
        this.onClearSearch = this.onClearSearch.bind(this);
        this.callMedia = _.debounce(this.callMedia, 1500);
    }

    callMedia(value) {
        browserHistory.push(`/${this.props.option.label}/search/${value}`);
    }

    componentDidMount() {
        document.getElementById("search-input").focus();
    }

    onClearSearch() {
        this.props.onClearSearch();
    }

    handleSearchMedia(e) { 
        let value = e.target.value;
        e.persist();
        if (value.length !== 0) {
            this.callMedia(value);
        }
    }

    checkImage(image) {
        if (image !== null) {
            if (this.props.option.id === 'atores') {
                return <Image src={image} className="thumb-media" />;
            } else {
                return <Image src={image}  />;
            }
        } else {
            return '';
        }
    }

    onResultSelect(e, data) {
        let title = data.title;
        let titleUrl = title.replace(/ - /g, '-');
        titleUrl = titleUrl.replace(/ /g, '-');
        titleUrl = titleUrl.toLowerCase();
        titleUrl = removeAccents(titleUrl);
        browserHistory.push(`/${this.props.option.label}/${data.id}/${titleUrl}`);
        this.props.onResult(data.title);
    }

    resultRenderer(result) {
        let image = this.checkImage(result.image);
        return (
            <Grid>
                <Grid.Column width={12} textAlign={'left'}>
                    <span className="fs16 display-block">{ result.title }</span>
                    <span className="fs12">{ result.description }</span>
                </Grid.Column>
                <Grid.Column width={4}>
                    { image }
                </Grid.Column>
            </Grid>
        )
    }

    render() {
        const { isLoading } = this.props.searchObj;
        const iconLoader = (
            <Loader 
                active
                inline
                inverted
                size={'medium'}
                className="loader-icon"
            />
        );
        const iconSearch = (
            <Icon 
                name='search'
                size={'large'}
                link
                onClick={this.onClearSearch} 
                inverted
            />
        );
        let iconStatus;
        if (isLoading) {
            iconStatus = iconLoader;
        } else {
            iconStatus = iconSearch;
        }
        return(
            <div className="searchBox">
                { iconStatus }
                <input
                    type="text"
                    id="search-input"
                    placeholder={ this.props.option.placeholder }
                    onChange={ this.handleSearchMedia }
                />
                <Icon 
                    name='remove'
                    size={'large'}
                    link
                    onClick={this.onClearSearch} 
                    inverted
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        option: state.option,
        searchObj: state.searchObj,
        search: state.search,
        media: state.media
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchValue: (value, option) => dispatch(actions.onSearchValue(value, option)),
        onResult: (title) => dispatch(actions.onResult(title)),
        onClearSearch: () => dispatch(actions.getDefaultSearchObject())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);