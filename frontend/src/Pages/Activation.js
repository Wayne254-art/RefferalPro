import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/activation.css";
import axios from "axios";
import { server } from "../config/serverapi";

const Activation = () => {
  const { token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/auth/activate`, {
            token,
          });
          console.log(res.data.message);
          setError(false)
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [token]);

  return (
    <div className="activation-body">
      <div className="activation-container">
        {error ? (
          <>
            <p className="error-message">This link is expired or invalid.</p>
          </>
        ) : (
          <>
            <h1>Account Verified!</h1>
            <p>
              Congratulations 🎉, your account has been successfully verified.
            </p>
            <p>Here are your next steps:</p>
            <div className="steps">
              <ol>
                <li>Check your email for login credentials.</li>
                <li>Set up your account activation by making a payment.</li>
                <li>
                  Explore our features and get started with your first task.
                </li>
              </ol>
            </div>

            <button onClick={() => navigate("/Login")} className="btn">
              Proceed
            </button>
            <p>
              If you have any questions, feel free to{" "}
              <button
                onClick={() => navigate("/contact")}
                className="link-button"
              >
                contact us
              </button>
              .
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Activation;
