import React from 'react'
import styles from './weixin_user.less'
import DataTable from '../../components/dataTable'
import { connect } from 'dva'

class WeixinUser extends React.Component{
    state = {
        columns: [
            { title: '编号', dataIndex: 'id' },
            { title: '微信名称', dataIndex: 'userInfo', key: 'sex', render: (text) => this.renderData(text, 'nickname') },
            { title: '性别', dataIndex: 'userInfo', render: (text) => {
                const sex = parseInt(this.renderData(text, 'sex'))
                return  sex === 1 ? '男' : sex === 2 ? '女' : '未知'
            } },
            { title: '关注日期', dataIndex: ['createDate', 'createTime'], type: 'Date' },
        ],
    }
    render() {
        return (
            <div className={styles.bg}>
                <DataTable
                    columns={this.state.columns}
                    getData={(params) => this.getUserList(params)}>
                </DataTable>
            </div>
        )
    }
    renderData = (data, key) => {
        try {
            const res = JSON.parse(data)
            return res[key]
        } catch(err) {
            console.log(err)
            return null
        }
    }
    getUserList = (params) => {
        const { dispatch } = this.props
        return dispatch({ type: 'user/getWeixinUserList', payload: params })
    }
}

export default connect()(WeixinUser)
