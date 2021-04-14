import React from 'react'
import styles from './index.less'
import DataForm from '../../components/dataForm'
import DataTable from '../../components/dataTable'
import { Button, Modal, message } from 'antd'
import { connect } from 'dva'
import md5 from 'md5'

const options = [
    { label: '请选择角色', value: '' },
    { label: '超级管理员', value: 1 },
    { label: '普通管理员', value: 2 }
]
const { confirm } = Modal
class User extends React.Component{
    state = {
        formConfig: {
            config: [
                { type: 'input', label: '账号', key: 'name' },
                { type: 'select', label: '角色', key: 'role', options, inputWidth: '200px' }
            ]
        },
        columns: [
            { title: '编号', dataIndex: 'id' },
            { title: '账号', dataIndex: 'username' },
            { title: '角色', dataIndex: 'role', render: (text, record, index) => {
                return text === 1 ? '超级管理员' : '普通管理员'
            } },
            { title: '注册日期', dataIndex: ['registerDate', 'registerTime'], type: 'Date' },
        ],
        updateVisible: false,
        addVisible: false,
        addConfig: [
            { type: 'input', label: '账号', key: 'name', rules: [{ required: true, message: '请输入账号' }], labelWidth: 5 },
            { type: 'select', label: '角色', key: 'role', options, rules: [{ required: true, message: '请选择角色' }], labelWidth: 5 },
            { type: 'password', label: '密码', key: 'password', labelWidth: 5, rules: [{ required: true, message: '请输入密码' }] },
            { type: 'password', label: '确认密码', key: 'confirmPwd', labelWidth: 5, rules: [{ required: true, message: '请输入确认密码' }, 'confirmPassword'] }
        ],
        search: {}
    }
    formRef = {}
    tableRef = {}
    render() {
        const { userInfo } = this.props
        return (
            <div>
                <div className={styles.bg}>
                    <div className="flexbox align">
                        <DataForm onRef={(ref) => this.formRef.search = ref} {...this.state.formConfig}></DataForm>
                        <Button type="primary" onClick={this.submitEvent}>搜索</Button>
                    </div>
                </div>
                {userInfo?.role === 1 && <Button type="primary" icon="plus" className={styles.addBtn} onClick={() => this.openModile('addVisible')}>添加人员</Button>}
                <div className={styles.bg}>
                    <DataTable
                        onRef={(ref) => this.tableRef.table = ref}
                        columns={this.state.columns}
                        getData={(params) => this.getUserList(params)}
                        search={this.state.search}
                        deleteFn={userInfo?.role === 1 ? this.deleteFn : void 0}>
                    </DataTable>
                </div>
                <Modal
                    title="添加人员"
                    visible={this.state.addVisible}
                    onOk={this.handleOk}
                    onCancel={() => this.cancel('addVisible')}
                    okText="确认"
                    cancelText="取消">
                    <DataForm onRef={(ref) => this.formRef.addForm = ref} config={this.state.addConfig} width="400px"></DataForm>
                </Modal>
            </div>
        )
    }
    getUserList = (params) => {
        const { dispatch } = this.props
        return dispatch({ type: 'user/getUserList', payload: params })
    }
    submitEvent = () => {
        this.setState({
            search: this.formRef.search.props.form.getFieldsValue()
        }, () => {
            this.tableRef.table.getData()
        })
        
    }
    handleOk = () => {
        const { dispatch } = this.props
        this.formRef.addForm.getVal().then(val => {
            dispatch({ type: 'user/addUser', payload: {
                name: val.name,
                password: md5(val.password),
                role: val.role
            } }).then(data => {
                if (data.success) {
                    message.success(data.message)
                    this.setState({ addVisible: false })
                    this.formRef.addForm.props.form.resetFields()
                    this.tableRef.table.getData()
                } else {
                    message.error(data.message)
                }
            })
        })
    }
    openModile = (name) => {
        this.setState({
            [name]: true
        })
    }
    cancel = (name) => {
        this.setState({
            [name]: false
        })
    }
    deleteFn = (record) => {
        const { dispatch } = this.props
        confirm({
            title: '提示?',
            content: '确定删除改用户？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                dispatch({ type: 'user/delUser', payload: { id: record.id } }).then(data => {
                    if (data.success) {
                        message.success(data.message)
                        this.tableRef.table.getData()
                    } else {
                        message.error(data.message)
                    }
                })
            }
        })
    }
}

export default connect((state) => {
    return {
        userInfo: state.login.userInfo
    }
})(User)
