import useSWR from 'swr';
import './App.css';
import { User } from './components/user/User';
import { userUrl } from './shared/constants';
import { LinksPage } from './pages/links/links-page';
import { fetcher } from './shared/fetcher';
import { useParams } from 'react-router';

function App() {
	const { username } = useParams();
	const { data, error, isLoading } = useSWR(
		'/api/user',
		fetcher(`${userUrl}/public`, username),
		{
			revalidateOnFocus: false,
		}
	);

	if (error) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	if (data.statusCode === 404) return <h1>Not found</h1>;

	return (
		<>
			<User
				name={data.name}
				username={data.username}
				email={data.email}
			/>
			{data.username ? (
				<LinksPage username={data.username} />
			) : null}
		</>
	);
}

export default App;
