import React, { Component } from 'react'

export default class Uncontrolled extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    render() {
        let { data } = this.state;
        let submithandler = (e) => {
            e.preventDefault();
            let username = e.target.username.value
            let password = e.target.password.value
            console.log(username , password)
            this.setState({
                data: [...data, { username, password }]
            })
        }
        console.log(data)
        return (
            <div className='border p-3 w-100 min-h-100 d-flex flex-column gap-5 border justify-content-center align-items-center'>
                <form onSubmit={submithandler} className='w-100 p-5 border bg-info '>
                    <h1>Uncontrolled Component</h1>
                    <div className='mb-2 '>
                        <input type="text" name='username' />
                    </div>
                    <div className='mb-2 '>
                        <input type="text" name='password' />
                    </div>
                    <div className='mb-2 '>
                        <button>submit</button>
                    </div>
                </form>
                <div className='d-flex gap-3 border flex-wrap  justify-content-center align-items-center'>
                    {data.map((v, i) => (
                        <div key={i} className='p-3 bg-info'>
                            <p>Name:{v.username}</p>
                            <p>password:{v.password}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}
