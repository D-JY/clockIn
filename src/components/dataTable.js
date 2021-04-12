import React from 'react'
import { Table, Button } from 'antd'
import moment from 'moment'

class DataTable extends React.Component{
    constructor(props) {
        super(props)
        if (Object.prototype.toString.call(this.props.columns) === '[object Array]') {
            let arr = this.clone(this.props.columns)
            Array.isArray(arr) && arr.map(val => {
                if (Array.isArray(val.dataIndex) && val.type === 'Date') {
                    val.render = (text, record) => {
                        return `${moment(record[val.dataIndex[0]]).format('YYYY-MM-DD')} ${record[val.dataIndex[1]]}`
                    }
                }
                return val
            })
            arr.push({ title: '操作', key: 'caozuo', width: '200px', render: (text, record, index) => {
                return (
                    <div>
                        <Button type="primary" size="small" icon="edit">编辑</Button>
                        <Button type="danger" size="small" icon="delete" style={{marginLeft: '5px'}}>删除</Button>
                    </div>
                )
            } })
            this.state = {
                columns: arr
            }
        }
    }
    render() {
        let { columns, dataSource, ...config } = this.props
        Array.isArray(dataSource) && dataSource.map((val, index) => {
            val.key = index
            return val
        })
        return <Table {...config} dataSource={dataSource} columns={this.state.columns} bordered={true}></Table>
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
