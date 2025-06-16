import { toast } from 'react-toastify';
import './link.css';
import { adminLinksManagementUrl } from '../../shared/constants';
import { useSWRConfig } from 'swr';
import { getUserIdFromToken } from '../../shared/getUserIdFromToken';

export type LinkProps = {
	id?: number;
	title: string;
	url: string;
	isEditing?: boolean;
	setEditingLinkId: React.Dispatch<
		React.SetStateAction<number | undefined>
	>;
};

export const Link: React.FC<LinkProps> = ({
	id,
	title,
	url,
	isEditing,
	setEditingLinkId,
}) => {
	const { mutate } = useSWRConfig();

	const handleClick = () => {
		window.open(
			url.includes('http') ? url : 'http://' + url,
			'_blank'
		);
	};

	const handleEditLink = async () => {
		try {
			const title = (
				document.querySelector(
					'input[name="titleEdit"]'
				) as HTMLInputElement
			).value;
			if (!title) {
				alert('Title is required');
				return;
			}
			const url = (
				document.querySelector(
					'input[name="urlEdit"]'
				) as HTMLInputElement
			).value;
			if (!url) {
				alert('URL is required');
				return;
			}

			const { userId } = getUserIdFromToken();
			const link = {
				title,
				url,
				userId,
			};

			const response = await fetch(
				`${adminLinksManagementUrl}/${id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
					body: JSON.stringify(link),
				}
			);
			if (response.status === 401) {
				localStorage.removeItem('token');
				window.location.href = '/';
				return;
			}
			if (response.status === 400) {
				toast.error('Error editing link.');
				return;
			}

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
			toast.success('Link successfully edited.');
			mutate('/api/links');
			setEditingLinkId(undefined);
		} catch (error) {
			toast.error('Error editing link.');
		}
	};

	const handleCancelLink = () => {
		setEditingLinkId(undefined);
	};

	return (
		<>
			{isEditing ? (
				<li className="edit_link">
					<div className="edit_link_inputs">
						<input
							name="titleEdit"
							type="text"
							placeholder="Link title"
							defaultValue={title}
							required
						/>
						<input
							name="urlEdit"
							type="text"
							placeholder="Link url"
							defaultValue={url}
							required
						/>
					</div>
					<div className="edit_buttons">
						<button onClick={handleEditLink}>Salvar</button>
						<button onClick={handleCancelLink}>
							Cancelar
						</button>
					</div>
				</li>
			) : (
				<li className="link" onClick={handleClick}>
					<h2>{title}</h2>
				</li>
			)}
		</>
	);
};
