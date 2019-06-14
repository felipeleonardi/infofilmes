import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';

export const LoaderComponent = (props) => {
    return(
        <Grid 
            centered 
            columns={ props.columns }
            className={ props._class }>
            <Loader 
                active={ props.active }
                inline={ props.inline }
                size={ props.size }
                inverted={ props.inverted }
            />
        </Grid>
    )
}

export default LoaderComponent;