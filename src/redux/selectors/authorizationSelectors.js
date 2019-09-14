// users selectors
const _selectUsers = state => state.users;
export const selectUserIds = state => Object.keys(_selectUsers(state));
export const selectUser = (state, id) => _selectUsers(state)[id];
export const selectAllUsers = state => Object.values(_selectUsers(state));