import React, {useEffect, lazy, Suspense} from 'react';

import {Route, Switch, Redirect} from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';

import {useDispatch, useSelector} from 'react-redux';

import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import {InitDatabase} from './redux/actions/projectActions';
import ContentContainer from './components/ContentContainer';
import WebsocketClient from './WebsocketClient';
import {NOT_AUTHORIZED, FIRST_BOOT} from './redux/actions/authorizationActions';

const Overview = lazy(()=>import('./components/Overview'));
const Project = lazy(()=>import('./components/Project'));
const Entity = lazy(()=>import('./components/Entity'));
const Document = lazy(()=>import('./components/Document'));
const Storage = lazy(()=>import('./components/Storage'));

const useStyle = makeStyles(theme => ({
    root: {
		marginTop: 65,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: theme.palette.background.light.light,
		overflow: 'auto',
		...theme.responsive
	}
}));

function Admin(props) {
	const style = useStyle();
	const dispatch = useDispatch();
	const _status = useSelector(state => state.authStatus);

	useEffect(()=>{
		dispatch(InitDatabase());
	}, []);

	if(_status === FIRST_BOOT)
		return <Redirect to='/signup'/>;
	else if(_status === NOT_AUTHORIZED)
		return <Redirect to='/signin'/>;
	else return (
		<React.Fragment>
			<Header {...props}/>
			<SideBar/>
			
			<WebsocketClient/>
			<ContentContainer className={style.root}>
				<Suspense fallback={<div></div>}>
					<Switch>
						<Route path='/:project/:entity/:document' component={Document}/>
						<Route path='/:project/storage' component={Storage}/>
						<Route path='/:project/:entity' component={Entity}/>
						<Route path='/:project' component={Project}/>
						<Route path='/' component={Overview}/>
					</Switch>
				</Suspense>
			</ContentContainer>
	
			<Footer/>
		</React.Fragment>
	);
}

export default Admin;