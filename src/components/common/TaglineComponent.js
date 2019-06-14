import React from 'react';
import { Grid, Header } from 'semantic-ui-react'

export const TaglineComponent = (props) => {
    return(
        <Grid>
            <Grid.Column>
                <Header 
                    as={ props.size }
                    textAlign={ props.textAlign }
                    style={ styles.movieTagline }
                >{ props.tagline }</Header>
            </Grid.Column>
        </Grid>
    )
}

export default TaglineComponent;

const styles = {
    movieTagline: {
        color: '#00FC87',
        fontFamily: 'Oswald, serif',
        fontWeight: '300'
    }
}