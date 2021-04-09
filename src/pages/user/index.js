import React from 'react'
import styles from './index.less'
import DataForm from '../../components/dataForm'
import DataTable from '../../components/dataTable'
import { Button } from 'antd'
 
class User extends React.Component{
    state = {
        formConfig: {
            config: [
                { type: 'input', label: '账号', key: 'name' },
                { type: 'select', label: '角色', key: 'role', options: [
                    { label: '超级管理员', value: 0 },
                    { label: '普通管理员', value: 1 }
                ], inputWidth: '200px' }
            ]
        },
        columns: [
            { title: 'ID', dataIndex: 'id' },
            { title: '账号', dataIndex: 'name' },
            { title: '角色', dataIndex: 'role' },
        ],
        dataSource: [
            { key: 1, id: 1, name: '123', role: 0 }
        ]
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
                <div className={styles.bg}>
                    <DataTable columns={this.state.columns} dataSource={this.state.dataSource}></DataTable>
                </div>
            </div>
        )
    }
    submitEvent = () => {
        this.formRef.getVal().then(val => {
            console.log(val, 123)
        })
    }
}

export default User
