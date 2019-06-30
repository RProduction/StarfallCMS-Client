import React from 'react';
import {useSelector} from 'react-redux';
import {Grid} from '@material-ui/core';
import OverviewCard from './OverviewCard';

function Overview(props){
    const database = useSelector(
        state => state.database, ()=>false
    );

    let cards = [];
    if(database !== undefined){
        for(const [key, value] of Object.entries(database)){
            cards.push({
                key: value.id,
                name: key
            });
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
                    <OverviewCard {...value}/>
                )
            })
        }
        </Grid>
    )
}

export default Overview;