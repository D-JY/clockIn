import React from 'react'
import { withRouter } from 'react-router-dom'

class Not extends React.Component {
    componentDidMount() {
        console.log(222)
        const { history } = this.props
        history.replace('/404')
    }
    render() {
        return (
            <div>22222222222</div>
        )
    }
}

export default withRouter(Not)
