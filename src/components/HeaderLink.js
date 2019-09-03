import React, {useEffect, useState} from 'react';

import Link from 'react-router-dom/Link';
import matchPath from 'react-router-dom/matchPath';

function HeaderLink(props){
    const {location} = props;
    const [params, setParams] = useState({});
    
    useEffect(()=>{
        // calculate how many strip in pathname
        // then apply matchPath function conditionally
        const count = (location.pathname.match(/\/./g)||[]).length;
        if(count === 0){
            setParams({});
        }else if(count === 1){
            setParams(matchPath(location.pathname, {
                path: "/:project", exact: true
            }).params);
        }else if(count === 2){
            setParams(matchPath(location.pathname, {
                path: "/:project/:entity", exact: true
            }).params);
        }else if(count === 3){
            setParams(matchPath(location.pathname, {
                path: "/:project/:entity/:document", exact: true
            }).params);
        }
    }, [location.pathname]);

    const {project, entity, document} = params;
    // from root => project => entity
    return(
        <React.Fragment>
            <Link to='/'> StarfallCMS </Link>
            {project ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}`}> {project} </Link>
                </React.Fragment> : null
            }
            {entity ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}/${entity}`}> {entity} </Link>
                </React.Fragment> : null
            }
            {document ? 
                <React.Fragment>
                    /
                    <Link to={`/${project}/${entity}/${document}`}> {document} </Link>
                </React.Fragment> : null
            }
        </React.Fragment>
    )
}

export default HeaderLink;