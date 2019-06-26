import React from 'react';
import {Link} from 'react-router-dom';
import {Grid, Typography} from '@material-ui/core';

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