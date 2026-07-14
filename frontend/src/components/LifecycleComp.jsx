import React, { Component } from 'react'

export default class LifecycleComp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "raj", count: 0
        }
        console.log("constructor")
    }

    render() {
        console.log('render')
        let { name, count } = this.state;
        return (
            <div className='border m-3 p-3 vh-100'>
                <p>LifecycleComp count :{count}</p>
                <button onClick={() => {
                    this.forceUpdate()
                }}>force</button>
                <button onClick={() => { this.setState({ count: count + 1 }) }}>uff</button>
            </div>
        )
    }
    componentDidMount() {
        console.log("componentDidMount")
    }
    shouldComponentUpdate(newprop, newstate) {
        console.log("shouldComponentUpdate", newprop, newstate);
        if (newstate.count <= 10) {
            return true
        }
        return false
    }
    componentDidUpdate(oldprop, oldstate) {
        console.log("componentDidUpdate", oldprop, oldstate)
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
        console.clear()
    }
}
