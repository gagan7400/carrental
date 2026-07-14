import { Component } from 'react'
class About extends Component {
    render() {
        return (
            <div style={{ padding: "20px", border: "solid" }}>
                <p>name : {this.props.name}</p>
                <h1 className="about box"> Hello {this.props.title} page</h1>
            </div>
        )
    }
}
About.defaultProps = {
    title: "AboutDefault",
    name: "HarryDefault"
}
export default About;