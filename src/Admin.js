import React, {useContext, lazy, Suspense} from 'react';
import {Route, Redirect , Switch, __RouterContext} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function Admin() {
	return (
		<React.Fragment>
			<Header/>
	
			
	
			<Footer/>
		</React.Fragment>
	);
}

export default Admin;