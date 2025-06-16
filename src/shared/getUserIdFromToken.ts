import { jwtDecode } from 'jwt-decode';

type DecodeTokenResult = {
	userId?: number;
	username?: string;
};

export const getUserIdFromToken = (): DecodeTokenResult => {
	const token = localStorage.getItem('token');
	if (!token || token === 'undefined') {
		window.location.href = '/';
		return {};
	}

	const { userId, username } =
		decodeToken<DecodeTokenResult>(token!);
	return { userId: +userId!, username };
};

const decodeToken = <T>(token: string): T => {
	return jwtDecode(token);
};
