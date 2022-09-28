import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from './../constants/userConstants';

const INITIAL_STATE = {};

export const userLoginReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true}
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

export const userRegisterReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true}
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}