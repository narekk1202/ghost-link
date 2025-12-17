import { notesService } from '@/api/services/notes.service';
import Header from '@/components/shared/note/header'
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/note/$id')({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const initialKey = window.location.hash.slice(1);

	const [content, setContent] = useState('');
	const [key, setKey] = useState(initialKey);
	const [error, setError] = useState('');
	const [isDecrypting, setIsDecrypting] = useState(false);
	const [copied, setCopied] = useState(false);

	const { data: note, isLoading } = useQuery({
		queryKey: ['note', id],
		queryFn: () => notesService.getNote(id),
		refetchOnWindowFocus: false,
		retry: false,
	});

	useEffect(() => {
		if (note && key) {
			Promise.resolve().then(() => {
				setError('');
				setIsDecrypting(true);
				setContent('');
			});
			notesService
				.decryptNote(note.encryptedContent, key)
				.then(decrypted => setContent(decrypted))
				.catch(() => setError('Invalid key or failed to decrypt'))
				.finally(() => setIsDecrypting(false));
		}
	}, [note, key]);

	return (
		<main className='min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-slate-900 to-slate-800 px-4'>
			<div className='w-full max-w-2xl bg-white/5 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/10'>
				<Header />

				<section>
					{isLoading ? (
						<div className='text-center text-slate-300 font-semibold'>
							Loading...
						</div>
					) : !note ? (
						<div className='text-center text-red-400 font-bold'>
							Note not found or has expired
						</div>
					) : (
						<>
							{!key && (
								<div className='mb-4 flex gap-2'>
									<input
										placeholder='Enter key from link (#...)'
										className='flex-1 rounded-md p-2 bg-white/3 text-white'
										value={key}
										onChange={e => setKey(e.target.value)}
									/>
									<button
										onClick={() => setKey(key.trim())}
										className='text-indigo-500 bg-white/5 px-3 py-1 rounded-md'
									>
										Unlock
									</button>
								</div>
							)}

							{isDecrypting ? (
								<div className='text-slate-300 font-medium'>Decrypting…</div>
							) : error ? (
								<div className='text-red-400 font-semibold'>{error}</div>
							) : (
								<div>
									<pre className='whitespace-pre-wrap bg-slate-900/60 text-slate-100 rounded-md p-4 border border-white/5'>
										{content}
									</pre>
									{content && (
										<div className='mt-3 flex justify-end'>
											<button
												onClick={() => {
													navigator.clipboard.writeText(content).then(() => {
														setCopied(true);
														setTimeout(() => setCopied(false), 2000);
													});
												}}
												className='text-sm text-indigo-400 bg-white/5 px-3 py-1 rounded-md'
											>
												{copied ? 'Copied' : 'Copy'}
											</button>
										</div>
									)}
								</div>
							)}
						</>
					)}
				</section>
			</div>
		</main>
	);
}
