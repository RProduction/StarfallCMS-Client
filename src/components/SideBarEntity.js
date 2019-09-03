import React from 'react';

import Link from 'react-router-dom/Link';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyle = makeStyles({
    root: {
        flexGrow: 1
    }
});

function SideBarEntity(props){
    const style = useStyle();
    const {name, projectName} = props;

    return(
        <React.Fragment>
            <ListItem divider>
                <ButtonBase component={Link} 
                    to={`/${projectName}/${name}`}
                    className={style.root}
                >
                    <ListItemText primary={name}/>
                </ButtonBase>
            </ListItem>
        </React.Fragment>
    )
}

export default SideBarEntity;