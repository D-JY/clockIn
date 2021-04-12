import { getUserList } from '../../../services/user'

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
        }
    }
}
