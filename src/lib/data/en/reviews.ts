/** English reviews and Q&A. Ratings, dates and products are shared with ../reviews.uk.ts; names are transliterated */
import { questions as ukQuestions, reviews as ukReviews } from '../reviews.uk.ts';
import type { Question, Review } from '../types.ts';
import { translit } from '../translit.ts';

/** [заголовок, текст, переваги?, недоліки?] — у тому ж порядку, що й українські відгуки */
const t: [string, string, string?, string?][] = [
	[
		'Silence on the metro',
		'I ride the blue line every day — the train rumble almost disappears. LDAC on a Pixel sounds noticeably better than my previous earbuds.',
		'Noise cancelling, sound, case',
		'The touch controls sometimes trigger when I adjust an earbud'
	],
	[
		'Perfect for flights',
		'A 4-hour flight — the battery had plenty to spare, and I barely heard the crying baby in the cabin.',
		'Battery life, fit'
	],
	[
		'Good, but pricey',
		'Sound and ANC are solid, and they work over AAC with an iPhone without issues. I’d like more equaliser settings.',
		'Sound',
		'Price, few settings'
	],
	[
		'Multipoint saves the day',
		'Connected to a laptop and a phone at once — they switch to a call instantly.',
		'Multipoint, microphones'
	],
	[
		'They don’t fall out',
		'I run half-marathons — they’ve never fallen out, and the hooks don’t chafe. They work like new after rain.',
		'Fit, IP67'
	],
	[
		'Just right for the gym',
		'Lively sound with real bass. “Street” mode is handy when I run along the road.',
		'Price, “Street” mode',
		'The case is a bit bulky'
	],
	[
		'Light and quiet',
		'I wear them 6–7 hours a day at the office, and my ears don’t get tired. ANC removes the air conditioning completely.',
		'Weight, battery life'
	],
	[
		'Nice, but they press',
		'Pleasant sound and they fold compactly. After an hour they press on my ears a little — it’s an on-ear design.',
		'Sound, compactness',
		'Pressure on the ears'
	],
	[
		'The best ANC I’ve heard',
		'I compared them in the shop with two well-known flagships — Studio X cancel deeper and sound cleaner. Over USB-C I listen to lossless from my laptop.',
		'ANC, sound, USB audio'
	],
	[
		'Worth the money',
		'Soft ear pads, no gaps even with glasses. The battery lasts a week of use with ANC.',
		'Comfort, battery'
	],
	[
		'Almost perfect',
		'The sound is great, but they get warm in summer. Top choice for winter.',
		'Sound, isolation',
		'Warm in summer'
	],
	[
		'A gift for my husband',
		'The adviser helped us choose between Studio X and One — my husband loves them and listens to vinyl rips over LDAC.',
		'Sound, advice'
	],
	[
		'Honest monitors',
		'I mix podcasts and demos on them. They flatter nothing — I catch every hiss and click.',
		'Flat response, cable'
	],
	[
		'For audio work',
		'Not for music on a walk, but as studio headphones they’re very good for the money. They open up more with the DAC Go.',
		'Detail',
		'A bit quiet without a DAC'
	],
	[
		'For the stage',
		'I play keys, and the isolation is excellent — I hear myself and the click, not the drums.',
		'Isolation, detail'
	],
	[
		'Pleasant sound',
		'Very detailed, with vocals up close. The included cable is a bit stiff.',
		'Detail',
		'Cable'
	],
	[
		'No lag',
		'I play shooters — no noticeable latency, and footsteps are clear. Teammates praise the mic.',
		'Latency, microphone'
	],
	[
		'A good headset',
		'The battery lasts a week. A little heavy for long sessions.',
		'Battery',
		'Weight'
	],
	[
		'Took it to the beach',
		'Dropped it in the sea — it floated and kept playing. Amazing sound for its size.',
		'Protection, sound'
	],
	[
		'Two as a stereo pair',
		'Bought two — on the balcony they work like a little system. They pair in a second.',
		'Stereo pair, price'
	],
	[
		'Nice, but quiet outdoors',
		'Perfect for a room and the shower. Outdoors with friends I’d like it louder.',
		'Size',
		'Outdoor volume'
	],
	[
		'A speaker for the country house',
		'Plays all evening and even charged my phone. You feel the bass even outdoors.',
		'Power, power bank'
	],
	['Powerful', 'Loud, clean sound, but a bit heavy for hiking.', 'Sound', 'Weight'],
	[
		'My first hi-fi pair',
		'With the Basalt A40 and Ottava Primo it’s a dream system for sensible money. Wide soundstage, lively vocals.',
		'Sound, build quality'
	],
	[
		'Musical',
		'I spent ages choosing between three pairs — the B2 sound the most natural with acoustic music.',
		'Natural sound'
	],
	[
		'I can finally hear the dialogue',
		'“Voice” mode rescues films with quiet dialogue. Connected over HDMI — the TV remote controls the volume.',
		'Clarity, eARC'
	],
	[
		'A good soundbar',
		'You can feel the Atmos, but without a separate subwoofer the bass is modest.',
		'Immersion',
		'Bass'
	],
	[
		'Perfect for the kitchen',
		'I start podcasts by voice while cooking. Surprisingly full sound.',
		'Voice control'
	],
	['Convenient', 'AirPlay is stable. I’d like more bass.', 'AirPlay', 'Bass'],
	[
		'My first turntable',
		'Unpacked it, fitted the belt, switched it on — and it plays. The adviser explained how to set the tracking force.',
		'Simplicity, sound'
	],
	[
		'Beautiful and quiet',
		'The walnut plinth is the centrepiece of the room. You can’t hear the motor even between tracks.',
		'Design, silence'
	],
	[
		'A good start',
		'Good sound, and Bluetooth is handy for headphones. The lid resonates a little if you knock it.',
		'Bluetooth output',
		'Lid'
	],
	[
		'An incredible recording',
		'You can hear the space of the cathedral. Flat records, no clicks.',
		'Pressing quality'
	],
	[
		'My records came back to life',
		'After washing, old records are noticeably quieter between tracks.',
		'Effectiveness'
	],
	[
		'All in one',
		'Connected a turntable, a TV and a laptop — nothing else needed. Controlled bass.',
		'Inputs, sound'
	],
	[
		'Heavy and well made',
		'Beautiful sound, but the remote could be more convenient.',
		'Sound',
		'Remote'
	],
	[
		'Small, but it drives them',
		'With the M1 Studio the difference from the laptop output is huge — tight bass, wider stage.',
		'Power, size'
	],
	[
		'A good DAC',
		'Works with an iPhone 16 without adapters. Gets a little warm.',
		'Compatibility',
		'Heat'
	],
	['No hum', 'My previous cable hummed — with Silver Link it’s silent.', 'Shielding'],
	[
		'Comfortable',
		'Put them on my old headphones — like new, just slightly less bass than with leather pads.',
		'Comfort',
		'Less bass'
	],
	[
		'Stylish and stable',
		'Heavy, doesn’t wobble. Waiting for the black one to come back in stock.',
		'Material'
	]
];

export const reviews: Review[] = ukReviews.map((r, i) => {
	const [title, text, pros, cons] = t[i] ?? [r.title, r.text, r.pros, r.cons];
	return { ...r, author: translit(r.author), city: translit(r.city), title, text, pros, cons };
});

const qa: Record<string, [string, string]> = {
	q01: [
		'Does LDAC work with Samsung?',
		'Yes, on Samsung with Android 10 or newer, LDAC is enabled in developer options or in the Aurel app.'
	],
	q02: [
		'Can I use just one earbud?',
		'Yes, each earbud works on its own, with noise cancelling and a microphone.'
	],
	q03: [
		'Are they good for PC gaming?',
		'For single-player games, yes — there’s no latency over USB-C. For esports with voice chat, a gaming headset with a radio link such as the Pulse Lab Raid 7 is better.'
	],
	q04: ['Do the headphones fold?', 'The cups rotate flat, and a hard case is included.'],
	q05: [
		'Can I connect it to ordinary computer speakers?',
		'Yes: switch the output to Line, and the built-in phono preamp outputs a line-level signal, just like a phone.'
	],
	q06: [
		'How long does the stylus last?',
		'About 800–1,000 hours. Replacement styli are in stock, and an adviser will recommend a compatible one.'
	],
	q07: ['Is the price per speaker or per pair?', 'Per pair.'],
	q08: ['Can I pair the Mini and the Max?', 'Yes, in multi-room mode through the Nordwave app.'],
	q09: [
		'Can it drive 300 Ω headphones?',
		'Yes, the 4.4 mm balanced output has plenty of volume headroom.'
	],
	q10: [
		'Can I add a subwoofer?',
		'Yes, the Bar 3 supports the wireless Lumen Sub, which goes on sale in winter.'
	],
	q11: [
		'Can I swim with these earbuds?',
		'IP67 protects against immersion, but Bluetooth doesn’t work underwater, so they’re not suitable for the pool.'
	]
};

export const questions: Question[] = ukQuestions.map((q) => {
	const [question, answer] = qa[q.id] ?? [q.q, q.a];
	return { ...q, author: translit(q.author), q: question, a: answer };
});

export function ratingOf(slug: string) {
	const list = reviews.filter((r) => r.product === slug);
	if (!list.length) return { value: 0, count: 0 };
	const value = list.reduce((s, r) => s + r.rating, 0) / list.length;
	return { value: Math.round(value * 10) / 10, count: list.length };
}
