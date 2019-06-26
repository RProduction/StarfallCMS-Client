import React from 'react';
import { Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyle = makeStyles({
    root: {
        backgroundColor: '#292D2E',
    },
    text: {
        color: 'white',
        fontSize: '125%',
        textAlign: 'center',
        lineHeight: '50px'
    }
});

function Footer(){
    const style = useStyle();
    return(
        <footer className={style.root}>
            <Typography variant="h3" className={style.text}>
                Copyright Starfall Production
            </Typography>
        </footer>
    );
}

export default Footer;