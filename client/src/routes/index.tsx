import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<main className='max-w-7xl min-h-screen flex items-center justify-center'></main>
	);
}

export default Index;
