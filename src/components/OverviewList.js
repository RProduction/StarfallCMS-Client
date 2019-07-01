import React from 'react';
import { ListItem, ListItemText} from '@material-ui/core';
import PropTypes from 'prop-types';

function OverviewList(props){
    return(
        <ListItem {...props.listItemProp}>
            <ListItemText {...props.listItemTextProp}/>
        </ListItem>
    )
}

OverviewList.propTypes = {
    listItemProp: PropTypes.shape({
        ...ListItem.propTypes
    }),
    listItemTextProp: PropTypes.shape({
        ...ListItemText.propTypes
    })
}

export default OverviewList;