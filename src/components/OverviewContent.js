import React, {useState} from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

import {Link} from 'react-router-dom';

import OverviewList from './OverviewList';

function Content({index, projectName, name}){
    return(
        <OverviewList listItemProp={{dense: true}}
            listItemTextProp={{
                primaryTypographyProps: {variant: 'body2'},
                primary: 
                    <React.Fragment>
                        {`${index}. `}
                        <Link style={{ color: "black" }}
                            to={`/${projectName}/${name}`}
                        >
                            {name}
                        </Link>
                    </React.Fragment>
            }}
        />
    )
}

function OverviewContent(props){
    const {entities, projectName} = props;
    const [open, setOpen] = useState(false);

    if(entities.length === 0) return null;

    return(
        <React.Fragment>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemText 
                    primaryTypographyProps={{variant:'h6'}}
                    primary="Entities"
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
            {
                entities.map((value, index)=>{
                    const {id, name} = value;
                    return <Content key={id} name={name} 
                        projectName={projectName} index={index+1}
                    />;
                })
            }
            </Collapse>
        </React.Fragment>
    )
}

export default OverviewContent;