/** English brand texts. Slugs, names and founding years are shared with ../brands.uk.ts */
import { brands as uk } from '../brands.uk.ts';
import type { Brand } from '../types.ts';

const t: Record<string, Pick<Brand, 'country' | 'tagline' | 'about'>> = {
	aurel: {
		country: 'Denmark',
		tagline: 'Silence, tuned by hand',
		about: [
			'Aurel started in a small Copenhagen workshop where engineers hand-calibrated every pair of studio headphones. Today they make wireless models with adaptive noise cancelling, but the principle is the same: every driver is measured before it ships.',
			'Aurel’s signature sound is neutral, with clean highs and restrained bass. They’re chosen by people who travel a lot and listen closely.'
		]
	},
	'pulse-lab': {
		country: 'South Korea',
		tagline: 'Sound that keeps up with you',
		about: [
			'Pulse Lab makes headphones for movement: sport, gaming, the city. Water- and sweat-resistant shells, low latency and batteries that last a week of workouts.',
			'The gaming line uses its own 2.4 GHz radio link with latency under 20 ms — exactly what esports needs.'
		]
	},
	kobza: {
		country: 'Ukraine',
		tagline: 'The Kyiv school of precise sound',
		about: [
			'Kobza Audio is a Kyiv team of sound engineers. They started with in-ear monitors for musicians and later added studio models and portable DACs.',
			'Every product is tuned using measurements on an artificial ear and listening sessions in Kyiv recording studios.'
		]
	},
	nordwave: {
		country: 'Norway',
		tagline: 'Made for rain and wind',
		about: [
			'Nordwave builds portable speakers for fjords, beaches and balconies: IP67 protection, recycled aluminium bodies and an all-day battery.',
			'Speakers pair into stereo and multi-room setups with a single button.'
		]
	},
	basalt: {
		country: 'United Kingdom',
		tagline: 'Hi-fi without compromise',
		about: [
			'Basalt Acoustics makes British speakers and amplifiers the classic way: heavy cabinets, hand assembly and crossovers tuned by ear.',
			'Their bookshelf speakers and integrated amplifiers are often recommended as a first serious system for vinyl.'
		]
	},
	lumen: {
		country: 'Netherlands',
		tagline: 'Smart sound for the home',
		about: [
			'Lumen makes soundbars and smart speakers that blend into any interior: fabric panels, minimal buttons, voice and app control.',
			'They support AirPlay 2, Chromecast and multi-room across all the brand’s devices.'
		]
	},
	ottava: {
		country: 'Italy',
		tagline: 'Vinyl, workshop-style',
		about: [
			'Ottava builds turntables in Bologna: wooden plinths, aluminium platters and carbon-fibre tonearms.',
			'A separate line covers record-care products the brand developed with archivists from the local sound library.'
		]
	},
	vinylka: {
		country: 'Ukraine',
		tagline: 'Ukrainian sound on black discs',
		about: [
			'Vinylka is an independent Lviv label releasing Ukrainian music on 180 g vinyl.',
			'Every release is mastered specifically for vinyl and pressed in a limited run.'
		]
	},
	ferro: {
		country: 'Poland',
		tagline: 'Details that sound',
		about: [
			'Ferro makes cables, ear pads and stands from metal and natural materials.',
			'All cables have gold-plated connectors and double shielding, and the ear pads fit most full-size headphones.'
		]
	}
};

export const brands: Brand[] = uk.map((b) => ({ ...b, ...t[b.slug] }));
export const brandBySlug = new Map(brands.map((b) => [b.slug, b]));
