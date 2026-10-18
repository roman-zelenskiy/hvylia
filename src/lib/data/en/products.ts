/** English product texts. Prices, photos, facets and stock are shared with ../products.uk.ts */
import { products as uk } from '../products.uk.ts';
import type { Product } from '../types.ts';

type Text = Pick<Product, 'alt' | 'short' | 'description' | 'highlights'> & { name?: string };

const t: Record<string, Text> = {
	'aurel-air-pro': {
		alt: 'Aurel Air Pro wireless earbuds in their charging case',
		short:
			'True wireless earbuds with adaptive noise cancelling, LDAC and 8 hours of playback without the case.',
		description: [
			'Air Pro are Aurel’s most compact earbuds with hybrid noise cancelling. Six microphones analyse noise 200 times a second and adjust the filter to your fit.',
			'An 11 mm driver with a bio-cellulose diaphragm delivers dense bass and clean mids, and with LDAC on Android the earbuds stream up to 990 kbps.',
			'The case charges wirelessly, and 10 minutes of charging gives 2 hours of music.'
		],
		highlights: ['Hybrid ANC up to −42 dB', 'LDAC, AAC, SBC', '8 h + 32 h with the case', 'IPX4']
	},
	'pulse-lab-buds-sport': {
		alt: 'Pulse Lab Buds Sport wireless sports earbuds',
		short: 'Sports earbuds with ear hooks, IP67 and 10 hours of playback.',
		description: [
			'Buds Sport stay in thanks to soft silicone ear hooks — even during interval runs or burpees.',
			'The IP67 body doesn’t mind sweat or rain. “Street” mode amplifies the sounds around you so you can hear cars and cyclists.'
		],
		highlights: ['IP67', '10 h + 30 h with the case', '“Street” mode', '60 ms latency']
	},
	'aurel-one': {
		alt: 'Aurel One wireless on-ear headphones',
		short: 'Light, foldable on-ear headphones with ANC and 45 hours of playback.',
		description: [
			'One are compact on-ear headphones that fold into your palm. They weigh just 185 g, so you don’t feel them even after several hours.',
			'Noise cancelling removes office ventilation hum and café chatter, and aptX Adaptive keeps the connection stable.'
		],
		highlights: ['185 g', 'ANC', '45 h of playback', 'aptX Adaptive']
	},
	'aurel-studio-x': {
		alt: 'Aurel Studio X wireless over-ear noise-cancelling headphones',
		short: 'Flagship over-ear headphones with adaptive ANC, LDAC and 40 hours of playback.',
		description: [
			'Studio X is Aurel’s flagship. Eight microphones and a dedicated noise-cancelling processor make the silence deeper than any previous model from the brand.',
			'40 mm beryllium-coated drivers deliver bass without boom and an airy top end. Memory-foam ear pads keep the seal even with glasses.',
			'USB-C audio lets you play lossless from a laptop straight over the cable.'
		],
		highlights: [
			'Adaptive ANC, 8 microphones',
			'LDAC, aptX Lossless',
			'40 h with ANC',
			'24-bit USB-C audio'
		]
	},
	'kobza-m1-studio': {
		alt: 'Kobza M1 Studio wired studio headphones',
		short: 'Closed-back studio monitors with a flat frequency response for mixing and recording.',
		description: [
			'M1 Studio are made for recording studios: a flat frequency response with no “flattering”, so you hear a recording exactly as it is.',
			'A detachable 3 m locking cable, swivelling cups for one-ear monitoring and replacement ear pads that come off easily for cleaning.'
		],
		highlights: ['Flat frequency response', '64 Ω', 'Detachable 3 m cable', 'Swivelling cups']
	},
	'kobza-iem-duo': {
		alt: 'Kobza IEM Duo wired in-ear monitors',
		short: 'Dual-driver stage monitors with a hybrid design and a detachable cable.',
		description: [
			'IEM Duo combine a dynamic driver for bass with a balanced armature for mids and highs. The sound is detailed but never harsh.',
			'The shells are cast from 3D scans of a hundred ear canals, so they fit snugly and isolate up to −26 dB without any electronics.'
		],
		highlights: [
			'1 dynamic + 1 balanced armature driver',
			'Isolation up to −26 dB',
			'2-pin 0.78 mm cable'
		]
	},
	'pulse-lab-raid-7': {
		alt: 'Pulse Lab Raid 7 wireless gaming headset with microphone',
		short: 'A wireless gaming headset with a 2.4 GHz radio link and a detachable microphone.',
		description: [
			'Raid 7 connects over 2.4 GHz to a PC or console and over Bluetooth to a phone at the same time — you can play without missing a call.',
			'Latency under 20 ms, spatial audio and a detachable noise-reducing microphone for team games.'
		],
		highlights: [
			'2.4 GHz, 20 ms latency',
			'50 h of playback',
			'Detachable microphone',
			'Spatial audio'
		]
	},
	'nordwave-fjord-mini': {
		alt: 'Nordwave Fjord Mini portable Bluetooth speaker',
		short: 'A small IP67 speaker with a strap and 12 hours of playback.',
		description: [
			'Fjord Mini fits in a jacket pocket but sounds twice its size thanks to a passive radiator.',
			'The speaker floats, doesn’t mind sand and straps onto a backpack or bike.'
		],
		highlights: ['IP67, floats', '12 h', '10 W', 'Stereo pair']
	},
	'nordwave-fjord-max': {
		alt: 'Nordwave Fjord Max large waterproof portable speaker',
		short: 'A powerful 40 W portable speaker that doubles as a power bank.',
		description: [
			'Fjord Max is a speaker for a group: 40 W of stereo sound, 20 hours of playback and a USB output to charge your phone.',
			'“Space” mode widens the soundstage when the speaker sits in the middle of a clearing or yard.'
		],
		highlights: ['40 W stereo', '20 h', 'IP67', 'Power bank']
	},
	'basalt-b2': {
		alt: 'Basalt B2 bookshelf speakers, a pair of passive speakers',
		short: 'Two-way bookshelf speakers for a first serious hi-fi system (price per pair).',
		description: [
			'B2 are classic British bookshelf speakers: a 25 mm silk tweeter, a 130 mm paper-cone woofer and an 18 mm thick MDF cabinet.',
			'They sound coherent and musical at any volume — the perfect pair for a turntable and a 30–80 W amplifier.'
		],
		highlights: ['Price per pair', '25 mm silk tweeter', '6 Ω, 87 dB', 'Recommended power 30–80 W']
	},
	'lumen-bar-3': {
		alt: 'Lumen Bar 3 soundbar under a TV',
		short: 'A 3.1 soundbar with Dolby Atmos, HDMI eARC and voice enhancement.',
		description: [
			'Bar 3 keeps dialogue clear even at night-time volume: a dedicated centre channel and “Voice” mode boost speech.',
			'Dolby Atmos and virtual height channels add depth to films, and HDMI eARC lets you control the volume with the TV remote.'
		],
		highlights: ['3.1, Dolby Atmos', 'HDMI eARC', 'Wi-Fi, AirPlay 2', 'Night mode']
	},
	'lumen-home-mini': {
		alt: 'Lumen Home Mini smart speaker with a fabric body',
		short: 'A compact Wi-Fi speaker with voice control and multi-room.',
		description: [
			'Home Mini is a small speaker you won’t mind putting in the kitchen or bathroom. Its microphones automatically tune the sound to the room.',
			'Two Home Minis pair into stereo, and with the Bar 3 they become a home cinema.'
		],
		highlights: ['Wi-Fi, AirPlay 2, Chromecast', 'Auto-calibration', 'Stereo pair', 'Multi-room']
	},
	'ottava-primo': {
		alt: 'Ottava Primo turntable with a wooden plinth',
		short: 'A belt-drive turntable with a built-in phono preamp and Bluetooth output.',
		description: [
			'Primo is an easy turntable to start with: the cartridge is fitted and set up at the factory, and the built-in phono preamp lets you connect it to any active speakers.',
			'An aluminium platter and a carbon-fibre tonearm minimise vibration, and the Bluetooth output sends sound to wireless headphones or a speaker.'
		],
		highlights: [
			'Belt drive',
			'Built-in phono preamp',
			'MM cartridge fitted',
			'aptX Bluetooth output'
		]
	},
	'vinylka-delta-lp': {
		name: 'Lis Tyshi — “Delta” (2LP)',
		alt: 'Vinyl record “Delta” by Lis Tyshi',
		short: 'A double album by a Kyiv ambient band on 180 g vinyl.',
		description: [
			'“Delta” is Lis Tyshi’s second album: nine pieces recorded live in St Nicholas Cathedral in Kyiv.',
			'Mastered specifically for vinyl, pressed at 180 g, with a gatefold sleeve and a digital download included.'
		],
		highlights: [
			'2LP, 180 g',
			'Mastered for vinyl',
			'Limited to 1,000 copies',
			'Digital version included'
		]
	},
	'ottava-clean-kit': {
		alt: 'A clean vinyl record close up — the Ottava Clean Kit is made for it',
		short: 'A carbon anti-static brush, cleaning fluid and a microfibre cloth.',
		description: [
			'Everything to keep records sounding clean: the carbon brush removes static and dust before every play, and the alcohol-based fluid cleans the grooves every few months.',
			'Enough for about 200 records.'
		],
		highlights: ['Carbon brush', '100 ml fluid', 'Microfibre cloth', 'Stylus brush']
	},
	'basalt-a40': {
		alt: 'Basalt A40 integrated stereo amplifier',
		short: 'A 2 × 40 W integrated amplifier with a phono stage, DAC and Bluetooth aptX HD.',
		description: [
			'A40 is the centre of a compact hi-fi system: an MM phono stage for a turntable, optical and coaxial inputs for the TV, a USB DAC for the computer and Bluetooth for the phone.',
			'A class AB amplifier with a toroidal transformer delivers dense, controlled bass even on bookshelf speakers.'
		],
		highlights: [
			'2 × 40 W, class AB',
			'MM phono stage',
			'USB DAC 32-bit / 384 kHz',
			'Headphone output'
		]
	},
	'kobza-tsap-go': {
		alt: 'Kobza DAC Go portable headphone DAC/amp',
		short: 'A portable DAC/amp with a 4.4 mm balanced output for phones and laptops.',
		description: [
			'DAC Go is the size of a flash drive, yet it has enough power even for 300 Ω studio headphones. Two outputs — 3.5 mm and 4.4 mm balanced.',
			'Supports files up to 32-bit / 384 kHz and MQA, and works with Android, USB-C iPhones, Mac and Windows without drivers.'
		],
		highlights: ['32-bit / 384 kHz', '3.5 mm + 4.4 mm balanced output', '200 mW into 32 Ω', 'USB-C']
	},
	'ferro-silver-link': {
		alt: 'Ferro Silver Link interconnect audio cable with RCA plugs',
		short: 'A 1 m RCA–RCA interconnect with silver-plated copper and double shielding.',
		description: [
			'Silver Link connects a turntable to an amplifier or a DAC to speakers without loss or background hum.',
			'Silver-plated copper, double shielding and gold-plated collet connectors for a tight contact.'
		],
		highlights: ['1 m long', 'Silver-plated copper', 'Double shielding', 'Gold-plated RCA']
	},
	'ferro-velour-pads': {
		alt: 'Ferro Velour Pads replacement velour ear pads for headphones',
		short: 'Velour ear pads with memory foam for 90–105 mm headphones.',
		description: [
			'Breathable velour doesn’t sweat in summer, and memory foam follows the shape of your head and glasses.',
			'The elastic base fits most over-ear headphones with oval cups.'
		],
		highlights: ['Velour', 'Memory foam', '90–105 mm diameter']
	},
	'ferro-stand-alu': {
		alt: 'Ferro Stand Alu aluminium headphone stand',
		short: 'An anodised aluminium stand with a silicone headband rest.',
		description: [
			'Solid aluminium and a heavy base: your headphones won’t tip over, and the headband keeps its shape.',
			'The silicone insert doesn’t scratch the finish, and rubber feet stop it sliding on the desk.'
		],
		highlights: ['Anodised aluminium', 'Silicone insert', '270 mm tall']
	}
};

const colors: Record<string, string> = {
	chornyi: 'Black',
	bilyi: 'White',
	hrafit: 'Graphite',
	sriblo: 'Silver',
	pisochnyi: 'Sand',
	syniy: 'Blue',
	zelenyi: 'Green',
	pomaranchevyi: 'Orange',
	horikh: 'Walnut',
	prozoryi: 'Clear',
	dymchastyi: 'Smoke',
	siryi: 'Grey',
	stal: 'Steel',
	'chornyi-vinil': 'Black vinyl',
	'synii-vinil': 'Blue vinyl'
};

const groups: Record<string, string> = {
	Амбушури: 'Ear pads',
	Видання: 'Release',
	Виходи: 'Outputs',
	Вміст: 'Contents',
	Входи: 'Inputs',
	Живлення: 'Power',
	Звук: 'Sound',
	Кабель: 'Cable',
	Комплектація: 'In the box',
	Корпус: 'Body',
	Механіка: 'Mechanics',
	Мікрофон: 'Microphone',
	Підключення: 'Connectivity',
	Підсилювач: 'Amplifier',
	Підставка: 'Stand',
	ЦАП: 'DAC',
	Шумозаглушення: 'Noise cancelling'
};

const labels: Record<string, string> = {
	'USB-вихід': 'USB output',
	'Ігровий режим': 'Game mode',
	Імпеданс: 'Impedance',
	Автокалібрування: 'Auto-calibration',
	Амбушури: 'Ear pads',
	Аналогові: 'Analogue',
	'Бездротова зарядка': 'Wireless charging',
	Вага: 'Weight',
	'Вага кейса': 'Case weight',
	'Вага навушника': 'Earbud weight',
	Висота: 'Height',
	Виходи: 'Outputs',
	Вологостійкість: 'Water resistance',
	Вхід: 'Input',
	Головка: 'Cartridge',
	Детонація: 'Wow and flutter',
	Динаміки: 'Speakers',
	Довжина: 'Length',
	Драйвер: 'Driver',
	Драйвери: 'Drivers',
	Дротове: 'Wired',
	Екранування: 'Shielding',
	Жанр: 'Genre',
	'З кейсом': 'With case',
	Зарядка: 'Charging',
	Захист: 'Protection',
	Кабель: 'Cable',
	Кейс: 'Case',
	Клас: 'Class',
	Клеми: 'Terminals',
	Кодеки: 'Codecs',
	'Коефіцієнт гармонік': 'THD',
	Комплект: 'Set',
	Конфігурація: 'Configuration',
	Матеріал: 'Material',
	Матеріали: 'Materials',
	Мультипоінт: 'Multipoint',
	Мультирум: 'Multi-room',
	Мікрофони: 'Microphones',
	Навушники: 'Headphones',
	Наклад: 'Pressing',
	'Оптичний вхід': 'Optical input',
	Плінт: 'Plinth',
	Потужність: 'Power',
	'Потужність підсилювача': 'Amplifier power',
	Привід: 'Drive',
	Провідник: 'Conductor',
	Протоколи: 'Protocols',
	Радіо: 'Radio',
	'Режим прозорості': 'Transparency mode',
	Робота: 'Playback',
	'Робота навушників': 'Earbud playback',
	Роздільність: 'Resolution',
	Розміри: 'Dimensions',
	'Роз’єм': 'Connector',
	Рідина: 'Fluid',
	Рік: 'Year',
	Серветка: 'Cloth',
	'Складна конструкція': 'Foldable',
	'Співвідношення сигнал/шум': 'Signal-to-noise ratio',
	Стереопара: 'Stereo pair',
	Сумісність: 'Compatibility',
	Тип: 'Type',
	Товщина: 'Thickness',
	Тонарм: 'Tonearm',
	Треків: 'Tracks',
	Тривалість: 'Duration',
	Фонокоректор: 'Phono preamp',
	Формат: 'Format',
	Формати: 'Formats',
	Цифрові: 'Digital',
	'Частотний діапазон': 'Frequency range',
	Чутливість: 'Sensitivity',
	'Швидка зарядка': 'Fast charging',
	Швидкості: 'Speeds',
	Шумоподавлення: 'Noise reduction',
	'Шумоподавлення мікрофона': 'Microphone noise reduction',
	Щітка: 'Brush',
	'Щіточка для голки': 'Stylus brush'
};

/** Текстові значення характеристик; числа з одиницями перекладає units() */
const values: Record<string, string> = {
	'1 пара': '1 pair',
	'1 широкосмуговий + пасивний випромінювач': '1 full-range + passive radiator',
	'10 мм динамічний + арматурний': '10 mm dynamic + balanced armature',
	'1000 копій': '1,000 copies',
	'11 мм, динамічний': '11 mm, dynamic',
	'2 × LP, 33⅓ об/хв': '2 × LP, 33⅓ rpm',
	'2 широкосмугові + 2 пасивні випромінювачі': '2 full-range + 2 passive radiators',
	'2,4 ГГц, USB-C донгл': '2.4 GHz, USB-C dongle',
	'200 мВт / 32 Ом (баланс)': '200 mW / 32 Ω (balanced)',
	'25 мм шовк + 130 мм папір': '25 mm silk + 130 mm paper',
	'3 пари силікон + 1 пара піна': '3 pairs silicone + 1 pair foam',
	'3,5 мм + перехідник 6,3 мм': '3.5 mm + 6.3 mm adapter',
	'3,5 мм, 4,4 мм балансний': '3.5 mm, 4.4 mm balanced',
	'3,5 мм, USB-C аудіо 24 біт / 96 кГц': '3.5 mm, USB-C audio 24-bit / 96 kHz',
	'3.1, вбудований сабвуфер': '3.1, built-in subwoofer',
	'33⅓ і 45 об/хв': '33⅓ and 45 rpm',
	'40 год (ANC увімк.), 60 год (вимк.)': '40 h (ANC on), 60 h (off)',
	'40 мм, берилієве покриття': '40 mm, beryllium-coated',
	'45 год (ANC вимк.), 32 год (ANC увімк.)': '45 h (ANC off), 32 h (ANC on)',
	'5,1 кг (1 шт.)': '5.1 kg (each)',
	'8 год (ANC вимк.), 6 год (ANC увімк.)': '8 h (ANC off), 6 h (ANC on)',
	'ENC, 4 мікрофони': 'ENC, 4 microphones',
	'MM, еліптична голка': 'MM, elliptical stylus',
	'Phono MM, 3 × RCA лінійні': 'Phono MM, 3 × RCA line',
	'RCA – RCA, стерео': 'RCA – RCA, stereo',
	'USB-C, 2 год': 'USB-C, 2 h',
	'USB-C, 2,5 год': 'USB-C, 2.5 h',
	'Алюміній, еко-шкіра, піна з пам’яттю форми': 'Aluminium, eco-leather, memory foam',
	'Анодований алюміній': 'Anodised aluminium',
	'Будь-які повнорозмірні навушники': 'Any over-ear headphones',
	'Вбудований, вимикається': 'Built-in, switchable',
	'Велюр, піна з пам’яттю форми': 'Velour, memory foam',
	'Внутрішньоканальні TWS': 'True wireless in-ear',
	'Внутрішньоканальні TWS з дужками': 'True wireless in-ear with ear hooks',
	'Внутрішньоканальні монітори': 'In-ear monitors',
	'Вуглецеве волокно, 8,6"': 'Carbon fibre, 8.6"',
	'Гібридне, адаптивне': 'Hybrid, adaptive',
	'Для ванної кімнати': 'Bathroom-safe',
	'До 100 колонок Nordwave': 'Up to 100 Nordwave speakers',
	'До 32 біт / 384 кГц, DSD256': 'Up to 32-bit / 384 kHz, DSD256',
	'Ембієнт, неокласика': 'Ambient, neoclassical',
	Жорсткий: 'Hard',
	'Змінні, велюр + еко-шкіра в комплекті': 'Replaceable, velour + eco-leather included',
	'Знімний, 2-pin 0,78 мм, 1,2 м': 'Detachable, 2-pin 0.78 mm, 1.2 m',
	'Знімний, 3 м, з фіксацією': 'Detachable, 3 m, locking',
	'Знімний, кардіоїдний': 'Detachable, cardioid',
	'Карбонова, антистатична': 'Carbon, anti-static',
	'МДФ, шпон горіха': 'MDF, walnut veneer',
	'Мікрофібра 30 × 30 см': 'Microfibre 30 × 30 cm',
	'Накладні, закриті': 'On-ear, closed-back',
	Ні: 'No',
	'Овальні чашки 90–105 мм': 'Oval cups 90–105 mm',
	'Одинарні, під банани і кабель до 4 мм²': 'Single, for banana plugs and cable up to 4 mm²',
	'Оптичний, коаксіальний, USB-B': 'Optical, coaxial, USB-B',
	'Пасивна полична, двосмугова': 'Passive bookshelf, two-way',
	'Повнорозмірна ігрова гарнітура': 'Over-ear gaming headset',
	'Повнорозмірні, закриті': 'Over-ear, closed-back',
	'Подвійне (фольга + обплетення)': 'Double (foil + braid)',
	'Посріблена безкиснева мідь': 'Silver-plated oxygen-free copper',
	Ремінний: 'Belt',
	Так: 'Yes',
	'Так, 10 Вт': 'Yes, 10 W',
	'Так, 2 пристрої': 'Yes, 2 devices',
	'Так, 60 мс': 'Yes, 60 ms',
	'Так, feed-forward': 'Yes, feed-forward',
	'Широкосмуговий 50 мм + твітер': '50 mm full-range + tweeter'
};

/** «1,4 кг» → «1.4 kg», «10–30 000 Гц» → «10–30,000 Hz» */
const units = (v: string) =>
	v
		.replace(/(\d) (\d{3})/g, '$1,$2')
		.replace(/(\d),(\d)(?!\d{2})/g, '$1.$2')
		.replace(/ мВт/g, ' mW')
		.replace(/ Вт/g, ' W')
		.replace(/ кГц/g, ' kHz')
		.replace(/ ГГц/g, ' GHz')
		.replace(/ Гц/g, ' Hz')
		.replace(/ дБ/g, ' dB')
		.replace(/ Ом/g, ' Ω')
		.replace(/ год/g, ' h')
		.replace(/ хв/g, ' min')
		.replace(/ мм/g, ' mm')
		.replace(/ см/g, ' cm')
		.replace(/ мл/g, ' ml')
		.replace(/ кг/g, ' kg')
		.replace(/ г\b/g, ' g')
		.replace(/(\d) г$/g, '$1 g')
		.replace(/ м$/g, ' m')
		.replace(/ мс/g, ' ms');

const value = (v: string) => values[v] ?? units(v);

export const products: Product[] = uk.map((p) => ({
	...p,
	...t[p.slug],
	colors: p.colors.map((c) => ({ ...c, name: colors[c.id] ?? c.name })),
	specs: p.specs.map((g) => ({
		title: groups[g.title] ?? g.title,
		rows: g.rows.map((r) => ({ label: labels[r.label] ?? r.label, value: value(r.value) }))
	}))
}));

export const productBySlug = new Map(products.map((p) => [p.slug, p]));
