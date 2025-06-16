type UserProps = {
	name: string;
	username: string;
	email: string;
};

export const User: React.FC<UserProps> = ({
	name,
	username,
	email,
}) => (
	<div>
		<h1>{name}</h1>
		<h2>{username}</h2>
		<h3>{email}</h3>
	</div>
);
