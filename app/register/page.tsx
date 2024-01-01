"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { passwordValidates, usernameValidates, emailValidates } from "../authfunctions";
import Link from "next/link";
import SteamSignIn from "@/components/SteamSignIn";

const Register = () => {
	// all variables for the form, and the functions that change them
	const [username, setUsername] = useState<string>("");
	const [validUsername, setValidUsername] = useState<boolean>(false);
	const [usernameFocus, setUsernameFocus] = useState<boolean>(false);

	const [password, setPassword] = useState<string>("");
	const [validPassword, setValidPassword] = useState<boolean>(false);
	const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState<boolean>(false);
	const [emailFocus, setEmailFocus] = useState<boolean>(false);

	const [passwordMatch, setPasswordMatch] = useState<string>("");
	const [validPasswordMatch, setValidPasswordMatch] = useState<boolean>(false);
	const [passwordMatchFocus, setPasswordMatchFocus] = useState<boolean>(false);

	const [checkEmailMsg, setCheckEmailMsg] = useState<boolean>(false);
	const [regMsg, setRegMsg] = useState<string>("");
	const [regMsgClassName, setRegMsgClassName] = useState<string>("");

	// clear error message on username, password, email, or passwordMatch change
	useEffect(() => {
		if (checkEmailMsg === false) {
			setRegMsg("");
		}
	}, [username, password, email, passwordMatch, checkEmailMsg]);

	useEffect(() => {
		const validationResult = usernameValidates(username);
		setValidUsername(validationResult);
	}, [username]);

	useEffect(() => {
		const validationResult = passwordValidates(password);
		setValidPassword(validationResult);
		const match = password === passwordMatch;
		setValidPasswordMatch(match);
	}, [password, passwordMatch]);

	useEffect(() => {
		const validationResult = emailValidates(email);
		setValidEmail(validationResult);
	}, [email]);

	// called when the Sign Up button is clicked
	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		// prevents default behavior of reloading the page
		e.preventDefault();
		// use try/catch for async/await
		try {
			const response = await fetch("/api/register", {
				body: JSON.stringify({
					username: username,
					email: email,
					password: password,
				}),
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				method: "POST",
			});
			const data = await response.json();

			//clear the form if no errors have been caught
			if (response.status === 200) {
				setUsername("");
				setPassword("");
				setEmail("");
				setPasswordMatch("");
				setCheckEmailMsg(true);
				setRegMsg(data.message);
			} else if (response.status >= 500) {
				setRegMsg("Register Failed.");
			} else {
				setRegMsg(data.message);
			}
		} catch (err) {
			setCheckEmailMsg(false);
			setRegMsg("Register Failed.");
		}
	};

	useEffect(() => {
		const handleRegisterMsg = () => {
			if (checkEmailMsg === true) {
				setRegMsgClassName("checkEmailMsg");
			} else if (regMsg !== "") {
				setRegMsgClassName("errmsg");
			} else {
				setRegMsgClassName("none");
			}
		};
		handleRegisterMsg();
	}, [regMsg, checkEmailMsg]);

	const getUsernameClassName = () => {
		if (username.length === 0) return "hide";
		return validUsername ? "valid" : "invalid";
	};

	const getEmailClassName = () => {
		if (email.length === 0) return "hide";
		return validEmail ? "valid" : "invalid";
	};

	const getPasswordClassName = () => {
		if (password.length === 0) return "hide";
		return validPassword ? "valid" : "invalid";
	};

	const getPasswordMatchClassName = () => {
		if (passwordMatch.length === 0) return "hide";
		return validPassword && validPasswordMatch ? "valid" : "invalid";
	};

	return (
		<>
			<div className="flex-container-column padding-1rem">
				<div className="form-container padding-1rem">
					<p className={regMsgClassName} aria-live="assertive">
						{regMsg}
					</p>
					<h2 className="form-title">Create an Account</h2>
					<p className="fs-100 text-lightgrey">
						Automatically save your scores in the cloud and gain access to visual analysis of every aspect
						of your play.
					</p>
					<p className="fs-100 fw-semibold text-center text-light padding-top-05rem">
						Logging in with Steam is now the preferred register method.
					</p>
					<SteamSignIn />
					<form className="form" onSubmit={handleRegister}>
						<p className="fs-100 text-light text-center padding-top-05rem">
							Alternatively, use username and email:
						</p>
						<div className="label-input-container">
							<label className="form-label" htmlFor="username">
								Username:
								<FontAwesomeIcon
									icon={validUsername ? faSquareCheck : faSquareXmark}
									className={getUsernameClassName()}
								/>
							</label>
							<input
								className="form-text"
								type="text"
								id="username"
								autoComplete="off"
								onChange={(e) => setUsername(e.target.value)}
								required
								aria-invalid={validUsername ? "false" : "true"}
								aria-describedby="uidnote"
								onFocus={() => setUsernameFocus(true)}
								onBlur={() => setUsernameFocus(false)}
							/>
							<div
								id="uidnote"
								className={
									usernameFocus && username && !validUsername ? "instructions-container" : "offscreen"
								}
							>
								<div className="instructions-icon-container">
									<FontAwesomeIcon icon={faInfoCircle} />
									<p>4 to 24 characters.</p>
								</div>
							</div>
						</div>

						<div className="label-input-container">
							<label className="form-label" htmlFor="email">
								Email:
								<FontAwesomeIcon
									icon={validEmail ? faSquareCheck : faSquareXmark}
									className={getEmailClassName()}
								/>
							</label>
							<input
								className="form-text"
								type="email"
								id="email"
								placeholder="icantaim@beatshot.gg"
								autoComplete="off"
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

						<div className="label-input-container">
							<label className="form-label" htmlFor="password">
								Password:
								<FontAwesomeIcon
									icon={validPassword ? faSquareCheck : faSquareXmark}
									className={getPasswordClassName()}
								/>
							</label>
							<input
								className="form-text"
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								required
								aria-invalid={validPassword ? "false" : "true"}
								aria-describedby="pwdnote"
								onFocus={() => setPasswordFocus(true)}
								onBlur={() => setPasswordFocus(false)}
							/>
							<div
								id="pwdnote"
								className={passwordFocus && !validPassword ? "instructions-container" : "offscreen"}
							>
								<div className="instructions-icon-container">
									<FontAwesomeIcon icon={faInfoCircle} />
									<p>8 to 24 characters. Must include 3/4:</p>
								</div>
								<p>uppercase, lowercase, number, symbol</p>
							</div>
						</div>

						<div className="label-input-container">
							<label className="form-label" htmlFor="passwordMatch">
								Re-enter Password:
								<FontAwesomeIcon
									icon={validPasswordMatch && validPassword ? faSquareCheck : faSquareXmark}
									className={getPasswordMatchClassName()}
								/>
							</label>
							<input
								className="form-text"
								type="password"
								id="passwordMatch"
								onChange={(e) => setPasswordMatch(e.target.value)}
								value={passwordMatch}
								required
								aria-invalid={validPasswordMatch ? "false" : "true"}
								aria-describedby="confirmnote"
								onFocus={() => setPasswordMatchFocus(true)}
								onBlur={() => setPasswordMatchFocus(false)}
							/>
							<div
								id="confirmnote"
								className={
									passwordMatchFocus && !validPasswordMatch ? "instructions-container" : "offscreen"
								}
							>
								<div className="instructions-icon-container">
									<FontAwesomeIcon icon={faInfoCircle} />
									<p>Must match</p>
								</div>
							</div>
						</div>
						<button
							disabled={
								!validUsername || !validPassword || !validEmail || !validPasswordMatch ? true : false
							}
						>
							Sign Up
						</button>
						<Link className="link text-center text-white hover-blue fs-100" href="/login">
							Already have an account?
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Register;
