import React from 'react';
import {Link} from 'react-router-dom';
import {ListItem, ListItemText, ButtonBase, makeStyles} from '@material-ui/core';

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