import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Grid} from '@material-ui/core';
import OverviewCard from './OverviewCard';
import {CREATOR} from '../actions/authorizationActions';

// fetch authStatus from redux store and setAuthorized(true) if creator
// Any actions in Overview will affect Project and need Creator level Authorization
function Overview(props){
    const status = useSelector(state=>state.authStatus);
    const database = useSelector(
        state => state.database, ()=>false
    );
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        if(status === CREATOR) setAuthorized(true);
        else setAuthorized(false);
    }, status);

    let cards = [];
    if(database !== undefined){
        let i=1;
        for(const [key, value] of Object.entries(database)){
            cards.push({
                key: value.id,
                index: i,
                name: key,
                ...value
            });
            i++;
        }
    }

    // view all projects within CMS and their attribute
    // project name
    // project thumbnail
    // project last modified
    // how many entity
    // list of entity and their last modified

    return(
        <Grid container>
        {
            cards.map((value)=>{
                return(
                    <OverviewCard {...value} authorized={authorized}/>
                )
            })
        }
        </Grid>
    )
}

export default Overview;