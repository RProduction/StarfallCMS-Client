import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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