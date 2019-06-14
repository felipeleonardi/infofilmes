import React from 'react'
import { Grid, Header } from 'semantic-ui-react'

export const TitleComponent = (props) => {
    return(
        <div>
            <Grid>
                <Grid.Column>
                    <Header 
                        as={ props.size }
                        textAlign={ props.textAlign }
                        style={ styles.movieTitle }>{ props.title }</Header>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default TitleComponent;

const styles = {
    movieTitle: {
        textTransform: 'uppercase',
        fontSize: '36px',
        color: 'white'
    }
}