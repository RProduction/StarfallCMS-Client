import React, {useEffect, useRef, useState} from 'react';
import { Typography, AppBar, Toolbar} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

function Header(){
    return(
        <AppBar>
            <Toolbar>
                <Typography variant="h6" align="center">
                    StarfallCMS
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;