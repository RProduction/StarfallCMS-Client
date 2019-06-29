import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem, Divider, ListItemText, ButtonBase, makeStyles} from '@material-ui/core';

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
            <ListItem>
                <ButtonBase component={Link} 
                    to={`/${projectName}/${name}`}
                    className={style.root}
                >
                    <ListItemText primary={name}/>
                </ButtonBase>
            </ListItem>
            <Divider/>
        </React.Fragment>
    )
}

export default SideBarEntity;