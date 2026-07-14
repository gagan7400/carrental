import React, { Component } from 'react'

export default class Controlled extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "", pass: "",
      data: [
        { name: "raj1", pass: "jdwed" },
        { name: "raj2", pass: "jdwed" },
        { name: "raj3", pass: "jdwed" },
        { name: "raj4", pass: "jdwed" },
      ],
      isupdate: false,
      isupdateid: null
    }
  }

  render() {
    let { name, pass, data, isupdate, isupdateid } = this.state;
    let submithandler = (e) => {
      e.preventDefault();
      if (isupdate && isupdateid >= 0) {
        this.setState({
          data: data.map((v, i) => {
            if (i == isupdateid) {
              return { name, pass }
            } else {
              return v
            }
          }),
          isupdate: false, isupdateid: null,
        })
      } else {
        this.setState({ data: [...data, { name, pass, }] });
      }

    }

    let deletehandler = (index) => {
      let copy = data;
      copy.splice(index, 1)
      this.setState({ data: copy })
      //  this.setState({
      //   data : data.filter((v,i)=>{return i != index })
      //  })
    }
    let updatehander = (index) => {
      this.setState({ isupdate: true, isupdateid: index, name: data[index].name, pass: data[index].pass, })
    }
    return (
      <>
        <form onSubmit={submithandler}  >
          <input type="text" value={name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
          <input type="text" value={pass} onChange={(e) => { this.setState({ pass: e.target.value }) }} />
          <button>{isupdate ? "update" : "submit"}</button>
        </form>
        <div>
          {data.map((v, i) => (
            <div key={i} className='p-3 bg-info'>
              <p>Name:{v.name}</p>
              <p>password:{v.pass}</p>
              <button onClick={() => { deletehandler(i) }}>delete </button>
              <button onClick={() => { updatehander(i) }}>update  </button>
            </div>
          ))}
        </div>
      </>
    )
  }
}
