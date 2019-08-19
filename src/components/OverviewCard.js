import React, {lazy} from 'react';
import {Grid, Card, CardContent, CardHeader
    , CardMedia, Box, List, Avatar, Typography} from '@material-ui/core';
import OverviewList from './OverviewList';

const OverviewCardAction = lazy(() => import('./OverviewCardAction'));

const Index = ({index}) => <Avatar>{index}</Avatar>;
const Title = ({name}) => <Typography variant="h4" style={{ color: "black" }}>{name}</Typography>

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
    const {name, index, id, img, updated, created, publicKey, authorized} = props;
    
    return(
        <Grid item container xs={12} justify="center">
            <Box component={Card} bgcolor='#fafafa' my={1.5} width={1} elevation={3}>
                <CardHeader 
                    avatar={<Index index={index}/>} 
                    title={<Title name={name}/>}
                    action={authorized 
                        ? <OverviewCardAction id={id} name={name}/> 
                        : null
                    }
                />
                <Box component={CardMedia} height={250} title={name}
                    image={img}
                />
                <CardContent component={List}>
                    <Detail primary={`Public Key: ${publicKey}`}/>
                    <Detail primary={`Created At: ${created}`}/>
                    <Detail primary={`Updated At: ${updated}`}/>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;