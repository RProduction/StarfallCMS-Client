import React, {lazy} from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';

const OverviewCardAction = lazy(() => import('./OverviewCardAction'));

const Index = ({index}) => <Avatar>{index}</Avatar>;
const Title = ({name}) => <Typography variant="h4" style={{ color: "black" }}>{name}</Typography>

const useStyle = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(0.5),
        paddingTop: theme.spacing(0.5)
    },
    horizontal: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5)
    }
}));

// Overview Card actions will only available for creator
// actions consist of renaming and deleting Project
// and those action need Creator Authorization
function OverviewCard(props){
    const {name, index, id, img, updated, created, publicKey, authorized} = props;
    const style = useStyle();
    
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
                <CardContent component={Grid} container>
                    <Grid xs={12} container item 
                        alignItems="center" className={style.root}
                    >
                        <Grid component={Typography} item xs={"auto"}>
                            Public Key:
                        </Grid>
                        <Grid component={TextField} item xs className={style.horizontal}
                            value={publicKey} variant="outlined"
                            inputProps={{
                                onClick: (e) => {
                                    e.target.select();
                                    e.target.setSelectionRange(0, 99999);
                                    document.execCommand("copy");
                                    alert("Copied Public Key");
                                }
                            }}
                        />
                    </Grid>
                    <Grid xs={12} item component={Typography} className={style.root}>
                        {`Created At: ${created}`}
                    </Grid>
                    <Grid xs={12} item component={Typography} className={style.root}>
                        {`Updated At: ${updated}`}
                    </Grid>
                </CardContent>
            </Box>
        </Grid>
    );
}

export default OverviewCard;