import React from 'react'
import { Table, Button } from 'antd'

class DataTable extends React.Component{
    constructor(props) {
        super(props)
        if (Object.prototype.toString.call(this.props.columns) === '[object Array]') {
            let arr = this.clone(this.props.columns)
            arr.push({ title: '操作', key: 'caozuo', render: (text, record) => {
                return (
                    <div>
                        <Button type="primary" size="small">编辑</Button>
                        <Button type="danger" size="small">删除</Button>
                    </div>
                )
            } })
            this.state = {
                columns: arr
            }
            console.log(this.state.columns, this.props.columns)
        }
    }
    render() {
        const { columns, ...config } = this.props
        return <Table {...config} columns={this.state.columns} bordered={true}></Table>
    }
    clone = (name) => {
        if (typeof name !== 'object') return name
        if (name === null) return null
        const isArray = Array.isArray(name)
        let arr = isArray ? [] : {}
        if (isArray) {
            for (let i = 0; i < name.length; i++) {
                arr[i] = this.clone(name[i])
            }
        } else {
            Object.keys(name).forEach(val => {
                arr[val] = this.clone(name[val])
            })
        }
        return arr
    }
}

export default DataTable
