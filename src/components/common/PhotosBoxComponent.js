import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Grid } from 'semantic-ui-react';
import * as env from '../../enviroments';

export default class PhotosBoxComponent extends Component {

    handleClickActorMovie(slug, id) {
        browserHistory.push(`/movie/${id}/${slug}`);
    }

    render() {
        const listPhotos = this.props.photos.map((photo, index) => {
            if (photo.imageUrl) {
                return (
                    <Grid.Column 
                        key={ `photo-${index}` }
                        className='pl4 pr4'
                        textAlign='center'
                    >
                        <Grid columns={1}>
                            <Grid.Row className="pb1">
                                <Grid.Column>
                                    <img
                                        src={ `${env.urlImageThumb}${photo.imageUrl}` }
                                        alt={ photo.original_title }
                                        className="photobox-img"
                                        onClick={ () => this.handleClickActorMovie(photo.slug, photo.id) }
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row className="pt1">
                                <Grid.Column>
                                    <a 
                                        className="photo-title"
                                        title={ photo.original_title }
                                        onClick={ () => this.handleClickActorMovie(photo.slug, photo.id) }
                                    >{ photo.title }</a>
                                    <p className="photo-subtitle">{ photo.subtitle }</p>
                                    <p className="photo-subtitle">{ photo.content }</p>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                )
            } return null;
        })
        let gender = this.props.gender === 1 ? 'a' : 'o';
        return (
            <Grid columns={4}>
                <Grid.Row className="pad0">
                    <span 
                        className="fs14 display-block tagline-subtitle" 
                    >
                        {`Conhecid${gender} por:`}
                    </span>
                </Grid.Row>
                <Grid.Row>
                    { listPhotos }
                </Grid.Row>
            </Grid>
        );
    }
}