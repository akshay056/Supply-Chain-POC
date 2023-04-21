function PaymentCards(props){
return (
    <>
      <div style={{ display: "flex" }} className="usercard">
        <div className="card text-dark bg-i mb-3" style={{ maxWidth: "22rem", }}>

          <div className="card-heade">

            <span className='nftsspan'>

              {/* {logo1 && <img className="nftimage" src={logo1} />} */}
            </span>
          </div>
          <div className="card-footer bg-transparent border-success">

            <div><h4 className="card-text" 
            // style={{textAlign:'center'}}
            >Total Shipments :</h4></div><br />

            {/* <h6 className="card-title">{accountAddress}</h6> */}
            <h2>{props.ordcount}</h2>

          </div>
        </div>
        <div className="card carduser2 card-user text-dar bg-info-2 mb-3" style={{ maxWidth: "22rem", marginLeft: "20px" }}>
          <div className="card-heade">
            <span className='nftsspan'>
              <i className='fa fa-users usersicon'></i>
              {/* {logo2 && <img className="nftimage" src={logo2} />} */}
            </span>
          </div>
          <div class="card-footer bg-transparent border-success">
            <div><h4 className="card-text">Pending Payment:</h4></div><br />
            {/* <h6 className="card-title">{accountBalance} ETH</h6> */}
            <h2>{props.inprogcount}</h2>
          </div>
        </div>
      </div>
    </>
  )
}
export default PaymentCards