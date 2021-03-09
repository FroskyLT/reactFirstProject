import { ProfileAPI, UsersAPI } from "../../api/api";

const ADD_POST = 'ADD_NEW_POST';
const UPDATE_POST = 'UPDATE_NEW_POST_ELEMENT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_INFORMATION = 'SET_USER_INFORMATION';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postData: [
        { id: '1', content: 'Hello world', likesCount: '11', imgUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' },
        { id: '2', content: 'This is my first post!', likesCount: '5', imgUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' },
        { id: '3', content: 'Today I am tired.', likesCount: '1', imgUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' },
        { id: '4', content: 'Happy holidays', likesCount: '91', imgUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png' }
    ],
    newPostText: 'Hello world!',
    profile: null,
    // profile: {
        //     aboutMe: null,
        //     contacts: {facebook: null, github: null, instagram: null, mainLink: null, twitter: null, vk: null, website: null, youtube: null,  fullName: null},
        //     lookingForAJob: null,
        //     lookingForAJobDescription: null,
        //     photos: {small: null, large: null},
        //     userId: 14984,
        // },
        // userInfo: {
        //     followed: false,
        //     id: 2,
        //     name: "samurai dimych",
        //     photos: {small: "https://social-network.samuraijs.com/activecontent/images/users/2/user-small.jpg?v=1", large: "https://social-network.samuraijs.com/activecontent/images/users/2/user.jpg?v=1"},
        //     status: "ghgdddsdsd sd",
        //     uniqueUrlName: null,
        // },
    userInfo: null,
    totalPosts: 4,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.totalPosts + 1,
                content: state.newPostText,
                likesCount: 0,
                imgUrl: 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png'
            }
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: '',
                totalPosts: state.totalPosts + 1
            };
        }
        case UPDATE_POST: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_USER_INFORMATION: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        default:
            return state;
    }
}

// AC
export const addPost = () => ({ type: ADD_POST });
export const setUserProfile = profile => ({ type: SET_USER_PROFILE, profile });
export const setUserInformation = userInfo => ({ type: SET_USER_INFORMATION, userInfo });
export const updateNewPostElement = text => ({ type: UPDATE_POST, newText: text });
export const setStatus = status => ({ type: SET_STATUS, status });

//TC
export const getUserProfile = (userId) => (dispatch) => {
    ProfileAPI.getSelectedUserProfile(userId)
        .then(data => {
            UsersAPI.getUserInfo(data.fullName).then(userResponse => userResponse.items.forEach(user => {
                if (user.name === data.fullName) {
                    dispatch(setUserProfile(data));
                    dispatch(setUserInformation(user));
                }
            }));
        });
}

export const setCurrentUserStatus = (updatedStatus) => (dispatch) => {
    ProfileAPI.updateCurrentUserStatus(updatedStatus)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setStatus(updatedStatus));
            }
        });
}

export const getCurrentUserStatus = (userId) => (dispatch) => {
    ProfileAPI.getCurrentUserStatus(userId)
        .then(data => {
            dispatch(setStatus(data));
        });
}

export default profileReducer;