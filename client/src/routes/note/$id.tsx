import Header from '@/components/shared/note/header';
import NoteSection from '@/components/shared/note/note-section';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/note/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	return (
		<main className='min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-slate-900 to-slate-800 px-4'>
			<div className='w-full max-w-2xl bg-white/5 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/10'>
				<Header />
				<NoteSection noteId={id} />
			</div>
		</main>
	);
}
