import React from 'react'
import { Grid } from 'semantic-ui-react';

export const InfoBoxComponent = (props) => {
    return(
        <Grid>
            <Grid.Column>
                <span 
                    className="fs14 display-block" 
                    style={ styles.movieSubtitle }
                >
                    { props.title }
                </span>
                <span 
                    className="fs25 display-block mt5 movie-info" 
                    style={ styles.movieInfo }
                >
                    { props.info }
                </span>
            </Grid.Column>
        </Grid>
    )
}

export default InfoBoxComponent;

const styles = {
    movieSubtitle: {
        fontSize: '17px',
        fontFamily: 'Oswald, serif'
    },
    movieInfo: {
        color: '#00FC87',
        lineHeight: '1.1em',
        fontFamily: 'Oswald,sans-serif'
    }
}