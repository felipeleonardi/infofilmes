import React, { Component } from 'react';
import { Container, Grid, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';

//actions
import * as commonActions from '../actions/common/actions';

//components
import SearchComponent from './common/SearchComponent';
import OptionsComponent from './common/OptionsComponent';

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgLoaded: false
        }
    }

    componentWillMount() {
        this.props.getDefaultOptions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.backdrop_path !== this.props.backdrop_path) {
            $('#back-container').fadeIn(2500);
        }
    }

    handleLoadImage() {
        $(this.background).fadeIn(1500);
    }

    handleClickHome() {
        browserHistory.push('/');
    }

    render() {
        if(!this.state) return;
        return(
            <div id="app-container">
                <Container 
                    fluid
                    className="app-container appback"
                >
                    <img 
                        src={this.props.backdrop_path} 
                        id="back-container"
                        alt="poster"
                        style={{display: 'none'}}
                    />
                    <Grid 
                        centered 
                        className="pt40">
                        <Grid.Column
                            computer={5}
                            tablet={12}
                            mobile={16}
                        >
                            <SearchComponent />
                            <OptionsComponent />
                            <Grid 
                                centered
                                className="div-home"
                            >
                                <Icon
                                    name="home"
                                    size="big"
                                    className="bt-home pl5"
                                    onClick={ this.handleClickHome }
                                />
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    { this.props.children }
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { options, backdrop_path, statusMovie, statusSerie } = state;
    return {
        options,
        backdrop_path,
        statusMovie,
        statusSerie,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDefaultOptions: () => dispatch(commonActions.getDefaultOptions()),
        setBackdropPath: () => dispatch(commonActions.setBackdropPath())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)