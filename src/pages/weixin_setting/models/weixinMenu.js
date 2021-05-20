import { createMenu } from '../../../services/weixin'

export default {
    namespace: 'weixinMenu',
    state: {},
    reducers: {
        saveMenu(state, action) {
            return { ...state, menuList: action.payload }
        }
    },
    effects: {
        *createMenu({ payload }, { call, put }) {
            return yield call(createMenu, payload)
        }
    }
}
