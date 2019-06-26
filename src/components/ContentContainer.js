import React from 'react';
import {Container, Box} from '@material-ui/core';

const ContainerRoot = React.forwardRef((props, ref)=>{
    return <Container {...props} innerRef={ref}/>
});

function ContentContainer(props){
    return(
        <Box
            minHeight='100vh'
            component={ContainerRoot} 
            maxWidth="xl"
            {...props}
        >
            {
                props.children
            }
        </Box>
    )
}

export default ContentContainer;