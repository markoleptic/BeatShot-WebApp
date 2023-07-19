"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { emailValidates } from "../authfunctions";
import Link from "next/link";

const RecoverAccount = () => {
  // all variables for the form, and the functions that change them
  const [regMsg, setRegMsg] = useState("");
  const [successMsg, setSuccessMessage] = useState(false);
  const [regMsgClassName, setRegMsgClassName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    setValidEmail(emailValidates(email));
  }, [email]);

  // clear error message on username, password, email change
  useEffect(() => {
    setRegMsg("");
  }, [email]);

  const onResendEmailConfirmationClicked = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await fetch("/api/resendconfemail", {
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        method: "POST",
      });
      const data = await response.json();

      if (response.status == 200) {
        setSuccessMessage(true);
      }
      setRegMsg(data.message);
    } catch (err) {
      setSuccessMessage(false);
      setRegMsg("Recovery Failed.");
    }
  };

  const onSendPasswordRecoveryLinkClicked = async (e) => {
    // prevents default behavior of reloading the page
    e.preventDefault();
    // use try/catch for async/await
    try {
      const response = await fetch("/api/recoveraccount", {
        body: JSON.stringify({ email: email }),
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        method: "POST",
      });
      const data = await response.json();

      if (response.status == 200) {
        setSuccessMessage(true);
      }
      setRegMsg(data.message);
    } catch (err) {
      setSuccessMessage(false);
      setRegMsg("Register Failed");
    }
  };

  useEffect(() => {
    const handleRegisterMsg = () => {
      if (successMsg === true) {
        setRegMsgClassName("checkEmailMsg");
      } else if (regMsg !== "") {
        setRegMsgClassName("errmsg");
      } else {
        setRegMsgClassName("none");
      }
    };
    handleRegisterMsg();
  }, [regMsg, successMsg]);

  return (
    <>
      <div className="flex-container-column padding-1rem">
        <div className="form-container">
          <p className={regMsgClassName} aria-live="assertive">
            {regMsg}
          </p>
          <h2 className="form-title">Account Recovery</h2>
          <p className="fs-100 text-lightgrey text-center padding-bottom-05rem">
            Enter your email and a link to create a new password or confirm your email will be sent to you.
          </p>
          <form className="form">
            <div className="label-input-container">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                className="form-text"
                type="email"
                id="email"
                placeholder="icantaim@beatshot.gg"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <div
                id="emailnote"
                className={emailFocus && email && !validEmail ? "instructions-container" : "offscreen"}
              >
                <div className="instructions-icon-container">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <p>Must be a valid email.</p>
                </div>
              </div>
            </div>
            <button
              disabled={!validEmail ? true : false}
              className="button-recover margin-top-05rem"
              onClick={onSendPasswordRecoveryLinkClicked}
            >
              Send Password Recovery Link
            </button>
            <button
              disabled={!validEmail ? true : false}
              className="button-recover"
              onClick={onResendEmailConfirmationClicked}
            >
              Resend Email Confirmation Link
            </button>
            <Link className="link text-center text-white hover-blue fs-100 margin-top-05rem" href="/register">
              Don&#39;t have an account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RecoverAccount;
