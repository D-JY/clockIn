import { getUserList, addUser, delUser, updateUser, getWeixinUserList } from '../../../services/user'

export default {
    namespace: 'user',
    state: {},
    reducers: {
        saveUserList(state, action) {
            return { ...state, userList: action.payload }
        }
    },
    effects: {
        *getUserList({ payload }, { call, put }) {
            return yield call(getUserList, payload)
        },
        *addUser({ payload }, { call }) {
            return yield call(addUser, payload)
        },
        *delUser({ payload }, { call }) {
            return yield call(delUser, payload)
        },
        *updateUser({ payload }, { call }) {
            return yield call(updateUser, payload)
        },
        *getWeixinUserList({ payload }, { call }) {
            return yield call(getWeixinUserList, payload)
        }
    }
}
