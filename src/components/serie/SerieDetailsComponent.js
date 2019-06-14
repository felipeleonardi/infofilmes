import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { urlImageThumb } from '../../enviroments';
import SerieDescriptionComponent from './SerieDescriptionComponent';
import CastComponent from '../common/CastComponent';
import InfoBoxComponent from '../common/InfoBoxComponent';
import TitleComponent from '../common/TitleComponent';
import PosterImageComponent from '../common/PosterImageComponent';

export default class SerieDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            backgroundOpacity: 1,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.mountSerieInfo = this.mountSerieInfo.bind(this);
    }

    handleOpenModal(e) { 
        this.setState({
            modalOpen: true,
            backgroundOpacity: 0.5
        })
    }

    handleCloseModal(e) {
        this.setState({
            modalOpen: false,
            backgroundOpacity: 1
        })
    }

    mountSerieInfo(info, title) {
        if (info !== '') {
            return (
                <InfoBoxComponent
                    title={ title }
                    info={ info }
                />
            )
        }
        return null;
    }

    render() {
        let serieView = <div></div>;
        if (this.props.serie) {
            if (this.props.serie.valid === 'true') {
                const { poster_path, original_name, overview, first_air_date, number_of_seasons, number_of_episodes, credits, episode_run_time, status, description } = this.props.serie;
                let firstAirDate = this.mountSerieInfo(first_air_date, 'Lançamento');
                let numberOfSeasons = this.mountSerieInfo(number_of_seasons, 'Total de temporadas');
                let numberOfEpisodes = this.mountSerieInfo(number_of_episodes, 'Total de episódios');
                let episodeRunTime = this.mountSerieInfo(episode_run_time, 'Duração do episódio (média)');
                let statusSerie = this.mountSerieInfo(status, 'Situação');
                let imageUrl = `${urlImageThumb}${poster_path}`;
                serieView = (
                    <Grid 
                        centered 
                        columns={1}
                        className="mt35">
                        <Grid.Column 
                            style={ styles.serieDetails }
                            width={'9'}>
                            <Grid 
                                textAlign={'left'} 
                                className="text-white"
                                style={{opacity: this.state.backgroundOpacity}}>
                                <PosterImageComponent
                                    width={6}
                                    url={ imageUrl }
                                />
                                <Grid.Column 
                                    width={10}
                                    className="pad25">
                                    <TitleComponent
                                        size={'h1'}
                                        textAlign={'left'}
                                        title={ original_name }
                                    />
                                    <SerieDescriptionComponent 
                                        handleOpenModal={ this.handleOpenModal }
                                        handleCloseModal={ this.handleCloseModal }
                                        modalOpen={ this.state.modalOpen }
                                        overview={ overview }
                                        description={ description }
                                    />
                                    <Grid columns={2}>
                                        <Grid.Column width={7}>
                                            { firstAirDate }
                                            { numberOfSeasons }
                                            { numberOfEpisodes }
                                            { episodeRunTime }
                                        </Grid.Column>
                                        <Grid.Column width={9}>
                                            { statusSerie }
                                            <CastComponent 
                                                cast={ credits.cast }
                                                hideTitle={ true }
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    
                )
            } 
            else if (this.props.serie.valid === 'false') {
                serieView = <h3 style={ styles.errorMsg }>Por enquanto não há dados suficiente sobre esta serie.</h3>;
            }
            else if (this.props.serie.valid === 'invalido') {
                serieView = <h3 style={ styles.errorMsg }>A serie que você está procurando não foi encontrada, ou a URL é inválida.</h3>;
            }
        } 
        return serieView;
    }
}

const styles = {
    serieDetails: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    serieTagline: {
        color: '#00FC87',
        fontSize: '21px',
        fontFamily: 'Oswald, serif',
        fontWeight: '300'
    },
    serieDescription: {
        fontFamily: 'serif',
        fontSize: '17px',
    },
    errorMsg: {
        color: 'white'
    }
}