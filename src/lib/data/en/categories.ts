/** English categories. Slugs are shared with ../categories.uk.ts */
import { categories as uk } from '../categories.uk.ts';
import type { Category, Sub } from '../types.ts';

type Text = Omit<Category, 'slug' | 'subs'> & { subs: Record<string, Omit<Sub, 'slug'>> };

const t: Record<string, Text> = {
	navushnyky: {
		name: 'Headphones',
		h1: 'Headphones',
		lead: 'Wireless, studio, gaming and in-ear headphones with an official warranty of up to 3 years.',
		seoTitle: 'Headphones — buy wireless headphones in Kyiv and across Ukraine | Hvylia',
		seoDescription:
			'Buy wireless headphones, noise-cancelling headphones and studio models with up to a 3-year warranty. Free delivery from 3,000 UAH, 30-day returns.',
		subs: {
			bezdrotovi: {
				name: 'Wireless',
				h1: 'Wireless earbuds',
				lead: 'True wireless earbuds with a case: no cables, noise cancelling and high-quality codecs.'
			},
			nakladni: {
				name: 'On-ear',
				h1: 'On-ear headphones',
				lead: 'Compact headphones that rest on your ears: light, foldable and great on the go.'
			},
			povnorozmirni: {
				name: 'Over-ear',
				h1: 'Over-ear headphones',
				lead: 'They fully enclose your ears — the best isolation and the widest soundstage.'
			},
			vnutrishnokanalni: {
				name: 'In-ear',
				h1: 'In-ear monitors',
				lead: 'Wired monitors for musicians and music lovers who value detail.'
			},
			ihrovi: {
				name: 'Gaming',
				h1: 'Gaming headsets',
				lead: 'Headsets with a microphone, low latency and positional audio.'
			}
		},
		seoText: [
			{
				title: 'How to choose headphones',
				paragraphs: [
					'Start with where you’ll listen. For the city and travel, wireless headphones with active noise cancelling are the most convenient: they remove transport rumble, so you can listen at lower volume and spare your hearing.',
					'For home and audio work, consider over-ear headphones — they give a wider soundstage and more accurate instruments. In-ear monitors isolate best and suit musicians on stage.'
				]
			},
			{
				title: 'Codecs and connections',
				paragraphs: [
					'If you use Android, look for LDAC or aptX Adaptive — they carry more data than basic SBC. On iPhone the main codec is AAC, and it sounds good on every model in our catalogue.',
					'Wired headphones with an impedance above 64 Ω are best driven by a separate DAC or amplifier, so they can show their full dynamics.'
				]
			}
		],
		faq: [
			{
				q: 'Which headphones are best for the metro and flights?',
				a: 'Wireless or over-ear models with active noise cancelling (ANC). They suppress low-frequency engine rumble and let you listen at lower volume.'
			},
			{
				q: 'Can I return headphones if they don’t suit me?',
				a: 'Yes, within 30 days if the box contents and condition are intact. In-ear models must be sealed for hygiene reasons.'
			},
			{
				q: 'What warranty do headphones have?',
				a: 'An official manufacturer warranty of 12 to 36 months — the exact period is shown on the product page.'
			}
		]
	},
	kolonky: {
		name: 'Speakers',
		h1: 'Speakers and hi-fi',
		lead: 'Portable speakers, bookshelf speakers, soundbars and smart speakers for the home.',
		seoTitle: 'Speakers: buy a portable speaker, bookshelf speakers | Hvylia',
		seoDescription:
			'Buy a portable speaker with delivery across Ukraine: waterproof models, bookshelf speakers, soundbars and smart speakers. Up to a 3-year warranty.',
		subs: {
			portatyvni: {
				name: 'Portable',
				h1: 'Portable speakers',
				lead: 'Battery-powered, waterproof speakers for hikes, the beach and the balcony.'
			},
			'polychna-akustyka': {
				name: 'Bookshelf speakers',
				h1: 'Bookshelf speakers',
				lead: 'Passive speakers for a hi-fi system with an amplifier or turntable.'
			},
			saundbary: {
				name: 'Soundbars',
				h1: 'Soundbars',
				lead: 'Immersive TV sound without extra cables.'
			},
			'rozumni-kolonky': {
				name: 'Smart speakers',
				h1: 'Smart speakers',
				lead: 'Speakers with Wi-Fi, voice control and multi-room.'
			}
		},
		seoText: [
			{
				title: 'Portable speaker or bookshelf speakers',
				paragraphs: [
					'A portable speaker is freedom: a battery, Bluetooth and water resistance. For a picnic or the shower, a 10–20 W model is plenty. If sound matters more than mobility, look at bookshelf speakers: a pair of passive speakers with an amplifier gives a stereo image no portable model can match.',
					'A soundbar solves one job — making TV sound clear and immersive. Smart speakers are handy for background music around the home.'
				]
			}
		],
		faq: [
			{
				q: 'What does IP67 mean on a portable speaker?',
				a: 'The speaker is fully dust-tight and survives immersion in water up to 1 m deep for 30 minutes.'
			},
			{
				q: 'Do bookshelf speakers need an amplifier?',
				a: 'Yes, passive speakers connect to an amplifier or receiver. Active models have an amplifier built in.'
			}
		]
	},
	vinil: {
		name: 'Vinyl',
		h1: 'Vinyl',
		lead: 'Turntables, records and everything to look after your collection.',
		seoTitle: 'Vinyl — turntables for beginners, records, accessories | Hvylia',
		seoDescription:
			'Turntables for beginners and seasoned collectors, 180 g records and care products. We’ll help you put together your first system.',
		subs: {
			prohravachi: {
				name: 'Turntables',
				h1: 'Turntables',
				lead: 'Belt-drive turntables with a built-in phono preamp and Bluetooth output.'
			},
			'vinilovi-plativky': {
				name: 'Vinyl records',
				h1: 'Vinyl records',
				lead: 'Ukrainian music on 180 g vinyl in limited runs.'
			},
			'aksesuary-dlia-vinilu': {
				name: 'Vinyl accessories',
				h1: 'Vinyl accessories',
				lead: 'Brushes, cleaning fluids and strobes for record care.'
			}
		},
		seoText: [
			{
				title: 'How to start listening to vinyl',
				paragraphs: [
					'For a first system, a turntable with a built-in phono preamp and a pair of active speakers — or passive ones with an amplifier — is enough. Belt-drive turntables are quieter and more stable than direct drive at the same price.',
					'Don’t skimp on care: an anti-static brush before every play and a wash every few months keep records and the stylus going for years.'
				]
			}
		],
		faq: [
			{
				q: 'What is a phono preamp and do I need one?',
				a: 'A phono preamp boosts the weak signal from the stylus to line level. If it’s built into the turntable (a Phono/Line switch), you can connect the turntable straight to active speakers.'
			},
			{
				q: 'How often should I replace the stylus?',
				a: 'An elliptical stylus roughly every 800–1,000 hours of listening.'
			}
		]
	},
	'pidsylyuvachi-ta-tsap': {
		name: 'Amplifiers & DACs',
		h1: 'Amplifiers and DACs',
		lead: 'Integrated amplifiers for hi-fi and DACs for headphones.',
		seoTitle: 'Amplifiers and DACs — buy a headphone amp or hi-fi amplifier | Hvylia',
		seoDescription:
			'Integrated amplifiers with phono stage and Bluetooth, portable headphone DACs. Official warranty up to 3 years and advice from an audio expert.',
		subs: {
			pidsylyuvachi: {
				name: 'Amplifiers',
				h1: 'Amplifiers',
				lead: 'Integrated amplifiers for bookshelf and floor-standing speakers.'
			},
			tsap: {
				name: 'DACs',
				h1: 'Headphone DACs',
				lead: 'Digital-to-analogue converters that bring out everything your headphones can do.'
			}
		},
		seoText: [
			{
				title: 'Why a separate DAC',
				paragraphs: [
					'The DAC built into a phone or laptop is designed for simple headphones. A portable DAC/amp gives more power, a lower noise floor and support for high-resolution files.',
					'An integrated amplifier is the heart of a stereo system: speakers, a turntable, a TV and a phone all connect to it.'
				]
			}
		],
		faq: [
			{
				q: 'Will a DAC work with an iPhone?',
				a: 'Yes, USB-C models connect directly to iPhone 15 and newer; older models need a Lightning–USB adapter.'
			}
		]
	},
	aksesuary: {
		name: 'Accessories',
		h1: 'Audio accessories',
		lead: 'Cables, ear pads and headphone stands.',
		seoTitle: 'Audio accessories — cables, ear pads, headphone stands | Hvylia',
		seoDescription:
			'Interconnect cables, replacement ear pads and headphone stands. Nova Poshta delivery across Ukraine.',
		subs: {
			kabeli: {
				name: 'Cables',
				h1: 'Audio cables',
				lead: 'Interconnect and speaker cables with double shielding.'
			},
			ambushury: {
				name: 'Ear pads',
				h1: 'Ear pads',
				lead: 'Replacement ear pads that bring back comfort and bass.'
			},
			pidstavky: {
				name: 'Stands',
				h1: 'Headphone stands',
				lead: 'Stands that protect the headband and look good on the desk.'
			}
		},
		seoText: [
			{
				title: 'Small things that matter',
				paragraphs: [
					'Worn ear pads change the sound: the seal breaks down and the bass disappears. Replacing them every year or two brings back the headphones’ factory character.',
					'A stand keeps the headband in shape, and a well-shielded cable gets rid of background hum.'
				]
			}
		],
		faq: [
			{
				q: 'How do I choose ear pads?',
				a: 'Measure the outer diameter of your old pads and check the mounting type. Our Ferro pads have an elastic base and fit most 90–105 mm models.'
			}
		]
	}
};

export const categories: Category[] = uk.map((c) => {
	const x = t[c.slug];
	return { ...c, ...x, subs: c.subs.map((s) => ({ ...s, ...x.subs[s.slug] })) };
});

export const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function findSub(category: string, sub: string) {
	return categoryBySlug.get(category)?.subs.find((s) => s.slug === sub);
}
