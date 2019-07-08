import React, {useEffect, useState, lazy} from 'react';
import {useSelector} from 'react-redux';
import {Grid} from '@material-ui/core';
import OverviewCard from './OverviewCard';
import {CREATOR} from '../redux/actions/authorizationActions';
import {selectAllProjects} from '../redux/selectors/projectSelectors';

const OverviewAuthorized = lazy(() => import('./OverviewAuthorized'));

// fetch authStatus from redux store and setAuthorized(true) if creator
// Any actions in Overview will affect Project and need Creator level Authorization
function Overview(props){
    const status = useSelector(state=>state.authStatus);
    const projects = useSelector(selectAllProjects);
    const [authorized, setAuthorized] = useState(false);

    useEffect(()=>{
        if(status === CREATOR) setAuthorized(true);
        else setAuthorized(false);
    }, [status]);

    // view all projects within CMS and their attribute
    // project name
    // project thumbnail
    // project last modified
    // how many entity
    // list of entity and their last modified

    return(
        <Grid container>
            {authorized ? <OverviewAuthorized/> : null}
            {
                projects.map((value, index)=>{
                    return(
                        <OverviewCard key={value.id} index={index+1} 
                            {...value} authorized={authorized}
                        />
                    )
                })
            }
        </Grid>
    )
}

export default Overview;