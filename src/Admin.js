import React, {lazy, Suspense, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SideBar from './components/SideBar';
import Axios from './Axios';
import {AddProject, AddEntity} from './actions/actions';
import {useDispatch} from 'react-redux';

function Admin(props) {
	const {match, location} = props;
	const dispatch = useDispatch();
	async function fetchData(){
		// fetch all projects
		// then fetch all entities for each projects
		try{
			const projects = await Axios.get('project');
			// loop over project and assign it into store
			for(let project of projects.data){
				dispatch(AddProject(project.id, project.project_name));
				const entities = await Axios.get(`entity/${project.id}`);
				// loop over entities of project and assign it into store
				for(let entity of entities.data){
					dispatch(AddEntity(project.project_name, entity.id, entity.entity_name));
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
			<Header {...props}/>
			<SideBar/>
			
			<Switch>
				<Route path='/' component={()=>location.pathname}/>
				<Route path='/:project' component={()=>location.pathname}/>
				<Route path='/:project/:entity' component={()=>location.pathname}/>
			</Switch>
	
			<Footer/>
		</React.Fragment>
	);
}

export default Admin;