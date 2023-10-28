import React from "react";
import Layout from "../Layout/Layout";

function HomePage() {
  return (
    <Layout>
      <div className="container-fluid homepage m-3 text-center">
        <div className="row">
          <div className="col-md-6 login-form">
            <form>
              <div className="mb-3 ">

                <h1>Login</h1>
                {/* <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label> */}
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder=" Enter Email address"
                />
              
              </div>
              <div className="mb-3">
                {/* <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label> */}
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                />
              </div>
           
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
          <div className="col-md-6 carousel">
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="/images/loginPage Img1.jpg" className="d-block w-100 "  alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/loginPage Img2.jpg" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="/images/loginPage Img1.jpg" className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
