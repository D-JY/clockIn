import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button, message } from 'antd'
import moment from 'moment'

class DataTable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            total: 0,
            loading: false,
            page: 1,
            pageSize: 2
        }
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
            if (this.props.editFn || this.props.deleteFn) {
                arr.push({ title: '操作', key: 'caozuo', width: '200px', render: (text, record, index) => {
                    return (
                        <div>
                            {this.props.editFn && <Button type="primary" size="small" icon="edit" onClick={() => this.props.editFn(record)}>编辑</Button>}
                            {this.props.deleteFn && 
                                <Button
                                    type="danger"
                                    size="small"
                                    icon="delete"
                                    style={{marginLeft: this.props.editFn ? '5px': ''}}
                                    onClick={() => this.props.deleteFn(record)}>删除
                                </Button>}
                        </div>
                    )
                } })
            }
            this.state.columns = arr
        }
    }
    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
        this.getData()
    }
    render() {
        let { columns, dataSource, loading, pagination, ...config } = this.props
        return (
            <Table
                {...config}
                dataSource={this.state.dataSource}
                columns={this.state.columns}
                bordered={true}
                loading={this.state.loading}
                pagination={{
                    total: Number(this.state.total),
                    defaultPageSize: this.state.pageSize,
                    onChange: this.pageChange
                }}>
            </Table>
        )
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
    getData = () => {
        this.setState({ loading: true })
        const params = {
            ...this.props.search,
            page: this.state.page,
            pageSize: this.state.pageSize
        }
        this.props.getData && this.props.getData(params).then(data => {
            if (data.success) {
                Array.isArray(data.data) && data.data.map((val, index) => {
                    val.key = index
                    return val
                })
                this.setState({
                    dataSource: data.data,
                    total: data.count,
                    loading: false
                })
            } else {
                this.setState({ loading: false })
                message.error(data.message)
            }
        }).catch(() => this.setState({ loading: false }))
    }
    pageChange = (page, pageSize) => {
        this.setState({ page, pageSize }, () => this.getData())
    }
}

DataTable.propTypes = {
    getData: PropTypes.func.isRequired, // 请求数据方法，里面返回promise
    search: PropTypes.object, // 搜索数据
    editFn: PropTypes.func, // 编辑方法
    deleteFn: PropTypes.func, // 删除方法
}
export default DataTable
