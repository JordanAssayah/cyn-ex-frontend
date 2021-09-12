import { createSlice } from '@reduxjs/toolkit'
import Api from '../services/api'
import dateFormat from 'date-fns/format'

export const getAllUsers = () => async dispatch => {
    dispatch(getAllUsersLoading())
    try {
        const usersRes = await Api.get('/users')

        if (usersRes.status === 200) {
            dispatch(getAllUsersSuccess(usersRes.data))
        }
    } catch (error) {
        console.log(error)
        dispatch(getAllUsersFailure(error))
    }
}

export const createUser = (user) => async dispatch => {
    dispatch(createUserLoading())
    try {
        // const usersRes = await Api.get('/users')

        // if (usersRes.status === 201) {
        //     dispatch(createUserSuccess(usersRes.data))
        // }
        user.date = dateFormat(new Date(), 'yyyy-mm-dd')
        dispatch(createUserSuccess(user))
    } catch (error) {
        console.log(error)
        dispatch(createUserFailure(error))
    }
}

export const userSlice = createSlice({ 
    name: 'users',
    initialState: {
        list: [
            {
                name: 'Jordan',
                address: 'Krinitsi 79',
                date: dateFormat(new Date(), 'yyyy-mm-dd')
            },
            {
                name: 'David',
                address: 'David Hamelech 79',
                date: dateFormat(new Date(), 'yyyy-mm-dd')
            },
            {
                name: 'John',
                address: 'Jone  79',
                date: dateFormat(new Date(), 'yyyy-mm-dd')
            }
        ],
        isGettingAllUsers: false,
        isCreatingUser: false,
        error: undefined
    },
    reducers: {
        createUserSuccess: (state, action) => {
            state.isCreatingUser = false
            state.list.push(action.payload)
        },
        createUserFailure: (state, payload) => {
            state.isCreatingUser = false
            state.error = payload
        },
        createUserLoading: (state) => {
            state.isCreatingUser = true
        },
        getAllUsersSuccess: (state, payload) => {
            state.list = payload
            state.isGettingAllUsers = false
        },
        getAllUsersFailure: (state, payload) => {
            state.isGettingAllUsers = false
            state.error = payload
        },
        getAllUsersLoading: (state) => {
            state.isGettingAllUsers = true
        }
    }
})

export const {
    createUserSuccess,
    createUserFailure,
    createUserLoading,

    getAllUsersSuccess,
    getAllUsersFailure,
    getAllUsersLoading,
} = userSlice.actions

export default userSlice.reducer