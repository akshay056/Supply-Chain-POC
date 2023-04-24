import './ManufacturerCard.css';

function Card(props) {
    return (
        <>
            <div style={{ display: "flex" }} className="usercard1">
                <div className="card text-dark bg-i mb-3" style={{ maxWidth: "18rem",marginLeft: "20px" }}>
                    <div className="card-heade">
                    <span className='usersspan'>
                        </span>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                        <p className="card-text1">Order Placed</p>
                        <p className="card-text1">{props.ordercount}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;