import React, {useMemo, lazy} from 'react';
import {Grid, Card, CardContent, CardHeader
    , CardMedia, Box, List, Avatar, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import OverviewContent from './OverviewContent';
import OverviewList from './OverviewList';
import {useSelector} from 'react-redux';
import {selectEntitiesInProject} from '../redux/selectors/entitySelectors';

const OverviewCardAction = lazy(() => import('./OverviewCardAction'));

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
    const {name, index, id, updated, created, publicKey, authorized} = props;
    const select = useMemo(selectEntitiesInProject,[]);
    const entities = useSelector(state => select(state, id));
    
    return(
        <Grid item container xs={12} justify="center">
            <Box component={Card} bgcolor='#F2F3F3' my={1.5} width={1}>
                <CardHeader 
                    avatar={<Index index={index}/>} 
                    title={<Title name={name}/>}
                    action={authorized 
                        ? <OverviewCardAction id={id} name={name}/> 
                        : null
                    }
                />
                <Box component={CardMedia} height={250} title={name}
                    image={'https://via.placeholder.com/150'}
                />
                <CardContent component={List}>
                    <Detail primary={`Public Key: ${publicKey}`}/>
                    <Detail primary={`Created At: ${created}`}/>
                    <Detail primary={`Updated At: ${updated}`}/>
                    <OverviewContent entities={entities} projectName={name}/>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;