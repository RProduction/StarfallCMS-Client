import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import PropTypes from 'prop-types';

// will accept parameter of title, content, and dialogProps
function DialogNotification(props){
    const {title, content, dialogProps} = props;

    return(
        <Dialog {...dialogProps}>
            <DialogTitle id='dialog-notification-title'>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

DialogNotification.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    dialogProps: PropTypes.shape({
        ...Dialog.propTypes
    }).isRequired
}

export default DialogNotification;