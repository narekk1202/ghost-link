import Footer from '@/components/shared/home/footer'
import Header from '@/components/shared/home/header';
import TextareaSection from '@/components/shared/home/textarea-section';

import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: Index,
});

function Index() {
	return (
		<main className='min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-indigo-900 px-4'>
			<div className='w-full max-w-lg bg-white/5 backdrop-blur rounded-2xl shadow-2xl p-6 border border-white/10'>
				<Header />
				<TextareaSection />
				<Footer />
			</div>
		</main>
	);
}

export default Index;
