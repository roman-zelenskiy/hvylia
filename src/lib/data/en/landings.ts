/** English SEO landing texts. Slugs and product presets are shared with ../landings.uk.ts */
import { landings as uk } from '../landings.uk.ts';
import type { Landing } from '../types.ts';

type Text = Pick<Landing, 'h1' | 'title' | 'description' | 'lead' | 'text' | 'faq'>;

const t: Record<string, Text> = {
	'z-shumopodavlenniam': {
		h1: 'Noise-cancelling headphones',
		title: 'Noise-cancelling (ANC) headphones — buy with warranty | Hvylia',
		description:
			'Noise-cancelling headphones: true wireless, on-ear and over-ear models with adaptive ANC. Comparisons, reviews and up to a 3-year warranty.',
		lead: 'Active noise cancelling removes the rumble of the metro, planes and offices — so you listen at lower volume and protect your hearing.',
		text: [
			{
				title: 'How ANC works',
				paragraphs: [
					'Microphones on the housing hear outside noise, and a processor generates a sound wave in the opposite phase. It works best on steady low sounds: engines, air conditioning, the hum of a train.',
					'Hybrid systems use microphones both outside and inside the cup, so they cancel a wider range and adapt to the fit.'
				]
			},
			{
				title: 'True wireless or over-ear',
				paragraphs: [
					'Noise-cancelling wireless earbuds take up minimal space and suit the city. Over-ear models deliver deeper silence thanks to the passive isolation of the ear pads — they’re the pick for flights and open-plan offices.'
				]
			}
		],
		faq: [
			{
				q: 'Is active noise cancelling harmful?',
				a: 'No. Some people feel slight “pressure” in their ears for the first few days — that’s adjustment, not a health effect.'
			},
			{
				q: 'Does ANC block voices?',
				a: 'Partly. Rumble and low frequencies are cancelled almost completely; voices become noticeably quieter, but not silent.'
			}
		]
	},
	'dlia-sportu': {
		h1: 'Sports headphones',
		title: 'Sports headphones — wireless and sweat-resistant | Hvylia',
		description:
			'Wireless headphones for running and the gym with IP67 and IPX4 protection, a secure fit and long battery life. Delivery across Ukraine.',
		lead: 'They stay in while you run, don’t mind sweat or rain and let you hear the street when you need to.',
		text: [
			{
				title: 'What to look for',
				paragraphs: [
					'Fit and protection come first. Ear hooks or wings keep the earbud in place when you jump, and IPX4 or higher protects against sweat. IP67 can even handle rain and immersion.',
					'Transparency or “street” mode amplifies outside sounds so you can hear cars and cyclists on a run.'
				]
			}
		],
		faq: [
			{
				q: 'Can I swim with sports headphones?',
				a: 'IP67 survives immersion, but Bluetooth doesn’t transmit underwater, so the pool calls for special models with built-in storage.'
			}
		]
	},
	'do-3000-hrn': {
		h1: 'Headphones under 3,000 UAH',
		title: 'Headphones under 3,000 UAH — affordable wireless and wired | Hvylia',
		description:
			'Good headphones under 3,000 UAH: wireless earbuds for sport and in-ear monitors. Tested models with a warranty.',
		lead: 'Headphones that sound better than they cost: a selection of models under 3,000 UAH that we recommend to friends.',
		text: [
			{
				title: 'What this money gets you',
				paragraphs: [
					'Under 3,000 UAH you can find water-resistant true wireless earbuds with AAC or wired monitors with hybrid drivers. Noise cancelling is still rare at this price — look from 4,000 UAH for that.'
				]
			}
		],
		faq: [
			{
				q: 'Are headphones under 3,000 UAH worth buying?',
				a: 'Yes, if you don’t need noise cancelling. Sound and battery life at this price are already very decent.'
			}
		]
	},
	'dlia-domu': {
		h1: 'Home speakers',
		title: 'Home speakers — bookshelf speakers and soundbars | Hvylia',
		description:
			'Speakers for the home: bookshelf speakers for hi-fi, soundbars for the TV and smart Wi-Fi speakers with multi-room. Advice from an audio expert.',
		lead: 'From background music in the kitchen to a proper stereo system in the living room.',
		text: [
			{
				title: 'Three scenarios',
				paragraphs: [
					'For background music, a smart Wi-Fi speaker is enough: it turns on by voice and plays from any service. For films, a soundbar under the TV. For focused listening, bookshelf speakers with an amplifier.'
				]
			}
		],
		faq: [
			{
				q: 'Can I combine different kinds of speakers?',
				a: 'Lumen soundbars and smart speakers join into a multi-room system. Passive speakers work separately through an amplifier.'
			}
		]
	},
	'portatyvni-do-5000-hrn': {
		h1: 'Portable speakers under 5,000 UAH',
		title: 'Buy a portable speaker under 5,000 UAH — IP67 protection | Hvylia',
		description:
			'Buy a portable speaker under 5,000 UAH: waterproof Bluetooth speakers for the beach, hikes and the country house. Free delivery from 3,000 UAH.',
		lead: 'Waterproof speakers that sound louder than their size suggests.',
		text: [
			{
				title: 'How to choose a portable speaker',
				paragraphs: [
					'For the shower and balcony, 10 W is enough; for a group outdoors, look for 30 W or more and passive radiators for bass. IP67 means you can drop the speaker in water.'
				]
			}
		],
		faq: [
			{
				q: 'How long should a portable speaker last?',
				a: 'For a full day — 10 hours or more. Our models last 12–20 hours at medium volume.'
			}
		]
	},
	'dlia-pochatkivtsiv': {
		h1: 'Vinyl for beginners',
		title: 'Turntables for beginners — where to start | Hvylia',
		description:
			'A turntable for beginners, first records and care products. We explain how to put together your first vinyl system without mistakes.',
		lead: 'Everything you need to play your first record today: a turntable, a record and care.',
		text: [
			{
				title: 'A minimal system',
				paragraphs: [
					'A beginner’s turntable should have a built-in phono preamp and a pre-mounted cartridge — then you just connect it to active speakers or an amplifier.',
					'The first purchase after the turntable is an anti-static brush. It protects both records and the stylus.'
				]
			}
		],
		faq: [
			{
				q: 'Can I listen to vinyl on headphones?',
				a: 'Yes: through an amplifier’s output or the Bluetooth output of the Ottava Primo turntable.'
			}
		]
	},
	'dlia-navushnykiv': {
		h1: 'Headphone amplifiers and DACs',
		title: 'Headphone DACs and amplifiers — buy | Hvylia',
		description:
			'Portable DACs and amplifiers with a headphone output: more volume, less noise and high-resolution files.',
		lead: 'Get everything out of your headphones: a separate DAC gives headroom and cleaner sound than a phone’s output.',
		text: [
			{
				title: 'Who needs a DAC',
				paragraphs: [
					'If your headphones have an impedance of 64 Ω or more, or you listen to lossless, a separate DAC will noticeably improve dynamics and the silence between notes.'
				]
			}
		],
		faq: [
			{
				q: 'Do wireless headphones need a DAC?',
				a: 'No, wireless headphones already have a DAC built in. A separate DAC is for wired models.'
			}
		]
	}
};

export const landings: Landing[] = uk.map((l) => ({ ...l, ...t[l.slug] }));

export const landingFor = (category: string, slug: string) =>
	landings.find((l) => l.category === category && l.slug === slug);
