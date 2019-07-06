// authorization status
export const FIRST_BOOT = "FIRST_BOOT";
export const NOT_AUTHORIZED = "NOT_AUTHORIZED";
export const USER = "USER";
export const MANAGER = "MANAGER";
export const CREATOR = "CREATOR";
export const AUTHORIZATION_STATUS = {
    "0": FIRST_BOOT,
    "-1": NOT_AUTHORIZED,
    "1": USER,
    "2": MANAGER,
    "3": CREATOR
};

export function SetAuthStatus(status){
    return {type: "SET_AUTHORIZATION_STATUS", status: status};
}