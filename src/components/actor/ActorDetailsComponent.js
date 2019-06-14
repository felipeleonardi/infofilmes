import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';
import ActorDescriptionComponent from './ActorDescriptionComponent';
import InfoBoxComponent from '../common/InfoBoxComponent';
import TitleComponent from '../common/TitleComponent';
import TaglineComponent from '../common/TaglineComponent';
import PhotosBoxComponent from '../common/PhotosBoxComponent';
import ModalListComponent from '../common/ModalListComponent';

import {Carousel} from 'react-responsive-carousel';
// general styles
import 'react-responsive-carousel/lib/styles/main.css';

// carousel styles
import 'react-responsive-carousel/lib/styles/carousel.css';

export default class ActorDetailsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
            backgroundOpacity: 1,
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.mountActorInfo = this.mountActorInfo.bind(this);
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

    mountActorInfo(info, title) {
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
        let actorView = <div></div>;
        if (this.props.actor) {
            if (this.props.actor.valid === 'true') {
                const { 
                    images, 
                    name, 
                    tagline, 
                    description, 
                    biography, 
                    popularMovies, 
                    gender,
                    movieCredits, 
                    tvCredits
                } = this.props.actor;
                let actorDescription;
                if (description !== '' && biography !== '') {
                    actorDescription = (
                        <ActorDescriptionComponent 
                            handleOpenModal={ this.handleOpenModal }
                            handleCloseModal={ this.handleCloseModal }
                            modalOpen={ this.state.modalOpen }
                            overview={ biography }
                            description={ description }
                        />
                    )
                }
                const sliderImages = images.map((image, index) => (
                    <div key={`img-${index}`}>
                        <Image 
                            src={image.file_path} 
                            key={`poster-${index}`}
                        />
                    </div>
                ));
                actorView = (
                    <Grid 
                        centered 
                        columns={1}
                        className="mt35">
                        <Grid.Column 
                            style={ styles.actorDetails }
                            width={10}>
                            <Grid 
                                textAlign={'left'} 
                                className="text-white"
                                style={{opacity: this.state.backgroundOpacity}}>
                                <Grid.Column
                                    width={6}
                                    style={ styles.zeroMarginPadding }
                                >
                                    <Carousel
                                        showThumbs={false}
                                        showStatus={false}
                                        infiniteLoop={true}
                                        width={'400px'}
                                    >
                                        { sliderImages }
                                    </Carousel>
                                </Grid.Column>
                                <Grid.Column 
                                    width={10}
                                    className="pad25">
                                    <TitleComponent 
                                        size={'h1'}
                                        textAlign={'left'}
                                        title={ name }
                                    />
                                    <TaglineComponent
                                        size={'h4'}
                                        textAlign={'left'}
                                        tagline={ tagline }
                                    />
                                    <Grid style={{
                                        height: '72px', 
                                        marginTop: '2px',
                                        marginBottom: '2px'
                                    }}>
                                        { actorDescription }
                                    </Grid>
                                    <Grid columns={1}>
                                        <Grid.Column 
                                            width={16}
                                            className="pad25">
                                            <PhotosBoxComponent 
                                                photos={ popularMovies }
                                                gender={ gender }
                                            />
                                        </Grid.Column>
                                    </Grid>
                                    <Grid className="mt0">
                                        <Grid.Column className="pt4 pb1">
                                            <ModalListComponent 
                                                movies={ movieCredits }
                                                tvs={ tvCredits }
                                            />
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                    
                )
            } 
            else if (this.props.actor.valid === 'false') {
                actorView = <h3 style={ styles.errorMsg }>Por enquanto não há dados suficiente sobre este ator ou atriz.</h3>;
            }
            else if (this.props.actor.valid === 'invalido') {
                actorView = <h3 style={ styles.errorMsg }>O ator ou atriz que você está procurando não foi encontrado(a), ou a URL é inválida.</h3>;
            }
        } 
        return actorView;
    }
}

const styles = {
    actorDetails: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    actorTagline: {
        color: '#00FC87',
        fontSize: '21px',
        fontFamily: 'Oswald, serif',
        fontWeight: '300'
    },
    actorDescription: {
        fontFamily: 'serif',
        fontSize: '17px',
    },
    errorMsg: {
        color: 'white'
    },
    zeroMarginPadding: {
        margin: 0,
        padding: 0
    }
}