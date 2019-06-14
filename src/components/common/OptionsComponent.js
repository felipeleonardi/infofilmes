import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as commonActions from '../../actions/common/actions'; 
import { browserHistory } from 'react-router';

//semantic
import { Button } from 'semantic-ui-react';

class OptionsComponent extends Component {

    constructor(props) {
        super(props);
        this.handleClickOption = this.handleClickOption.bind(this);
    }

    handleClickOption(label) {
        this.props.onClearSearch();
        this.props.setBackdropPath();
        this.props.hideMediaDetails();
        browserHistory.push(`/${label}`);
    }

    render() {
        const buttonsOptions = this.props.options.map((v, i) => 
            {
                return (
                    <Button 
                        active={ v.selected }
                        key={`option-${i}`}
                        inverted
                        onClick={ () => { this.handleClickOption(v.label) }}
                    >
                        { v.title }
                    </Button>)
            });
        return(
            <Button.Group
                size={'small'}
                compact={true}
                className="mt15"
            >
                { buttonsOptions }
            </Button.Group>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.options
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeOption: (label) => dispatch(commonActions.onChangeOption(label)),
        onClearSearch: () => dispatch(commonActions.getDefaultSearchObject()),
        setBackdropPath: () => dispatch(commonActions.setBackdropPath()),
        hideMediaDetails: () => dispatch(commonActions.hideMediaDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptionsComponent)