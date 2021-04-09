import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
const { Option } = Select

class DataForm extends React.Component{
    componentDidMount() {
        this.props.onRef(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form
                layout={this.props.layout}
                labelCol={{span: this.props.labelWidth, offset: 0 }}>
                {this.props.config.map((val, index) => {
                    return (
                        <Form.Item
                            key={val.key}
                            label={val.label}
                            name={val.key}
                            labelCol={{span: val.labelWidth, offset: 0 }}
                        >
                            {val.type === 'input' ? 
                                getFieldDecorator(val.key, {
                                    rules: val.rules || [],
                                    initialValue: val.value || ''
                                })(
                                    <Input placeholder={val.placeholder || `请输入${val.label}`} />
                                ) : 
                            val.type === 'select' ?
                                getFieldDecorator(val.key, {
                                    rules: val.rules || [],
                                    initialValue: val.value || ''
                                })(
                                    <Select style={{width: val.inputWidth}} placeholder={val.placeholder || `请输入${val.label}`}>
                                        {Array.isArray(val.options) && val.options.map(v => <Option key={v.value} value={v.value}>{v.label}</Option>)}
                                    </Select>
                                ) :
                            <></>
                            }
                        </Form.Item>
                    )
                })}
            </Form>
        )
    }
    getVal = () => {
        return new Promise((reslove, reject) => {
            this.props.form.validateFields((err, values) => {
                !err && reslove(values)
            })
        })
    }
}
DataForm.defaultProps = {
    layout: 'inline',
    labelWidth: 3,
    config: [],
}
DataForm.propTypes = {
    layout: PropTypes.string, // 布局方式 inline行内 horizontal块级
    labelWidth: PropTypes.number, // label宽度
    config: PropTypes.array.isRequired, // 表格配置
    onRef: PropTypes.func, // 获取组件ref
}

export default Form.create()(DataForm)
