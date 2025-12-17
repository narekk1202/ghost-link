import { notesService } from '@/api/services/notes.service';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	const [content, setContent] = useState('');
	const [ttl, setTtl] = useState(86400); // default 24h
	const [link, setLink] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const createNote = useMutation({
		mutationFn: (vars: { content: string; ttl: number }) =>
			notesService.createNote(vars.content, vars.ttl),
		onSuccess: data => {
			if ('id' in data) {
				const noteUrl = `${window.location.origin}/note/${data.id}#${data.key}`;
				setLink(noteUrl);
				navigator.clipboard.writeText(noteUrl).then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 2000);
				});
				setContent('');
			}
		},
	});

	return (
		<main className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 px-4'>
			<div className='w-full max-w-lg bg-white/5 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/10'>
				<header className='mb-4 text-center'>
					<h1 className='text-3xl font-extrabold text-white'>
						Secure One‑Time Note
					</h1>
					<p className='mt-2 text-sm text-slate-300'>
						Create an encrypted note that self-destructs after it's read.
					</p>
				</header>

				<section className='mb-4'>
					<Textarea
						className='h-44 bg-white/5 text-white placeholder-slate-300 p-4 rounded-md'
						placeholder='Paste your secret here...'
						value={content}
						onChange={e => setContent(e.target.value)}
					/>
					<div className='mt-2 flex items-center justify-between text-sm text-slate-300'>
						<span>{content.length} characters</span>
						<div className='flex items-center gap-2'>
							<Select
								value={ttl.toString()}
								onValueChange={e => setTtl(Number(e))}
							>
								<SelectTrigger>
									<SelectValue placeholder='Expires in' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value='1800'>30 minutes</SelectItem>
										<SelectItem value='3600'>1 hour</SelectItem>
										<SelectItem value='21600'>6 hours</SelectItem>
										<SelectItem value='86400'>24 hours</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
				</section>

				<footer className='flex flex-col gap-3'>
					<div className='flex gap-3'>
						<Button
							onClick={() => createNote.mutate({ content, ttl })}
							disabled={!content || createNote.isPending}
							className='flex-1'
						>
							Create Secure Link
						</Button>
						<Button
							onClick={() => {
								setContent('');
								setLink(null);
							}}
							variant='ghost'
						>
							Clear
						</Button>
					</div>

					{link && (
						<div className='mt-2 bg-slate-900/60 p-3 rounded-md border border-white/5 flex items-center justify-between'>
							<div className='text-slate-200 break-all mr-4'>{link}</div>
							<div className='flex items-center gap-2'>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(link).then(() => {
											setCopied(true);
											setTimeout(() => setCopied(false), 2000);
										});
									}}
									className='text-sm text-indigo-500 bg-white/5 px-3 py-1 rounded-md'
								>
									{copied ? 'Copied' : 'Copy'}
								</Button>
							</div>
						</div>
					)}
				</footer>
			</div>
		</main>
	);
}

export default Index;
