import { notesService } from '@/api/services/notes.service';
import { useStatesStore } from '@/store/states.store';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export const useCreateNote = () => {
	const { content, ttl, setContent, setTtl } = useStatesStore();
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
	return {
		ttl,
		link,
		setTtl,
		copied,
		content,
		setLink,
		setCopied,
		createNote,
		setContent,
	};
};
