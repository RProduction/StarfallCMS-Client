import React, {useRef, useEffect} from 'react';
import {MTableBody} from 'material-table';
import {RootRef} from '@material-ui/core';

function StorageCustomBody(props){
	const body = useRef(null);
	
	const onDrop = (e) => {
		console.log('drop mtablebody');
		console.log(e.dataTransfer.files);
		e.preventDefault();
	};

	const onDragStart = (e) => {
		console.log('drag start mtablebody');
		e.preventDefault();
	};

	const onDragEnd = (e) => {
		console.log('drag end mtablebody');
		e.preventDefault();
	};

	const onDragOver = (e) => {
		console.log('drag over mtablebody');
		e.preventDefault();
	};

	const onClick = () => console.log('click');

	useEffect(()=>{
		body.current.addEventListener('drop', onDrop);
		body.current.addEventListener('dragstart', onDragStart);
		body.current.addEventListener('dragend', onDragEnd);
		body.current.addEventListener('dragover', onDragOver);
		body.current.addEventListener('click', onClick);

		return ()=>{
			body.current.removeEventListener('drop', onDrop);
			body.current.removeEventListener('dragstart', onDragStart);
			body.current.removeEventListener('dragend', onDragEnd);
			body.current.removeEventListener('dragover', onDragOver);
			body.current.removeEventListener('click', onClick);
		}
	}, []);

	return(
		<RootRef rootRef={body}>
			<MTableBody {...props}/>
		</RootRef>
	)
}

export default StorageCustomBody;