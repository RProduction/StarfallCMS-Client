import React, {useState} from 'react';
import {Grid, Card, CardContent, CardHeader
    , CardMedia, Box, List, Avatar, IconButton
    , Typography} from '@material-ui/core';
import {MoreVert} from '@material-ui/icons';
import {Link} from 'react-router-dom';
import OverviewContent from './OverviewContent';
import OverviewList from './OverviewList';
import {useDispatch} from 'react-redux';
import {SetProjectPopover} from '../actions/projectActions';
import {SetTarget} from '../actions/globalActions';

function Index({index}){
    return <Avatar>{index}</Avatar>;
}

function Title({name}){
    return(
        <Typography 
            variant="h4" 
            component={Link}
            to={`/${name}`} 
            style={{ color: "black" }}
        >
            {name}
        </Typography>
    )
}

function Action({id, name}){
    const dispatch = useDispatch();

    return(
        <IconButton 
            aria-label="More Action"
            onClick={
                (e)=>{
                    dispatch(SetTarget(id, name));
                    dispatch(SetProjectPopover(e.currentTarget));
                }
            }
        >
            <MoreVert />
        </IconButton>
    )
}

function Detail({primary}){
    return(
        <OverviewList listItemProp={{dense: true}}
            listItemTextProp={{
                primaryTypographyProps:{variant: 'body2'},
                primary: primary
            }}
        />
    )
}

// Overview Card actions will only available for creator
// actions consist of renaming and deleting Project
// and those action need Creator Authorization
function OverviewCard(props){
    const {name, index, id, updated, created, entities, publicKey, authorized} = props;

    let _entities = [];
    if(entities !== undefined){
        for(const [key, value] of Object.entries(entities)){
            _entities.push({
                key: value.id,
                name: key,
                projectName: name
            });
        }
    }

    return(
        <Grid item container xs={12} justify="center">
            <Box component={Card} bgcolor='#F2F3F3' my={1.5} width={1}>
                <CardHeader 
                    avatar={<Index index={index}/>} 
                    title={<Title name={name}/>}
                    action={authorized ? <Action id={id} name={name}/> : null}
                />
                <Box component={CardMedia} height={250} title={name}
                    image={'https://via.placeholder.com/150'}
                />
                <CardContent component={List}>
                    <Detail primary={`Public Key: ${publicKey}`}/>
                    <Detail primary={`Created At: ${created}`}/>
                    <Detail primary={`Updated At: ${updated}`}/>
                    <OverviewContent entities={_entities}/>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;