export const fetcher =
	(url: string, param?: string | number) => async () => {
		const response = await fetch(`${url}/${param ?? ''}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${localStorage.getItem(
					'token'
				)}`,
			},
		}).then((res) => res.json());
		if (response.statusCode === 401) {
			localStorage.removeItem('token');
			window.location.href = '/';
			return;
		}
		return response;
	};
