import { User } from '../../components/user/User';
import useSWR from 'swr';
import { fetcher } from '../../shared/fetcher';
import { userUrl } from '../../shared/constants';
import { AdminPage } from './admin-page';
import { getUserIdFromToken } from '../../shared/getUserIdFromToken';

export const AdminPageWrapper: React.FC = () => {
	const { userId, username } = getUserIdFromToken();
	const { data, error, isLoading } = useSWR(
		'/api/user',
		fetcher(userUrl, userId!),
		{
			revalidateOnFocus: false,
		}
	);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<>
			<User
				name={data.name}
				username={data.username}
				email={data.email}
			/>
			<AdminPage userId={userId!} username={username!} />
		</>
	);
};
