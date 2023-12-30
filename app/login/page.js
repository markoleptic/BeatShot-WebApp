"use client";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../components/Auth/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck, faSquare } from "@fortawesome/free-solid-svg-icons";
import SteamSignIn from "@/components/SteamSignIn";
import { passwordValidates, usernameValidates, emailValidates } from "../authfunctions";

const Login = () => {
	const { setAuth, setPersist } = useAuthContext();
	let navigate = useRouter();

	// all variables for the form, and the functions that change them
	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [steamRedirectURL, setSteamRedirectURL] = useState("");

	const [errMsg, setErrMsg] = useState("");
	const [checked, setChecked] = useState(true);

	// clear error message on username, password, email, or passwordMatch change
	useEffect(() => {
		setErrMsg("");
	}, [username, password, email]);

	useEffect(() => {
		setValidUsername(usernameValidates(username));
	}, [username]);

	useEffect(() => {
		setValidPassword(passwordValidates(password));
	}, [password]);

	useEffect(() => {
		setValidEmail(emailValidates(email));
	}, [email]);

	// called when the Login button is clicked
	const handleLogin = async (e) => {
		// prevents default behavior of reloading the page
		e.preventDefault();
		// use try/catch for async/await
		try {
			const response = await fetch("/api/login", {
				body: JSON.stringify({
					username: username,
					email: email,
					password: password,
				}),
				headers: { "Content-Type": "application/json" },
				withCredentials: true,
				method: "POST",
			});
			const data = await response.json();

			//clear the form if no errors have been caught
			if (response.status === 200) {
				setAuth({
					userID: data.userID,
					displayName: data?.displayName,
					accessToken: data.accessToken,
				});
				setUsername("");
				setEmail("");
				setPassword("");
				navigate.push(`/profile/${data.userID}/stats/overview`);
			} else {
				setAuth(null);
				setErrMsg(data.message);
			}
		} catch (err) {
			setErrMsg("Login Failed");
			setAuth(null);
			console.log(err);
		}
	};

	const onPersistClicked = (e) => {
		setChecked(!checked);
	};

	useEffect(() => {
		setPersist(checked);
		localStorage.setItem("persist", checked);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checked]);

	return (
		<>
			<div className="flex-container-column padding-1rem">
				<div className="form-container">
					<p className={errMsg ? "errmsg" : "hide"} aria-live="assertive">
						{errMsg}
					</p>
					<h2 className="form-title">Sign In</h2>
					<p className="fs-100 text-lightgrey text-center padding-bottom-05rem">
						Automatically save your scores in the cloud and gain access to visual analysis of every aspect
						of your play.
					</p>
					<p className="fs-75 text-light text-center fw-semibold">
						Steam sign in is the preferred login method:
					</p>
					<SteamSignIn />
					<form className="form" onSubmit={handleLogin}>
						<p className="fs-75 text-light text-center padding-top-05rem">
							Alternatively, use username or email:
						</p>
						<div className="label-input-container">
							<label className="form-label" htmlFor="username">
								Username:
							</label>
							<input
								className="form-text"
								type="text"
								id="username"
								autoComplete="on"
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
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
							/>
						</div>
						<div className="label-input-container">
							<label className="form-label" htmlFor="password">
								Password:
							</label>
							<input
								className="form-text"
								type="password"
								id="password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
								required
							/>
						</div>
						<div className="persistCheck form-label text-white hover-blue" onClick={onPersistClicked}>
							<FontAwesomeIcon className="height-1em" icon={checked ? faSquareCheck : faSquare} />
							<p className="persistCheck">Trust This Device</p>
						</div>
						<button
							id="login-button"
							disabled={!validPassword || (!validEmail && !validUsername) ? true : false}
						>
							Login
						</button>
						<Link className="link text-center text-white hover-blue fs-100" href="/register">
							Don&#39;t have an account?
						</Link>
						<Link className="link text-center text-white hover-blue fs-100" href="/recover">
							Forgot Password or need another confirmation link?
						</Link>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
