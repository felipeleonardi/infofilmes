import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/common/actions';

import CardComponent from './CardComponent';

class SearchContainer extends Component {

    componentDidMount() {
        this.onSearch();
        this.props.onChangeOption(this.props.params.option);
    }

    componentDidUpdate(nextProps, nextState) {
        if (this.props.params.query !== nextProps.params.query) {
            this.onSearch();
        }
    }

    onSearch() {
        this.props.onSearchValue(this.props.params.query, this.props.option);
    }

    render() {
        return (
            <CardComponent 
                media={ this.props.media } 
            /> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        media: state.media,
        option: state.option,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchValue: (value, option) => dispatch(actions.onSearchValue(value, option)),
        onChangeOption: (label) => dispatch(actions.onChangeOption(label)),
        onClearSearch: () => dispatch(actions.getDefaultSearchObject())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);