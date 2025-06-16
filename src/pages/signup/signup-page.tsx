import { toast } from 'react-toastify';
import './signup-page.css';
import { signupUrl } from '../../shared/constants';

export const SignUpPage = () => {
	const handleSignup = async () => {
		try {
			const name = (
				document.querySelector(
					'input[name="name"]'
				) as HTMLInputElement
			).value;
			if (!name) {
				alert('Name is required');
				return;
			}
			const username = (
				document.querySelector(
					'input[name="username"]'
				) as HTMLInputElement
			).value;
			if (!username) {
				alert('Username is required');
				return;
			}
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
			const response = await fetch(signupUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					username,
					email,
					password,
				}),
			}).then((res) => res.json());

			if (response.statusCode === 401) {
				toast.error(response.message);
				return;
			}
			window.location.href = '/';
		} catch (error) {
			console.error(error);
			toast.error('Login failed');
		}
	};

	const handleCancel = () => {
		window.location.href = '/';
	};

	return (
		<div className="signin_container">
			<h1>Create your account</h1>
			<div className="signin_inputs_container">
				<input
					name="name"
					type="text"
					placeholder="Name"
					required
				/>
				<input
					name="username"
					type="text"
					placeholder="Username"
					required
				/>
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
				<button onClick={handleSignup}>Signup</button>
				<button onClick={handleCancel}>Cancel</button>
			</div>
		</div>
	);
};
