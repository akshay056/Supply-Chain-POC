function PaymentCards(props) {
  return (
    <>
      <div style={{ display: "flex" }} className="usercard2">
        <div className="card text-dark bg-i mb-3" style={{ maxWidth: "22rem", }}>
          <div className="card-heade">
            <span className='cardspan'>
            </span>
          </div>
          <div className="card-footer bg-transparent border-success">
            <div><h4 className="card-text"
            >Total Shipments :</h4></div><br />
            <h2>{props.ordcount}</h2>
          </div>
        </div>
        <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "22rem", marginLeft: "20px" }}>
          <div className="card-heade">
            <span className='cardspan'>
              <i className='fa fa-users usersicon'></i>
            </span>
          </div>
          <div class="card-footer bg-transparent border-success">
            <div><h4 className="card-text">Pending Payment:</h4></div><br />
            <h2>{props.inprogcount}</h2>
          </div>
        </div>
      </div>
    </>
  )
}
export default PaymentCards