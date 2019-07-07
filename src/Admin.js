import React, {useEffect, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import {InitDatabase} from './redux/actions/projectActions';
import {useDispatch} from 'react-redux';
import ContentContainer from './components/ContentContainer';
import {makeStyles} from '@material-ui/core';
import WebsocketClient from './WebsocketClient';

const Overview = lazy(()=>import('./components/Overview'));
const Project = lazy(()=>import('./components/Project'));

const useStyle = makeStyles(theme => ({
    root: {
		marginTop: 65,
		paddingTop: 15,
		paddingBottom: 15,
		...theme.responsive
	}
}));

function Admin(props) {
	const style = useStyle();
	const {location} = props;
	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(InitDatabase());
	}, []);

	return (
		<React.Fragment>
			<WebsocketClient/>
			<Header {...props}/>
			<SideBar/>
			
			<ContentContainer className={style.root}>
				<Switch>
					<Route path='/:project/:entity' component={()=>location.pathname}/>
					<Route path='/:project' component={Project}/>
					<Route path='/' component={Overview}/>
				</Switch>
			</ContentContainer>
	
			<Footer/>
		</React.Fragment>
	);
}

export default Admin;