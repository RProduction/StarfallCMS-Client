import React, {useState} from 'react';
import { ListItem, ListItemText, Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
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
                    const {name} = value
                    return <Content key={index+1} name={name} 
                        projectName={projectName} index={index+1}
                    />;
                })
            }
            </Collapse>
        </React.Fragment>
    )
}

export default OverviewContent;