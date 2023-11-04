import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import URL from "../../ConnectionServer";
import { toast } from "react-toastify";

function HomePage({ cookies, setCookie }) {
  const [login, setLogin] = useState({});
  // Accessing the history instance created by React
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = login.email;
    const password = login.password;
    try {
      const response = await axios.post(
        `${URL}/authentication/api/auth/login`,
        { email, password }
      );
      const user = response.data.user[0];
      const token = response.data.token;
      console.log(response.status);
      if (!response || response.data.status === "false") {
        toast.error(response.data.message);
      } else if (response.status === 400) {
        const errorMessage = response.data.message;
        console.log(`Bad Request: ${errorMessage}`);
        toast.error(errorMessage);
      } else {
        toast.success("Success");
        setCookie('user',user, { path: "/", httpOnly: true });
        setCookie('token',token, { path: "/", httpOnly: true });
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log(error, "Server error");
    }
  };

  return (
    <Layout>
      <div className="container-fluid homepage m-3 text-center">
        <div className="row">
          <div className="col-md-6 login-form">
            <div className="mb-3 ">
              <h1>Login</h1>
              {/* <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label> */}
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
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
                name="password"
                onChange={handleChange}
                placeholder="Enter Password"
              />
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <div className="col-md-6 carousel">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/images/loginPage Img1.jpg"
                    className="d-block w-100 "
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/loginPage Img2.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/loginPage Img1.jpg"
                    className="d-block w-100"
                    alt="..."
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
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
