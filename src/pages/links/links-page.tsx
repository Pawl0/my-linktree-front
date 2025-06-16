import useSWR from 'swr';
import {
	Link,
	type LinkProps,
} from '../../components/link/Link';
import './links-page.css';
import {
	adminLinksManagementUrl,
	linksUrl,
} from '../../shared/constants';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { fetcher } from '../../shared/fetcher';

export type LinksPageProps = {
	username: string;
	isAdmin?: boolean;
};

export const LinksPage: React.FC<LinksPageProps> = ({
	username,
	isAdmin = false,
}) => {
	const [editingLinkId, setEditingLinkId] =
		useState<number>();
	const { data, error, isLoading, mutate } = useSWR(
		'/api/links',
		fetcher(linksUrl, username),
		{
			revalidateOnFocus: false,
		}
	);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	const handleDelete = async (linkId: number) => {
		try {
			const response = await fetch(
				`${adminLinksManagementUrl}/${linkId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							'token'
						)}`,
					},
				}
			).then((res) => res.json());
			if (response.statusCode === 401) {
				window.location.href = '/';
				return;
			}
			toast.success('Link deleted');
			mutate();
		} catch (error) {
			toast.error('Error deleting link');
		}
	};

	const toggleEdit = (linkId: number) => {
		setEditingLinkId(linkId);
	};

	const isEditing = (linkId: number): boolean =>
		editingLinkId === linkId;

	return (
		<ul className="container">
			{data.map((link: LinkProps) => (
				<div key={link.id} className="link_container">
					<Link
						id={link.id}
						title={link.title}
						url={link.url}
						isEditing={isEditing(link.id!)}
						setEditingLinkId={setEditingLinkId}
					/>
					{isAdmin && !isEditing(link.id!) && (
						<>
							<button onClick={() => toggleEdit(link.id!)}>
								Editar
							</button>
							<button
								onClick={() => handleDelete(link.id!)}
							>
								Deletar
							</button>
						</>
					)}
				</div>
			))}
		</ul>
	);
};
