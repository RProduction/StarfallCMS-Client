import React, {useState} from 'react';
import { ListItem, ListItemText, Collapse} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import OverviewList from './OverviewList';
import PropTypes from 'prop-types';

function Content({index, projectName, name}){
    return(
        <OverviewList listItemProp={{dense: true}}
            listItemTextProp={{
                primaryTypographyProps: {variant: 'body2'},
                primary: 
                    <React.Fragment>
                        {`${index + 1}. `}
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
    const {entities} = props;
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
                    return <Content {...value} index={index}/>;
                })
            }
            </Collapse>
        </React.Fragment>
    )
}

OverviewContent.propTypes = {
    entities: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            projectName: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

export default OverviewContent;