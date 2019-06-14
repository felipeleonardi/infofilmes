import React, { Component } from 'react';
import { Grid, Image } from 'semantic-ui-react';

import $ from 'jquery';

export default class PosterImageComponent extends Component {

    componentDidMount() {
        $('#poster').hide();
    }

    handleLoadImage() {
        $('#poster').fadeIn(1500);
    }

    render() {
        return(
            <Grid.Column 
                width={ this.props.width } 
                style={ styles.zeroMarginPadding }>
                <Image 
                    src={ this.props.url } 
                    id="poster"
                    onLoad={ this.handleLoadImage.bind(this) }
                />    
            </Grid.Column>
        )       
    }
}

const styles = {
    zeroMarginPadding: {
        margin: 0,
        padding: 0
    }
}