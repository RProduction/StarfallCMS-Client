import React from 'react';
import {Menu, MenuItem, ListItemIcon, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';

function Icon({IconComponent}){
    if(!IconComponent) return null;
    return(
        <ListItemIcon>
            <IconComponent/>
        </ListItemIcon>
    )
}

// menus is list consist of
// {title: string, onClick: fn, icon: component}
function PopoverMenu(props){
    const {menus} = props;

    return(
        <Menu {...props}>
        {
            menus.map((value, index)=>{
                const title = value.title ? value.title : '';
                const onClick = value.onClick ? value.onClick : ()=>{};

                return(
                    <MenuItem key={index} onClick={onClick}>
                        <Icon IconComponent={value.icon}/>
                        <Typography>{title}</Typography>
                    </MenuItem>
                )
            })
        }
        </Menu>
    )
}

PopoverMenu.propTypes = {
    menus: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            icon: PropTypes.elementType,
            onClick: PropTypes.func.isRequired
        }).isRequired
    ).isRequired,
    ...Menu.propTypes
}

export default PopoverMenu;