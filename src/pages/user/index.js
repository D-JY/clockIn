import React from 'react'
import styles from './index.less'
import DataForm from '../../components/dataForm'
import DataTable from '../../components/dataTable'
import { Button, Modal } from 'antd'
import { connect } from 'dva'
 
class User extends React.Component{
    state = {
        formConfig: {
            config: [
                { type: 'input', label: '账号', key: 'name' },
                { type: 'select', label: '角色', key: 'role', options: [
                    { label: '请选择角色', value: '' },
                    { label: '超级管理员', value: 1 },
                    { label: '普通管理员', value: 2 }
                ], inputWidth: '200px' }
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
        dataSource: [],
        visible: false
    }
    render() {
        return (
            <div>
                <div className={styles.bg}>
                    <div className="flexbox align">
                        <DataForm onRef={(ref) => this.formRef = ref} {...this.state.formConfig}></DataForm>
                        <Button type="primary" onClick={this.submitEvent}>搜索</Button>
                    </div>
                </div>
                {this.props.userInfo.role === 1 && <Button type="primary" icon="plus" className={styles.addBtn}>添加人员</Button>}
                <div className={styles.bg}>
                    <DataTable columns={this.state.columns} dataSource={this.state.dataSource}></DataTable>
                </div>
                <Modal
                    title="修改信息"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.setState({ visible: false })}
                    >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
    componentDidMount() {
        this.getUserList()
    }
    getUserList = (params = {}) => {
        const { dispatch } = this.props
        dispatch({ type: 'user/getUserList', payload: params }).then(data => {
            if (data.success) {
                this.setState({ dataSource: data.data })
            }
        })
    }
    submitEvent = () => {
        this.formRef.getVal().then(val => {
            this.getUserList({ name: val.name, role: val.role })
        })
    }
    handleOk = () => {
        
    }
}

export default connect((state) => {
    return {
        userInfo: state.login.userInfo
    }
})(User)
