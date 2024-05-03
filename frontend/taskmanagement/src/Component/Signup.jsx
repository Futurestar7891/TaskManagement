import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faEnvelope,
  faLock,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";

function Signup() {
  const navigate = useNavigate();
  const alert = useAlert();
  const [formData, setFormData] = useState({
    Email: "",
    Name: "",
    Mobile: "",
    Password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success == true) {
        alert.show(data.message);
        navigate("/");
      } else {
        alert.show(
          data.errors.map((err, idx) => {
            return <h6 key={idx}>{err.msg}</h6>;
          })
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setFormData({
      Name: "",
      Email: "",
      Password: "",
      Mobile: "",
    });
  };

  return (
    <div className="mainsigndiv">
      <section
        className="h-100 w-100"
        style={{ backgroundColor: "#eee", borderRadius: "25px" }}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100%">
            <div className="col-lg-12 col-xl-11">
              <div
                className="card text-black mt-1 mb-1"
                style={{ borderRadius: "25px" }}
              >
                <div className="card-body p-md-3">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <FontAwesomeIcon
                            icon={faUser}
                            className="fas fa-user fa-lg me-2 fa-fw mt-0"
                          />
                          <div className="form-outline flex-fill mb-1">
                            <input
                              type="text"
                              id="Name"
                              className="form-control"
                              value={formData.Name}
                              onChange={handleChange}
                              placeholder="Enter Name"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="fas fa-user fa-lg me-2 fa-fw mt-0"
                          />

                          <div className="form-outline flex-fill mb-1">
                            <input
                              type="text"
                              id="Email"
                              className="form-control"
                              value={formData.Email}
                              onChange={handleChange}
                              placeholder="Enter Email"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <FontAwesomeIcon
                            icon={faLock}
                            className="fas fa-user fa-lg me-2 fa-fw mt-0"
                          />
                          <div className="form-outline flex-fill mb-1">
                            <input
                              type="text"
                              id="Password"
                              className="form-control"
                              value={formData.Password}
                              onChange={handleChange}
                              placeholder="Enter Password"
                              required
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-1">
                          <FontAwesomeIcon
                            icon={faMobile}
                            className="fas fa-user fa-lg me-2 fa-fw mt-0"
                          />
                          <div className="form-outline flex-fill mb-1">
                            <input
                              type="text"
                              id="Mobile"
                              className="form-control"
                              value={formData.Mobile}
                              onChange={handleChange}
                              placeholder="Enter Mobile No."
                              required
                            />
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <p>
                            Already a User? <NavLink to="/">Log in</NavLink>
                          </p>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            value="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
