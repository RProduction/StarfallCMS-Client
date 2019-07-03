import React, {useEffect, lazy} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import Axios from './Axios';
import {AddProject, AddEntity} from './actions/adminActions';
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
	async function fetchData(){
		// fetch all projects
		// then fetch all entities for each projects
		try{
			const projects = await Axios.get('project');
			// loop over project and assign it into store
			for(let project of projects.data){
				dispatch(
					AddProject(
						project._id, 
						project.name,
						project.created_at,
						project.updated_at,
						project.public_key
					)
				);
				const entities = await Axios.get(`entity/${project._id}`);
				// loop over entities of project and assign it into store
				for(let entity of entities.data){
					dispatch(
						AddEntity(
							project.name, 
							entity._id, 
							entity.name,
							entity.created_at,
							entity.updated_at
						)
					);
				}
			}
		}
		catch(err){
			console.log(err);
		}
	}

	useEffect(()=>{
		fetchData();
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