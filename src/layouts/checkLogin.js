import React from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import { routerRedux } from 'dva'

class CheckLogin extends React.Component{
    state = {
        render: null
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({ type: 'login/getUserInfo' }).then(data => {
            if (data.success) {
                this.setState({
                    render: this.props.children
                })
            } else {
                message.warn(data.message)
                dispatch(routerRedux.replace('/login'))
            }
        })
    }
    render() {
        return this.state.render
    }
}

export default connect()(CheckLogin)
