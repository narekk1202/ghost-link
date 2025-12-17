import { notesService } from '@/api/services/notes.service';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/note/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const key = window.location.hash.slice(1);

	const [content, setContent] = useState('');

	const { data: note, isLoading } = useQuery({
		queryKey: ['note', id],
		queryFn: () => notesService.getNote(id),
	});

	useEffect(() => {
		if (note) {
			notesService.decryptNote(note.encryptedContent, key).then(setContent);
		}
	}, [note, key]);


	return (
		<main className='max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center'>
			<div className='max-w-96 w-full flex flex-col items-center gap-2'>
				<h1 className='text-2xl font-semibold'>View Note</h1>
				<p>{isLoading ? 'Loading...' : content}</p>
			</div>
		</main>
	);
}
