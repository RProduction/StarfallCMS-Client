import React from 'react';
import {Grid} from '@material-ui/core';

const GridRoot = React.forwardRef((props, ref)=>{
    return <Grid {...props} innerRef={ref}/>
});

export default GridRoot;