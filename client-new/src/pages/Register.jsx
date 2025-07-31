import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <>
   

    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="display-4">🚚 Fuel Delivery App</h1>
        <p className="lead">Fast. Reliable. At Your Doorstep.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow rounded">
            <div className="card-body text-center">
              <h5 className="card-title">Need Fuel ?</h5>
              <p className="card-text">
                Order fuel from the comfort of your home or office. We’ll deliver it safely and quickly.
              </p>
              <Link to="/order">
                <button className="btn btn-primary btn-lg">Place Order</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
   </> 
  );
}

export default Home;
