export const selectTarget = state => state.target.toJS();
export const selectNotification = (state)=>{
    if(state.notification.isEmpty()) return null;
    return state.notification.toJS();
};