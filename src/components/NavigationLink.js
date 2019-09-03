import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Link from 'react-router-dom/Link';

const LinkRoot = React.forwardRef((props, ref)=>{
    return <Link to={props.to} innerRef={ref}>
        {props.content}
    </Link>
});

function NavigationLink(props){
    return(
        <Grid item container xs={5} sm={4} justify="center">
            <Typography
                component={LinkRoot}
                {...props}
                align="center"
                display="inline"
            />
        </Grid>
    )
}

export default NavigationLink;