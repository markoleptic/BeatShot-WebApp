"use client";
// Send to this endpoint from email letting them change password

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { passwordValidates, emailValidates } from "@/util/AuthFunctions";
import Link from "next/link";
import { TokenParams } from "@/types/Interfaces";

const ChangePassword = ({ params }: TokenParams) => {
	const token = params.token;

	// all variables for the form, and the functions that change them
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [passwordMatch, setPasswordMatch] = useState("");
	const [validPasswordMatch, setValidPasswordMatch] = useState(false);
	const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

	const [checkEmailMsg, setCheckEmailMsg] = useState(false);
	const [regMsg, setRegMsg] = useState("");
	const [regMsgClassName, setRegMsgClassName] = useState("");

	// clear error message on username, password, email, or passwordMatch change
	useEffect(() => {
		if (checkEmailMsg === false) {
			setRegMsg("");
		}
	}, [password, email, passwordMatch, checkEmailMsg]);

	useEffect(() => {
		setValidPassword(passwordValidates(password));
		const match = password === passwordMatch;
		setValidPasswordMatch(match);
	}, [password, passwordMatch]);

	useEffect(() => {
		setValidEmail(emailValidates(email));
	}, [email]);

	// called when the Save button is clicked
	const onNewPasswordSubmitted = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/changepassword/${token}`, {
				body: JSON.stringify({ email: email, password: password }),
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				method: "POST",
			});
			const data = await response.json();
			//clear the form if no errors have been caught
			if (response.status == 200) {
				setPassword("");
				setEmail("");
				setPasswordMatch("");
				setCheckEmailMsg(true);
				setRegMsg(data.message);
			} else {
				setRegMsg(data.message);
			}
		} catch (err) {
			setCheckEmailMsg(false);
			setRegMsg("Server Error.");
			console.log(err);
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
		<div className="flex-container-column padding-1rem">
			<div className="form-container">
				<p className={regMsgClassName} aria-live="assertive">
					{regMsg}
				</p>
				<h2 className="form-title">Password Change</h2>
				<form className="form" onSubmit={onNewPasswordSubmitted}>
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
								<p> Must be a valid email.</p>
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
					<button disabled={!validPassword || !validEmail || !validPasswordMatch ? true : false}>Save</button>
					<Link className="link text-center text-white hover-blue fs-100" href="/login">
						Back to Login
					</Link>
				</form>
			</div>
		</div>
	);
};

export default ChangePassword;
