import { Button } from '@/components/ui/button';
import { useCreateNote } from '@/hooks/use-create-note';

const Footer = () => {
	const {
		ttl,
		content,
		setContent,
		link,
		setLink,
		copied,
		setCopied,
		createNote,
	} = useCreateNote();

	const handleClickCopy = () => {
		if (!link) return;

		navigator.clipboard.writeText(link).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
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
							onClick={handleClickCopy}
							className='text-sm text-indigo-500 bg-white/5 px-3 py-1 rounded-md'
						>
							{copied ? 'Copied' : 'Copy'}
						</Button>
					</div>
				</div>
			)}
		</footer>
	);
};

export default Footer;
