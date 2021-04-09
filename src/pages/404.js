import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

class Not extends React.Component {
    render() {
        return (
            <Result
                status="404"
                title="404"
                subTitle="页面未找到"
                extra={<Button type="primary" onClick={this.back}>返回</Button>}
            />
        )
    }
    back = () => {
        const { history } = this.props
        history.go(-1)
    }
}

export default withRouter(Not)
