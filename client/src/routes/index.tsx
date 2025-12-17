import { notesService } from '@/api/services/notes.service';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	const [content, setContent] = useState('');

	const createNote = useMutation({
		mutationFn: () => notesService.createNote(content),
		onSuccess: data => {
			if ('id' in data) {
				const noteUrl = `${window.location.origin}/note/${data.id}#${data.key}`;
				navigator.clipboard.writeText(noteUrl);
				alert(`Note created! Link copied to clipboard:\n${noteUrl}`);
				setContent('');
			}
		},
	});

	return (
		<main className='max-w-7xl mx-auto min-h-screen flex flex-col items-center justify-center'>
			<div className='max-w-96 w-full flex flex-col items-center gap-2'>
				<h1 className='text-2xl font-semibold'>Create New Note</h1>
				<Textarea
					className='h-52'
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<Button
					onClick={() => createNote.mutate()}
					disabled={!content || createNote.isPending}
				>
					Get Note Link
				</Button>
			</div>
		</main>
	);
}

export default Index;
