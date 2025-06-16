import { toast } from 'react-toastify';
import { adminLinksManagementUrl } from '../../shared/constants';
import { LinksPage } from '../links/links-page';
import './admin-page.css';
import { useSWRConfig } from 'swr';

type AdminPageProps = {
	userId: number;
	username: string;
};

export const AdminPage: React.FC<AdminPageProps> = ({
	userId,
	username,
}) => {
	const { mutate } = useSWRConfig();

	const handleNewLink = async () => {
		const title = (
			document.querySelector(
				'input[name="title"]'
			) as HTMLInputElement
		).value;
		if (!title) {
			alert('Title is required');
			return;
		}
		const url = (
			document.querySelector(
				'input[name="url"]'
			) as HTMLInputElement
		).value;
		if (!url) {
			alert('URL is required');
			return;
		}
		const link = {
			title,
			url,
			userId,
		};

		const response = await fetch(adminLinksManagementUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem(
					'token'
				)}`,
			},
			body: JSON.stringify(link),
		});
		if (response.status === 401) {
			localStorage.removeItem('token');
			window.location.href = '/';
			return;
		}

		if (response.ok) {
			(
				document.querySelector(
					'input[name="title"]'
				) as HTMLInputElement
			).value = '';
			(
				document.querySelector(
					'input[name="url"]'
				) as HTMLInputElement
			).value = '';
			toast.success('Link successfully created.');
			mutate('/api/links');
		} else {
			toast.error('Error creating link.');
		}
	};

	return (
		<>
			<div className="new_link">
				<input
					name="title"
					type="text"
					placeholder="Link title"
					required
				/>
				<input
					name="url"
					type="text"
					placeholder="Link url"
					required
				/>
				<button onClick={handleNewLink}>Create link</button>
			</div>
			<LinksPage username={username!} isAdmin={true} />
		</>
	);
};
