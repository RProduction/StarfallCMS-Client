import React, {useState} from 'react';
import {Grid, Card, CardContent, CardHeader
    , CardMedia, Box, List, ListItem
    , ListItemText, Collapse, Avatar, IconButton
    , Typography} from '@material-ui/core';
import {ExpandLess, ExpandMore, MoreVert} from '@material-ui/icons';
import {Link} from 'react-router-dom';

function OverviewList(props){
    return(
        <ListItem dense>
            <ListItemText
                primaryTypographyProps={{
                    variant: 'body2'
                }}
                primary={props.primary}
            />
        </ListItem>
    )
}

function OverviewContent(props){
    const {entities} = props;
    const [open, setOpen] = useState(false);

    if(entities.length > 0){
        return(
            <React.Fragment>
                <ListItem button onClick={() => setOpen(!open)}>
                    <ListItemText 
                        primaryTypographyProps={{
                            variant:'h6'
                        }}
                        primary="Entities"
                    />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                {
                    entities.map((value, index)=>{
                        const {key, name, projectName} = value;
                        return(
                            <OverviewList key={key} 
                                primary={
                                    <React.Fragment>
                                        {`${index+1}. `}
                                        <Link style={{color: "black"}} 
                                            to={`/${projectName}/${name}`}
                                        >
                                            {name}
                                        </Link>
                                    </React.Fragment>
                                }
                            />
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
                    avatar={<Avatar>{index}</Avatar>} 
                    title={
                        <Typography variant="h4" component={Link} 
                            to={`/${name}`} style={{color: "black"}}
                        >
                            {name}
                        </Typography>
                    }
                    action={
                        authorized ?
                        <IconButton aria-label="More Action">
                            <MoreVert/>
                        </IconButton>
                        : null
                    }
                />
                <Box component={CardMedia} height={250} title={name}
                    image={'https://via.placeholder.com/150'}
                />
                <CardContent component={List}>
                    <OverviewList primary={`Public Key: ${publicKey}`}/>
                    <OverviewList primary={`Created At: ${created}`}/>
                    <OverviewList primary={`Updated At: ${updated}`}/>
                    <OverviewContent entities={_entities}/>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;