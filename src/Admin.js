import React, {useEffect, lazy, Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import {InitDatabase} from './redux/actions/projectActions';
import {useDispatch, useSelector} from 'react-redux';
import {CREATOR, MANAGER, USER} from './redux/actions/authorizationActions';
import ContentContainer from './components/ContentContainer';
import {makeStyles} from '@material-ui/core';

const WebsocketClient = lazy(()=>import('./WebsocketClient'));
const Overview = lazy(()=>import('./components/Overview'));
const Project = lazy(()=>import('./components/Project'));
const Entity = lazy(()=>import('./components/Entity'));
const Document = lazy(()=>import('./components/Document'));

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
	const dispatch = useDispatch();
	const auth = useSelector(state => state.authStatus);

	useEffect(()=>{
		dispatch(InitDatabase());
	}, []);

	return (
		<React.Fragment>
			<Header {...props}/>
			<SideBar/>
			
			<ContentContainer className={style.root}>
				<Suspense fallback={<div></div>}>
					{auth === CREATOR || auth === MANAGER || auth === USER
						? <WebsocketClient/>
						: null
					}
					<Switch>
						<Route path='/:project/:entity/:document' component={Document}/>
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