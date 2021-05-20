import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Select } from 'antd'
const { Option } = Select

class DataForm extends React.Component{
    componentDidMount() {
        this.props.onRef && this.props.onRef(this)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form
                layout={this.props.layout}
                labelCol={{ span: this.props.labelWidth }}
                wrapperCol={{ span: this.props.wrapperWidth }}>
                {this.props.config.map((val, index) => {
                    return (
                        <Form.Item
                            style={{width: this.props.width,marginBottom: this.props.layout === 'horizontal' ? '10px' : 0}}
                            key={val.key}
                            label={val.label}
                            name={val.key}>
                            {(val.type === 'input' || val.type === 'password') ? 
                                getFieldDecorator(val.key, {
                                    rules: this.initRules(val.rules) || [],
                                    validateTrigger: 'onBlur',
                                    initialValue: val.value || ''
                                })(
                                    <Input style={{width: val.inputWidth || '100%'}} type={val.type === 'password' ? 'password' : 'text'} placeholder={val.placeholder || `请输入${val.label}`} />
                                ) : 
                            val.type === 'select' ?
                                getFieldDecorator(val.key, {
                                    rules: val.rules || [],
                                    initialValue: val.value || ''
                                })(
                                    <Select style={{width: val.inputWidth || '100%'}} placeholder={val.placeholder || `请输入${val.label}`}>
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
    initRules = (rules) => {
        if (Array.isArray(rules)) {
            return rules.map(val => {
                if (val === 'confirmPassword') {
                    val = { validator: this.compareToFirstPassword }
                }
                return val
            })
        } else {
            return rules
        }
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码输入不一致');
        } else {
          callback()
        }
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
    labelWidth: 5,
    wrapperWidth: 17,
    config: [],
}
DataForm.propTypes = {
    layout: PropTypes.string, // 布局方式 inline行内 horizontal块级
    labelWidth: PropTypes.number, // label宽度
    wrapperWidth: PropTypes.number, // 文本宽度
    config: PropTypes.array.isRequired, // 表格配置
    onRef: PropTypes.func, // 获取组件ref
}

export default Form.create()(DataForm)
