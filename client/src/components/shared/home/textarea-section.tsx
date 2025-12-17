import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateNote } from '@/hooks/use-create-note';

const TextareaSection = () => {
	const { ttl, content, setTtl, setContent } = useCreateNote();

	return (
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
					<Select value={ttl.toString()} onValueChange={e => setTtl(Number(e))}>
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
	);
};

export default TextareaSection;
