export default function Card({ imgurl = "img/hero.png", title = "hello", body = "good", fun }) {
    return (
        <div style={{ width: "200px", height: "200px", padding: "10px", border: "solid" }}>
            <img style={{ width: "50px", height: "50px" }} src={imgurl} alt="" />
            <p>title:{title}</p>
            <p>body:{body}</p>
            <button onClick={() => { fun(title) }}>More details</button>
        </div>
    )
}
