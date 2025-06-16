import { toast } from 'react-toastify';
import './signin-page.css';
import { loginUrl } from '../../shared/constants';
import { useEffect } from 'react';

export const SignInPage = () => {
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			window.location.href = '/admin';
		}
	}, []);

	const handleLogin = async () => {
		try {
			const email = (
				document.querySelector(
					'input[name="email"]'
				) as HTMLInputElement
			).value;
			if (!email) {
				alert('E-mail is required');
				return;
			}
			const password = (
				document.querySelector(
					'input[name="password"]'
				) as HTMLInputElement
			).value;
			if (!password) {
				alert('Password is required');
				return;
			}
			const response = await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}).then((res) => res.json());
			if (!response.access_token) {
				console.error(response.message);
				toast.error('E-mail or password is invalid');
				return;
			}
			const { access_token } = response;
			localStorage.setItem('token', access_token);
			window.location.href = '/admin';
		} catch (error) {
			console.error(error);
			toast.error('Login failed');
		}
	};

	return (
		<div className="signin_container">
			<h1>Welcome to My Linktree</h1>
			<div className="signin_inputs_container">
				<input
					name="email"
					type="email"
					placeholder="E-mail"
					required
				/>
				<input
					name="password"
					type="password"
					placeholder="Password"
					required
				/>
				<button onClick={handleLogin}>Login</button>
				<a href="/signup">Sign-up</a>
			</div>
		</div>
	);
};
