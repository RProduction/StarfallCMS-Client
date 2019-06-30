import React, {useState} from 'react';
import {Grid, Card, CardContent, CardHeader, CardMedia
    , Box, List, ListItem, ListItemText, Collapse} from '@material-ui/core';
import {useSelector} from 'react-redux';
import {ExpandLess, ExpandMore} from '@material-ui/icons';

function OverviewContent(props){
    const {entities} = props;
    const [open, setOpen] = useState(false);

    if(entities.length > 0){
        return(
            <React.Fragment>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText primary="Entities"/>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    entities.map((value, index)=>{
                        const {key, name} = value;
                        return(
                            <ListItem key={key}>
                                <ListItemText primary={`${index+1}. ${name}`}/>
                            </ListItem>
                        )
                    })
                }
                </Collapse>
            </React.Fragment>
        )
    }
    else{
        return null;
    }
}

function OverviewCard(props){
    const {name} = props;
    const database = useSelector(
        state => state.database[name].entities, ()=>false
    );

    let entities = [];
    if(database !== undefined){
        for(const [key, value] of Object.entries(database)){
            entities.push({
                key: value.id,
                name: key
            });
        }
    }

    return(
        <Grid item container xs={12} justify="center">
            <Box component={Card} bgcolor='#F2F3F3' my={1.5} width={1}>
                <CardHeader title={name}/>
                <Box component={CardMedia} height={250} title={name}
                    image={'https://via.placeholder.com/150'}
                />
                <CardContent component={List}>
                    <OverviewContent entities={entities}/>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;