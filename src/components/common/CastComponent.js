import React, { Component } from 'react';
import { Grid, Image, List, Loader, Dimmer, DimmerDimmable } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as castActions from '../../actions/common/actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory } from 'react-router';

class CastComponent extends Component { 

    constructor(props) { 
        super(props);
        this.renderCastList = this.renderCastList.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClickActor = this.handleClickActor.bind(this);
        this.state = {
            page: 1,
            perPage: 10
        }
    }

    componentWillMount() {
        this.props.getMoreCast(this.props.cast, this.state.page, this.state.perPage);
        let page = this.state.page + 1;
        this.setState({ page });
    }

    handleScroll() {
        const list = document.getElementById('cast-list');
        const { offsetHeight, scrollHeight, scrollTop } = list;
        if (scrollHeight <= scrollTop + offsetHeight) {
            let page = this.state.page + 1;
            this.setState({ page });
            this.props.getMoreCast(this.props.cast, this.state.page, this.state.perPage);
        }
    }

    handleClickActor(actor) {
        browserHistory.push(`/actor/${actor.id}/${actor.slug}`);
    }

    renderCastList() {
        return this.props.newCast.map((value, index) => {
            return (
                <List.Item key={`cast-${index}`}>
                    <List.Content>
                        <Grid
                            columns={ 2 }
                        >
                            <Grid.Column
                                className="pr0"
                                width={ 3 }
                            >
                                <ReactCSSTransitionGroup
                                    transitionName="example"
                                    transitionAppear={ true }
                                    transitionAppearTimeout={ 2000 }
                                    transitionEnterTimeout={ 2000 }
                                    transitionLeaveTimeout={ 2000 }
                                >
                                    <Image 
                                        className="iconCast pointer"  
                                        bordered={false}  
                                        style={{backgroundImage: `url(${value.profile_path})`}}
                                        onClick={ () => this.handleClickActor(value) }
                                    />
                                </ReactCSSTransitionGroup>
                            </Grid.Column>
                            <Grid.Column
                                className="pl1"
                                width={ 13 }
                            >
                                <List.Header 
                                    style={{color: '#00FC87'}}
                                    className="pointer"
                                    onClick={ () => this.handleClickActor(value) }
                                >
                                    { value.name }
                                </List.Header>
                                { value.character }
                            </Grid.Column>
                        </Grid>
                    </List.Content>
                </List.Item>
            )}
        )
    }

    render() {
        const castList = this.renderCastList();
        const loader = this.props.load ? <Loader active inline='centered' size='big' inverted className="loader-cast" /> : null;
        let title;
        if (!this.props.hideTitle) {
            title = <span className="fs14 display-block" style={ styles.movieSubTitle }>Elenco</span>
        }
        return(
            <Grid.Column>
                { title }
                <DimmerDimmable
                    dimmed={ this.props.load }
                >
                    <Dimmer active={ this.props.load } />
                    <List 
                        className="itemCast"
                        size={'large'}
                        style={ styles.castScroll }
                        celled
                        id="cast-list"
                        onScroll={ this.handleScroll }
                    >
                        { castList }
                        { loader }
                    </List>
                </DimmerDimmable>
            </Grid.Column>
        )
    }
}

const styles = {
    movieSubTitle: {
        fontSize: '17px',
        fontFamily: 'Oswald, serif',
    },
    castScroll: {
        height: '200px',
        overflow: 'scroll',
        overflowX: 'hidden',
    },
}

const mapStateToProps = (state) => {
    return {
        newCast: state.cast,
        load: state.castLoad
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMoreCast: (cast, page, perPage) => dispatch(castActions.getMoreCast(cast, page, perPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CastComponent);