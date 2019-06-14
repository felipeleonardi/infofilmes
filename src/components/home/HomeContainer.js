import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as actions from '../../actions/home/actions';
import { onChangeOption } from '../../actions/common/actions';
import CardComponent from '../common/CardComponent';

const titles = {
    movies: 'Últimos filmes lançados',
    series: 'Séries populares',
    actors: 'Atores populares'
}

class HomeContainer extends Component {

    componentDidMount() {
        this.props.getMediaHome();
        this.props.onChangeOption();
    }

    render() {
        $('#back-container').css('display', 'none');
        return (
            <div className="mt10">
                <CardComponent
                    title={ titles.movies }
                    media={ this.props.lastMovies }
                    cardsLimit={ 8 }
                />
                <CardComponent
                    title={ titles.series }
                    media={ this.props.popularSeries }
                    cardsLimit={ 8 }
                />
                <CardComponent
                    title={ titles.actors }
                    media={ this.props.popularActors }
                    cardsLimit={ 8 }
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lastMovies: state.lastMovies,
        popularSeries: state.popularSeries,
        popularActors: state.popularActors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getMediaHome: () => dispatch(actions.getMediaHome()),
        onChangeOption: () => dispatch(onChangeOption()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);