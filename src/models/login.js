import { login, user } from '../services/login'

export default {
    namespace: 'login',
    state: {},
    reducers: {
        saveToken(state, action) {
            return { ...state, token: action.payload.token }
        },
        saveUserInfo(state, action) {
            return { ...state, userInfo: action.payload }
        }
    },
    effects: {
        *getLoginInfo({ payload }, { call, put }) {
            const data = yield call(login, payload)
            if (data.success) {
                yield put({ type: 'saveToken', payload: { token: data.token } })
            }
            return data
        },
        *getUserInfo({ payload }, { call, put }) {
            const data = yield call(user, payload)
            if (data.success) {
                yield put({ type: 'saveUserInfo', payload: data.data })
            }
            return data
        }
    }
}
