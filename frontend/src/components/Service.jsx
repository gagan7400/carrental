import React, { Component } from 'react'

export default class Service extends Component {
    constructor() {
        super();
        console.log("constructor")
        this.state = {
            price: 3000, name: "raj",
            data: [
                "raj", "raman", "naman", "elon", "john"
            ]
        }
        // state is a mutable variable , which is used to store
        // the data of our components and whenever the state the update our components is rerender , 
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchusers, getusers } from '../redux/store'

// export default function Service() {
//     let dispatch = useDispatch();
//     return (
//         <div>
//             <p>Service Component</p>
//             <button onClick={() => { dispatch(fetchusers()) }}>fetch users</button>
//             <button onClick={() => { dispatch(getusers()) }}>getusers</button>
//         </div>
//     )
// }
