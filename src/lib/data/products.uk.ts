import type { Color, Product, SpecGroup } from './types.ts';

const c = {
	black: { id: 'chornyi', name: 'Чорний', hex: '#141518' },
	white: { id: 'bilyi', name: 'Білий', hex: '#f4f4f2' },
	graphite: { id: 'hrafit', name: 'Графіт', hex: '#3b3e44' },
	silver: { id: 'sriblo', name: 'Срібний', hex: '#c9ccd1' },
	sand: { id: 'pisochnyi', name: 'Пісочний', hex: '#d9cbb3' },
	blue: { id: 'syniy', name: 'Синій', hex: '#2b4bd8' },
	green: { id: 'zelenyi', name: 'Зелений', hex: '#3e5b48' },
	orange: { id: 'pomaranchevyi', name: 'Помаранчевий', hex: '#f26a2e' },
	walnut: { id: 'horikh', name: 'Горіх', hex: '#7a5232' },
	clear: { id: 'prozoryi', name: 'Прозорий', hex: '#e7ecf1' },
	smoke: { id: 'dymchastyi', name: 'Димчастий', hex: '#5a5f66' },
	grey: { id: 'siryi', name: 'Сірий', hex: '#9da2aa' },
	steel: { id: 'stal', name: 'Сталь', hex: '#a9adb3' }
} satisfies Record<string, Color>;

/** Компактний запис характеристик: [група, [[назва, значення], …]] */
const specs = (...groups: [string, [string, string][]][]): SpecGroup[] =>
	groups.map(([title, rows]) => ({
		title,
		rows: rows.map(([label, value]) => ({ label, value }))
	}));

const img = (slug: string) =>
	[`${slug}-1.jpg`, `${slug}-2.jpg`, `${slug}-3.jpg`] as [string, string, string];

export const products: Product[] = [
	{
		id: 'p01',
		slug: 'aurel-air-pro',
		name: 'Aurel Air Pro',
		brand: 'aurel',
		category: 'navushnyky',
		sub: 'bezdrotovi',
		price: 5499,
		oldPrice: 6499,
		stock: 'in',
		badges: ['hit'],
		colors: [c.white, c.black],
		images: img('aurel-air-pro'),
		alt: 'Бездротові навушники Aurel Air Pro у зарядному кейсі',
		short: 'TWS-навушники з адаптивним шумозаглушенням, LDAC і 8 годинами роботи без кейса.',
		description: [
			'Air Pro — найкомпактніші навушники Aurel з гібридним шумозаглушенням. Шість мікрофонів 200 разів на секунду аналізують шум і підлаштовують фільтр під вашу посадку.',
			'11-міліметровий драйвер з діафрагмою на біоцелюлозі дає щільний бас і чисту середину, а з LDAC на Android навушники передають до 990 кбіт/с.',
			'Кейс заряджається бездротово, 10 хвилин зарядки дають 2 години музики.'
		],
		highlights: ['Гібридне ANC до −42 дБ', 'LDAC, AAC, SBC', '8 год + 32 год з кейсом', 'IPX4'],
		facets: {
			type: 'tws',
			connection: ['bluetooth'],
			anc: true,
			codecs: ['LDAC', 'AAC', 'SBC'],
			batteryH: 8,
			waterproof: 'IPX4'
		},
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Внутрішньоканальні TWS'],
					['Драйвер', '11 мм, динамічний'],
					['Частотний діапазон', '20–40 000 Гц'],
					['Імпеданс', '16 Ом']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.4'],
					['Кодеки', 'LDAC, AAC, SBC'],
					['Мультипоінт', 'Так, 2 пристрої']
				]
			],
			[
				'Шумозаглушення',
				[
					['ANC', 'Гібридне, адаптивне'],
					['Режим прозорості', 'Так'],
					['Мікрофони', '6']
				]
			],
			[
				'Живлення',
				[
					['Робота навушників', '8 год (ANC вимк.), 6 год (ANC увімк.)'],
					['З кейсом', '40 год'],
					['Бездротова зарядка', 'Qi']
				]
			],
			[
				'Корпус',
				[
					['Захист', 'IPX4'],
					['Вага навушника', '5,2 г'],
					['Вага кейса', '46 г']
				]
			]
		),
		popularity: 98,
		createdAt: '2026-03-12',
		together: ['ferro-stand-alu', 'kobza-tsap-go'],
		warrantyMonths: 24
	},
	{
		id: 'p02',
		slug: 'pulse-lab-buds-sport',
		name: 'Pulse Lab Buds Sport',
		brand: 'pulse-lab',
		category: 'navushnyky',
		sub: 'bezdrotovi',
		price: 2799,
		stock: 'in',
		badges: ['new'],
		colors: [c.black, c.orange],
		images: img('pulse-lab-buds-sport'),
		alt: 'Спортивні бездротові навушники Pulse Lab Buds Sport',
		short: 'Спортивні TWS-навушники з дужками, IP67 і 10 годинами роботи.',
		description: [
			'Buds Sport тримаються у вухах завдяки м’яким силіконовим дужкам — навіть на інтервальному бігу чи берпі.',
			'Корпус IP67 не боїться ні поту, ні дощу. Режим «Вулиця» підсилює звуки навколо, щоб ви чули машини й велосипедистів.'
		],
		highlights: ['IP67', '10 год + 30 год з кейсом', 'Режим «Вулиця»', 'Затримка 60 мс'],
		facets: {
			type: 'tws',
			connection: ['bluetooth'],
			anc: false,
			codecs: ['AAC', 'SBC'],
			batteryH: 10,
			waterproof: 'IP67'
		},
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Внутрішньоканальні TWS з дужками'],
					['Драйвер', '10 мм'],
					['Частотний діапазон', '20–20 000 Гц'],
					['Імпеданс', '32 Ом']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.3'],
					['Кодеки', 'AAC, SBC'],
					['Ігровий режим', 'Так, 60 мс']
				]
			],
			[
				'Шумозаглушення',
				[
					['ANC', 'Ні'],
					['Шумоподавлення мікрофона', 'ENC, 4 мікрофони']
				]
			],
			[
				'Живлення',
				[
					['Робота навушників', '10 год'],
					['З кейсом', '40 год'],
					['Швидка зарядка', '10 хв = 2 год']
				]
			],
			[
				'Корпус',
				[
					['Захист', 'IP67'],
					['Вага навушника', '7,1 г']
				]
			]
		),
		popularity: 84,
		createdAt: '2026-08-20',
		together: ['nordwave-fjord-mini'],
		warrantyMonths: 12
	},
	{
		id: 'p03',
		slug: 'aurel-one',
		name: 'Aurel One',
		brand: 'aurel',
		category: 'navushnyky',
		sub: 'nakladni',
		price: 3999,
		stock: 'in',
		badges: [],
		colors: [c.sand, c.black],
		images: img('aurel-one'),
		alt: 'Накладні бездротові навушники Aurel One',
		short: 'Легкі складні накладні навушники з ANC і 45 годинами роботи.',
		description: [
			'One — компактні накладні навушники, які складаються в долоню. Важать лише 185 г, тож їх не відчуваєш навіть після кількох годин.',
			'Шумозаглушення прибирає гул вентиляції в офісі й шум кав’ярні, а aptX Adaptive тримає стабільне з’єднання.'
		],
		highlights: ['185 г', 'ANC', '45 год роботи', 'aptX Adaptive'],
		facets: {
			type: 'on-ear',
			connection: ['bluetooth', 'wired'],
			anc: true,
			codecs: ['aptX Adaptive', 'AAC', 'SBC'],
			batteryH: 45
		},
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Накладні, закриті'],
					['Драйвер', '32 мм'],
					['Частотний діапазон', '20–20 000 Гц'],
					['Імпеданс', '32 Ом']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.3'],
					['Кодеки', 'aptX Adaptive, AAC, SBC'],
					['Дротове', '3,5 мм']
				]
			],
			['Шумозаглушення', [['ANC', 'Так, feed-forward']]],
			[
				'Живлення',
				[
					['Робота', '45 год (ANC вимк.), 32 год (ANC увімк.)'],
					['Зарядка', 'USB-C, 2 год']
				]
			],
			[
				'Корпус',
				[
					['Вага', '185 г'],
					['Складна конструкція', 'Так']
				]
			]
		),
		popularity: 71,
		createdAt: '2025-11-02',
		together: ['ferro-velour-pads', 'ferro-stand-alu'],
		warrantyMonths: 24
	},
	{
		id: 'p04',
		slug: 'aurel-studio-x',
		name: 'Aurel Studio X',
		brand: 'aurel',
		category: 'navushnyky',
		sub: 'povnorozmirni',
		price: 12999,
		oldPrice: 14499,
		stock: 'in',
		badges: ['hit'],
		colors: [c.graphite, c.silver],
		images: img('aurel-studio-x'),
		alt: 'Повнорозмірні бездротові навушники Aurel Studio X з шумозаглушенням',
		short: 'Флагманські повнорозмірні навушники з адаптивним ANC, LDAC і 40 годинами роботи.',
		description: [
			'Studio X — флагман Aurel. Вісім мікрофонів і окремий процесор шумозаглушення роблять тишу глибшою, ніж у будь-якій попередній моделі бренду.',
			'40-мм драйвери з берилієвим покриттям відтворюють бас без гулу і повітряний верх. Амбушури з піни з пам’яттю форми тримають ізоляцію навіть в окулярах.',
			'USB-C аудіо дозволяє слухати lossless з ноутбука просто по кабелю.'
		],
		highlights: [
			'Адаптивне ANC, 8 мікрофонів',
			'LDAC, aptX Lossless',
			'40 год з ANC',
			'USB-C аудіо 24 біт'
		],
		facets: {
			type: 'over-ear',
			connection: ['bluetooth', 'wired', 'usb'],
			anc: true,
			codecs: ['LDAC', 'aptX Lossless', 'AAC', 'SBC'],
			batteryH: 40
		},
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Повнорозмірні, закриті'],
					['Драйвер', '40 мм, берилієве покриття'],
					['Частотний діапазон', '4–40 000 Гц'],
					['Імпеданс', '32 Ом'],
					['Чутливість', '104 дБ']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.4'],
					['Кодеки', 'LDAC, aptX Lossless, AAC, SBC'],
					['Дротове', '3,5 мм, USB-C аудіо 24 біт / 96 кГц'],
					['Мультипоінт', 'Так']
				]
			],
			[
				'Шумозаглушення',
				[
					['ANC', 'Гібридне, адаптивне'],
					['Мікрофони', '8'],
					['Режим прозорості', 'Так']
				]
			],
			[
				'Живлення',
				[
					['Робота', '40 год (ANC увімк.), 60 год (вимк.)'],
					['Швидка зарядка', '5 хв = 4 год']
				]
			],
			[
				'Корпус',
				[
					['Вага', '254 г'],
					['Матеріали', 'Алюміній, еко-шкіра, піна з пам’яттю форми']
				]
			]
		),
		popularity: 100,
		createdAt: '2026-05-01',
		together: ['ferro-stand-alu', 'kobza-tsap-go', 'ferro-velour-pads'],
		warrantyMonths: 36
	},
	{
		id: 'p05',
		slug: 'kobza-m1-studio',
		name: 'Kobza M1 Studio',
		brand: 'kobza',
		category: 'navushnyky',
		sub: 'povnorozmirni',
		price: 4299,
		stock: 'in',
		badges: [],
		colors: [c.black],
		images: img('kobza-m1-studio'),
		alt: 'Студійні навушники Kobza M1 Studio з дротом',
		short: 'Закриті студійні монітори з рівною АЧХ для зведення і запису.',
		description: [
			'M1 Studio створені для студій звукозапису: рівна частотна характеристика без «прикрашань», щоб чути запис таким, яким він є.',
			'Знімний кабель 3 м з фіксацією, поворотні чашки для моніторингу одним вухом і змінні амбушури, які легко зняти для чищення.'
		],
		highlights: ['Рівна АЧХ', '64 Ом', 'Знімний кабель 3 м', 'Поворотні чашки'],
		facets: { type: 'over-ear', connection: ['wired'], anc: false },
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Повнорозмірні, закриті'],
					['Драйвер', '45 мм'],
					['Частотний діапазон', '10–30 000 Гц'],
					['Імпеданс', '64 Ом'],
					['Чутливість', '98 дБ']
				]
			],
			[
				'Підключення',
				[
					['Роз’єм', '3,5 мм + перехідник 6,3 мм'],
					['Кабель', 'Знімний, 3 м, з фіксацією']
				]
			],
			[
				'Корпус',
				[
					['Вага', '290 г'],
					['Амбушури', 'Змінні, велюр + еко-шкіра в комплекті']
				]
			]
		),
		popularity: 62,
		createdAt: '2025-09-14',
		together: ['kobza-tsap-go', 'ferro-stand-alu'],
		warrantyMonths: 36
	},
	{
		id: 'p06',
		slug: 'kobza-iem-duo',
		name: 'Kobza IEM Duo',
		brand: 'kobza',
		category: 'navushnyky',
		sub: 'vnutrishnokanalni',
		price: 2499,
		oldPrice: 2999,
		stock: 'low',
		badges: [],
		colors: [c.clear, c.smoke],
		images: img('kobza-iem-duo'),
		alt: 'Внутрішньоканальні дротові навушники Kobza IEM Duo',
		short: 'Двоканальні сценічні монітори з гібридною схемою і знімним кабелем.',
		description: [
			'IEM Duo поєднують динамічний драйвер для басу та арматурний для середини й верху. Звук детальний, але не різкий.',
			'Корпуси відлиті за 3D-сканами сотні вушних каналів, тож сидять щільно й ізолюють до −26 дБ без жодної електроніки.'
		],
		highlights: [
			'1 динамічний + 1 арматурний драйвер',
			'Ізоляція до −26 дБ',
			'Кабель 2-pin 0,78 мм'
		],
		facets: { type: 'in-ear', connection: ['wired'], anc: false },
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Внутрішньоканальні монітори'],
					['Драйвери', '10 мм динамічний + арматурний'],
					['Частотний діапазон', '18–24 000 Гц'],
					['Імпеданс', '16 Ом'],
					['Чутливість', '108 дБ']
				]
			],
			[
				'Підключення',
				[
					['Роз’єм', '3,5 мм'],
					['Кабель', 'Знімний, 2-pin 0,78 мм, 1,2 м']
				]
			],
			[
				'Комплектація',
				[
					['Амбушури', '3 пари силікон + 1 пара піна'],
					['Кейс', 'Жорсткий']
				]
			]
		),
		popularity: 55,
		createdAt: '2026-01-25',
		together: ['kobza-tsap-go'],
		warrantyMonths: 12
	},
	{
		id: 'p07',
		slug: 'pulse-lab-raid-7',
		name: 'Pulse Lab Raid 7',
		brand: 'pulse-lab',
		category: 'navushnyky',
		sub: 'ihrovi',
		price: 3499,
		stock: 'in',
		badges: [],
		colors: [c.black, c.white],
		images: img('pulse-lab-raid-7'),
		alt: 'Ігрова бездротова гарнітура Pulse Lab Raid 7 з мікрофоном',
		short: 'Бездротова ігрова гарнітура з радіоканалом 2,4 ГГц і знімним мікрофоном.',
		description: [
			'Raid 7 працює одночасно по 2,4 ГГц з ПК чи консоллю і по Bluetooth з телефоном — можна грати й не пропустити дзвінок.',
			'Затримка до 20 мс, просторовий звук і знімний мікрофон з шумоподавленням для командних ігор.'
		],
		highlights: [
			'2,4 ГГц, затримка 20 мс',
			'50 год роботи',
			'Знімний мікрофон',
			'Просторовий звук'
		],
		facets: {
			type: 'gaming',
			connection: ['radio', 'bluetooth', 'wired'],
			anc: false,
			batteryH: 50
		},
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Повнорозмірна ігрова гарнітура'],
					['Драйвер', '50 мм'],
					['Частотний діапазон', '20–20 000 Гц'],
					['Імпеданс', '32 Ом']
				]
			],
			[
				'Підключення',
				[
					['Радіо', '2,4 ГГц, USB-C донгл'],
					['Bluetooth', '5.3'],
					['Дротове', '3,5 мм']
				]
			],
			[
				'Мікрофон',
				[
					['Тип', 'Знімний, кардіоїдний'],
					['Шумоподавлення', 'Так']
				]
			],
			['Живлення', [['Робота', '50 год']]],
			['Корпус', [['Вага', '310 г']]]
		),
		popularity: 66,
		createdAt: '2026-02-10',
		together: ['ferro-stand-alu'],
		warrantyMonths: 24
	},
	{
		id: 'p08',
		slug: 'nordwave-fjord-mini',
		name: 'Nordwave Fjord Mini',
		brand: 'nordwave',
		category: 'kolonky',
		sub: 'portatyvni',
		price: 1999,
		stock: 'in',
		badges: ['hit'],
		colors: [c.blue, c.black, c.sand],
		images: img('nordwave-fjord-mini'),
		alt: 'Портативна Bluetooth-колонка Nordwave Fjord Mini',
		short: 'Маленька колонка IP67 з ремінцем і 12 годинами роботи.',
		description: [
			'Fjord Mini поміщається в кишеню куртки, а звучить так, наче вдвічі більша, завдяки пасивному випромінювачу.',
			'Колонка плаває у воді, не боїться піску і кріпиться ремінцем до рюкзака чи велосипеда.'
		],
		highlights: ['IP67, плаває', '12 год', '10 Вт', 'Стереопара'],
		facets: {
			type: 'portable',
			connection: ['bluetooth'],
			anc: false,
			batteryH: 12,
			waterproof: 'IP67'
		},
		specs: specs(
			[
				'Звук',
				[
					['Потужність', '10 Вт'],
					['Частотний діапазон', '80–20 000 Гц'],
					['Динаміки', '1 широкосмуговий + пасивний випромінювач']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.3'],
					['Стереопара', 'Так']
				]
			],
			[
				'Живлення',
				[
					['Робота', '12 год'],
					['Зарядка', 'USB-C, 2,5 год']
				]
			],
			[
				'Корпус',
				[
					['Захист', 'IP67'],
					['Вага', '310 г'],
					['Розміри', '95 × 95 × 42 мм']
				]
			]
		),
		popularity: 94,
		createdAt: '2025-12-05',
		together: ['pulse-lab-buds-sport'],
		warrantyMonths: 24
	},
	{
		id: 'p09',
		slug: 'nordwave-fjord-max',
		name: 'Nordwave Fjord Max',
		brand: 'nordwave',
		category: 'kolonky',
		sub: 'portatyvni',
		price: 4999,
		oldPrice: 5799,
		stock: 'in',
		badges: [],
		colors: [c.black, c.green],
		images: img('nordwave-fjord-max'),
		alt: 'Велика портативна колонка Nordwave Fjord Max із захистом від води',
		short: 'Потужна портативна колонка 40 Вт з функцією павербанку.',
		description: [
			'Fjord Max — колонка для компанії: 40 Вт стереозвуку, 20 годин роботи і USB-вихід, щоб зарядити телефон.',
			'Режим «Простір» розширює сцену, коли колонка стоїть посеред галявини чи двору.'
		],
		highlights: ['40 Вт стерео', '20 год', 'IP67', 'Павербанк'],
		facets: {
			type: 'portable',
			connection: ['bluetooth'],
			anc: false,
			batteryH: 20,
			waterproof: 'IP67'
		},
		specs: specs(
			[
				'Звук',
				[
					['Потужність', '40 Вт (2 × 20 Вт)'],
					['Частотний діапазон', '55–20 000 Гц'],
					['Динаміки', '2 широкосмугові + 2 пасивні випромінювачі']
				]
			],
			[
				'Підключення',
				[
					['Bluetooth', '5.3'],
					['Мультирум', 'До 100 колонок Nordwave']
				]
			],
			[
				'Живлення',
				[
					['Робота', '20 год'],
					['USB-вихід', 'Так, 10 Вт']
				]
			],
			[
				'Корпус',
				[
					['Захист', 'IP67'],
					['Вага', '1,4 кг']
				]
			]
		),
		popularity: 80,
		createdAt: '2026-04-18',
		together: ['nordwave-fjord-mini'],
		warrantyMonths: 24
	},
	{
		id: 'p10',
		slug: 'basalt-b2',
		name: 'Basalt B2',
		brand: 'basalt',
		category: 'kolonky',
		sub: 'polychna-akustyka',
		price: 18999,
		stock: 'in',
		badges: [],
		colors: [c.walnut, c.black],
		images: img('basalt-b2'),
		alt: 'Полична акустика Basalt B2, пара пасивних колонок',
		short: 'Двосмугова полична акустика для першої серйозної Hi-Fi системи (ціна за пару).',
		description: [
			'B2 — класична британська полична акустика: 25-мм шовковий твітер, 130-мм вуфер з паперовим дифузором і корпус з МДФ товщиною 18 мм.',
			'Колонки звучать зібрано й музикально на будь-якій гучності — ідеальна пара до програвача вінілу і підсилювача 30–80 Вт.'
		],
		highlights: [
			'Ціна за пару',
			'Шовковий твітер 25 мм',
			'6 Ом, 87 дБ',
			'Рекомендована потужність 30–80 Вт'
		],
		facets: { type: 'bookshelf', connection: ['wired'], anc: false },
		specs: specs(
			[
				'Звук',
				[
					['Тип', 'Пасивна полична, двосмугова'],
					['Динаміки', '25 мм шовк + 130 мм папір'],
					['Частотний діапазон', '50–30 000 Гц'],
					['Імпеданс', '6 Ом'],
					['Чутливість', '87 дБ']
				]
			],
			[
				'Підключення',
				[
					['Клеми', 'Одинарні, під банани і кабель до 4 мм²'],
					['Потужність підсилювача', '30–80 Вт']
				]
			],
			[
				'Корпус',
				[
					['Розміри', '280 × 175 × 230 мм'],
					['Вага', '5,1 кг (1 шт.)']
				]
			]
		),
		popularity: 70,
		createdAt: '2025-10-08',
		together: ['basalt-a40', 'ferro-silver-link', 'ottava-primo'],
		warrantyMonths: 36
	},
	{
		id: 'p11',
		slug: 'lumen-bar-3',
		name: 'Lumen Bar 3',
		brand: 'lumen',
		category: 'kolonky',
		sub: 'saundbary',
		price: 9999,
		stock: 'in',
		badges: ['new'],
		colors: [c.black],
		images: img('lumen-bar-3'),
		alt: 'Саундбар Lumen Bar 3 під телевізором',
		short: 'Саундбар 3.1 з Dolby Atmos, HDMI eARC і посиленням голосу.',
		description: [
			'Bar 3 робить діалоги розбірливими навіть на нічній гучності: окремий центральний канал і режим «Голос» підсилюють мову.',
			'Dolby Atmos та віртуальні висотні канали додають об’єм фільмам, а HDMI eARC дозволяє керувати гучністю пультом від телевізора.'
		],
		highlights: ['3.1, Dolby Atmos', 'HDMI eARC', 'Wi-Fi, AirPlay 2', 'Нічний режим'],
		facets: { type: 'soundbar', connection: ['wifi', 'bluetooth', 'wired'], anc: false },
		specs: specs(
			[
				'Звук',
				[
					['Конфігурація', '3.1, вбудований сабвуфер'],
					['Формати', 'Dolby Atmos, Dolby Digital'],
					['Потужність', '180 Вт']
				]
			],
			[
				'Підключення',
				[
					['HDMI', 'eARC'],
					['Wi-Fi', 'AirPlay 2, Chromecast'],
					['Bluetooth', '5.2'],
					['Оптичний вхід', 'Так']
				]
			],
			[
				'Корпус',
				[
					['Розміри', '820 × 68 × 110 мм'],
					['Вага', '3,2 кг']
				]
			]
		),
		popularity: 76,
		createdAt: '2026-07-30',
		together: ['lumen-home-mini'],
		warrantyMonths: 24
	},
	{
		id: 'p12',
		slug: 'lumen-home-mini',
		name: 'Lumen Home Mini',
		brand: 'lumen',
		category: 'kolonky',
		sub: 'rozumni-kolonky',
		price: 2999,
		stock: 'in',
		badges: [],
		colors: [c.grey, c.graphite],
		images: img('lumen-home-mini'),
		alt: 'Розумна колонка Lumen Home Mini з тканинним корпусом',
		short: 'Компактна Wi-Fi колонка з голосовим керуванням і мультирумом.',
		description: [
			'Home Mini — маленька колонка, яку не шкода поставити на кухні чи у ванній. Звук налаштовується під кімнату автоматично за допомогою мікрофонів.',
			'Дві Home Mini можна об’єднати в стереопару, а з Bar 3 — у домашній кінотеатр.'
		],
		highlights: ['Wi-Fi, AirPlay 2, Chromecast', 'Автокалібрування', 'Стереопара', 'Мультирум'],
		facets: { type: 'smart', connection: ['wifi', 'bluetooth'], anc: false },
		specs: specs(
			[
				'Звук',
				[
					['Динаміки', 'Широкосмуговий 50 мм + твітер'],
					['Автокалібрування', 'Так']
				]
			],
			[
				'Підключення',
				[
					['Wi-Fi', '2,4 / 5 ГГц'],
					['Протоколи', 'AirPlay 2, Chromecast, Spotify Connect'],
					['Bluetooth', '5.2']
				]
			],
			[
				'Корпус',
				[
					['Розміри', 'Ø 98 × 120 мм'],
					['Вага', '640 г'],
					['Вологостійкість', 'Для ванної кімнати']
				]
			]
		),
		popularity: 58,
		createdAt: '2026-03-03',
		together: ['lumen-bar-3'],
		warrantyMonths: 24
	},
	{
		id: 'p13',
		slug: 'ottava-primo',
		name: 'Ottava Primo',
		brand: 'ottava',
		category: 'vinil',
		sub: 'prohravachi',
		price: 11499,
		stock: 'in',
		badges: ['hit'],
		colors: [c.walnut, c.white],
		images: img('ottava-primo'),
		alt: 'Програвач вінілу Ottava Primo з дерев’яним плінтом',
		short: 'Програвач з ремінним приводом, вбудованим фонокоректором і Bluetooth-виходом.',
		description: [
			'Primo — програвач, з якого зручно почати: головку вже встановлено й налаштовано на заводі, а вбудований фонокоректор дозволяє підключити його до будь-яких активних колонок.',
			'Алюмінієвий диск і тонарм з вуглецевого волокна мінімізують вібрації, а Bluetooth-вихід передає звук на бездротові навушники чи колонку.'
		],
		highlights: [
			'Ремінний привід',
			'Вбудований фонокоректор',
			'Головка MM встановлена',
			'Bluetooth-вихід aptX'
		],
		facets: { type: 'turntable', connection: ['wired', 'bluetooth'], anc: false },
		specs: specs(
			[
				'Механіка',
				[
					['Привід', 'Ремінний'],
					['Швидкості', '33⅓ і 45 об/хв'],
					['Тонарм', 'Вуглецеве волокно, 8,6"'],
					['Головка', 'MM, еліптична голка']
				]
			],
			[
				'Звук',
				[
					['Фонокоректор', 'Вбудований, вимикається'],
					['Детонація', '0,12%']
				]
			],
			[
				'Підключення',
				[
					['Виходи', 'RCA (Phono/Line)'],
					['Bluetooth', '5.2, aptX']
				]
			],
			[
				'Корпус',
				[
					['Плінт', 'МДФ, шпон горіха'],
					['Вага', '6,4 кг']
				]
			]
		),
		popularity: 88,
		createdAt: '2025-11-20',
		together: ['vinylka-delta-lp', 'ottava-clean-kit', 'basalt-b2'],
		warrantyMonths: 36
	},
	{
		id: 'p14',
		slug: 'vinylka-delta-lp',
		name: 'Ліс Тиші — «Дельта» (2LP)',
		brand: 'vinylka',
		category: 'vinil',
		sub: 'vinilovi-plativky',
		price: 1299,
		stock: 'low',
		badges: ['new'],
		colors: [
			{ id: 'chornyi-vinil', name: 'Чорний вініл', hex: '#141518' },
			{ id: 'synii-vinil', name: 'Синій вініл', hex: '#2b4bd8' }
		],
		images: img('vinylka-delta-lp'),
		alt: 'Вінілова платівка «Дельта» гурту Ліс Тиші',
		short: 'Подвійний альбом київського ембієнт-гурту на вінілі 180 г.',
		description: [
			'«Дельта» — другий альбом Ліс Тиші: дев’ять композицій, записаних наживо в соборі святого Миколая в Києві.',
			'Мастеринг окремо для вінілу, друк 180 г, розворотна обкладинка і завантаження цифрової версії в комплекті.'
		],
		highlights: [
			'2LP, 180 г',
			'Мастеринг для вінілу',
			'Наклад 1000 копій',
			'Цифрова версія в комплекті'
		],
		facets: { type: 'record', connection: [], anc: false },
		specs: specs(
			[
				'Видання',
				[
					['Формат', '2 × LP, 33⅓ об/хв'],
					['Вага', '180 г'],
					['Наклад', '1000 копій'],
					['Рік', '2026']
				]
			],
			[
				'Вміст',
				[
					['Треків', '9'],
					['Тривалість', '62 хв'],
					['Жанр', 'Ембієнт, неокласика']
				]
			]
		),
		popularity: 60,
		createdAt: '2026-09-01',
		together: ['ottava-primo', 'ottava-clean-kit'],
		warrantyMonths: 0
	},
	{
		id: 'p15',
		slug: 'ottava-clean-kit',
		name: 'Ottava Clean Kit',
		brand: 'ottava',
		category: 'vinil',
		sub: 'aksesuary-dlia-vinilu',
		price: 899,
		stock: 'in',
		badges: [],
		colors: [c.black],
		images: img('ottava-clean-kit'),
		alt: 'Чиста вінілова платівка крупним планом — для неї створено набір Ottava Clean Kit',
		short: 'Карбонова антистатична щітка, рідина для миття та мікрофібра.',
		description: [
			'Усе, щоб платівки звучали чисто: карбонова щітка знімає статику і пил перед кожним прослуховуванням, а рідина на спиртовій основі відмиває борозенки раз на кілька місяців.',
			'Вистачає приблизно на 200 платівок.'
		],
		highlights: ['Карбонова щітка', 'Рідина 100 мл', 'Мікрофібра', 'Щіточка для голки'],
		facets: { type: 'care', connection: [], anc: false },
		specs: specs([
			'Комплектація',
			[
				['Щітка', 'Карбонова, антистатична'],
				['Рідина', '100 мл'],
				['Серветка', 'Мікрофібра 30 × 30 см'],
				['Щіточка для голки', 'Так']
			]
		]),
		popularity: 52,
		createdAt: '2025-08-30',
		together: ['vinylka-delta-lp', 'ottava-primo'],
		warrantyMonths: 0
	},
	{
		id: 'p16',
		slug: 'basalt-a40',
		name: 'Basalt A40',
		brand: 'basalt',
		category: 'pidsylyuvachi-ta-tsap',
		sub: 'pidsylyuvachi',
		price: 16499,
		stock: 'in',
		badges: [],
		colors: [c.silver, c.black],
		images: img('basalt-a40'),
		alt: 'Інтегрований стерео-підсилювач Basalt A40',
		short: 'Інтегрований підсилювач 2 × 40 Вт з фонокоректором, ЦАП і Bluetooth aptX HD.',
		description: [
			'A40 — центр компактної Hi-Fi системи: фонокоректор MM для програвача, оптичний і коаксіальний входи для телевізора, USB-ЦАП для комп’ютера та Bluetooth для телефона.',
			'Підсилювач класу AB з тороїдальним трансформатором дає щільний, контрольований бас навіть на поличній акустиці.'
		],
		highlights: [
			'2 × 40 Вт, клас AB',
			'Фонокоректор MM',
			'USB-ЦАП 32 біт / 384 кГц',
			'Вихід на навушники'
		],
		facets: { type: 'amplifier', connection: ['wired', 'bluetooth', 'usb'], anc: false },
		specs: specs(
			[
				'Підсилювач',
				[
					['Потужність', '2 × 40 Вт / 8 Ом, 2 × 60 Вт / 4 Ом'],
					['Клас', 'AB'],
					['Коефіцієнт гармонік', '0,02%']
				]
			],
			[
				'Входи',
				[
					['Аналогові', 'Phono MM, 3 × RCA лінійні'],
					['Цифрові', 'Оптичний, коаксіальний, USB-B'],
					['Bluetooth', 'aptX HD']
				]
			],
			[
				'Виходи',
				[
					['Навушники', '6,3 мм'],
					['Pre-out', 'Так']
				]
			],
			[
				'Корпус',
				[
					['Розміри', '430 × 95 × 330 мм'],
					['Вага', '8,2 кг']
				]
			]
		),
		popularity: 64,
		createdAt: '2025-10-15',
		together: ['basalt-b2', 'ferro-silver-link', 'ottava-primo'],
		warrantyMonths: 36
	},
	{
		id: 'p17',
		slug: 'kobza-tsap-go',
		name: 'Kobza DAC Go',
		brand: 'kobza',
		category: 'pidsylyuvachi-ta-tsap',
		sub: 'tsap',
		price: 3299,
		stock: 'in',
		badges: ['new'],
		colors: [c.steel],
		images: img('kobza-tsap-go'),
		alt: 'Портативний ЦАП-підсилювач для навушників Kobza DAC Go',
		short: 'Портативний ЦАП-підсилювач з балансним виходом 4,4 мм для телефона і ноутбука.',
		description: [
			'DAC Go розміром із флешку, але потужності вистачає навіть для студійних навушників на 300 Ом. Два виходи — 3,5 мм і балансний 4,4 мм.',
			'Підтримує файли до 32 біт / 384 кГц і MQA, працює з Android, iPhone з USB-C, Mac і Windows без драйверів.'
		],
		highlights: [
			'32 біт / 384 кГц',
			'Вихід 3,5 мм + 4,4 мм балансний',
			'200 мВт на 32 Ом',
			'USB-C'
		],
		facets: { type: 'dac', connection: ['usb'], anc: false },
		specs: specs(
			[
				'ЦАП',
				[
					['Роздільність', 'До 32 біт / 384 кГц, DSD256'],
					['Співвідношення сигнал/шум', '125 дБ']
				]
			],
			[
				'Підсилювач',
				[
					['Потужність', '200 мВт / 32 Ом (баланс)'],
					['Навушники', '16–300 Ом']
				]
			],
			[
				'Підключення',
				[
					['Вхід', 'USB-C'],
					['Виходи', '3,5 мм, 4,4 мм балансний']
				]
			],
			[
				'Корпус',
				[
					['Розміри', '52 × 22 × 11 мм'],
					['Вага', '18 г']
				]
			]
		),
		popularity: 68,
		createdAt: '2026-06-12',
		together: ['kobza-iem-duo', 'kobza-m1-studio'],
		warrantyMonths: 24
	},
	{
		id: 'p18',
		slug: 'ferro-silver-link',
		name: 'Ferro Silver Link RCA',
		brand: 'ferro',
		category: 'aksesuary',
		sub: 'kabeli',
		price: 1199,
		stock: 'in',
		badges: [],
		colors: [c.black],
		images: img('ferro-silver-link'),
		alt: 'Міжблочний аудіокабель Ferro Silver Link з роз’ємами RCA',
		short: 'Міжблочний кабель RCA–RCA 1 м з посрібленою міддю і подвійним екраном.',
		description: [
			'Silver Link з’єднує програвач з підсилювачем чи ЦАП з колонками без втрат і фонового гулу.',
			'Посріблена мідь, подвійне екранування і позолочені роз’єми з цангою для щільного контакту.'
		],
		highlights: ['Довжина 1 м', 'Посріблена мідь', 'Подвійний екран', 'Позолочені RCA'],
		facets: { type: 'cable', connection: ['wired'], anc: false },
		specs: specs([
			'Кабель',
			[
				['Тип', 'RCA – RCA, стерео'],
				['Довжина', '1 м'],
				['Провідник', 'Посріблена безкиснева мідь'],
				['Екранування', 'Подвійне (фольга + обплетення)']
			]
		]),
		popularity: 48,
		createdAt: '2025-07-01',
		together: ['basalt-a40', 'ottava-primo'],
		warrantyMonths: 24
	},
	{
		id: 'p19',
		slug: 'ferro-velour-pads',
		name: 'Ferro Velour Pads',
		brand: 'ferro',
		category: 'aksesuary',
		sub: 'ambushury',
		price: 799,
		stock: 'in',
		badges: [],
		colors: [c.black, c.grey],
		images: img('ferro-velour-pads'),
		alt: 'Змінні велюрові амбушури Ferro Velour Pads для навушників',
		short: 'Велюрові амбушури з піною з пам’яттю форми для навушників 90–105 мм.',
		description: [
			'Дихаючий велюр не пітніє влітку, а піна з пам’яттю форми повторює контур голови й окулярів.',
			'Еластична основа підходить до більшості повнорозмірних навушників з овальними чашками.'
		],
		highlights: ['Велюр', 'Піна з пам’яттю форми', 'Діаметр 90–105 мм'],
		facets: { type: 'pads', connection: [], anc: false },
		specs: specs([
			'Амбушури',
			[
				['Матеріал', 'Велюр, піна з пам’яттю форми'],
				['Сумісність', 'Овальні чашки 90–105 мм'],
				['Товщина', '22 мм'],
				['Комплект', '1 пара']
			]
		]),
		popularity: 40,
		createdAt: '2025-06-18',
		together: ['aurel-one', 'kobza-m1-studio'],
		warrantyMonths: 6
	},
	{
		id: 'p20',
		slug: 'ferro-stand-alu',
		name: 'Ferro Stand Alu',
		brand: 'ferro',
		category: 'aksesuary',
		sub: 'pidstavky',
		price: 1499,
		stock: 'out',
		badges: [],
		colors: [c.silver, c.black],
		images: img('ferro-stand-alu'),
		alt: 'Алюмінієва підставка для навушників Ferro Stand Alu',
		short: 'Підставка з анодованого алюмінію з силіконовою вставкою для оголов’я.',
		description: [
			'Цільний алюміній і важка основа: навушники не перекинуться, а оголов’я зберігає форму.',
			'Силіконова вставка не дряпає покриття, гумові ніжки не ковзають по столу.'
		],
		highlights: ['Анодований алюміній', 'Силіконова вставка', 'Висота 270 мм'],
		facets: { type: 'stand', connection: [], anc: false },
		specs: specs([
			'Підставка',
			[
				['Матеріал', 'Анодований алюміній'],
				['Висота', '270 мм'],
				['Вага', '420 г'],
				['Сумісність', 'Будь-які повнорозмірні навушники']
			]
		]),
		popularity: 45,
		createdAt: '2025-05-02',
		together: ['aurel-studio-x'],
		warrantyMonths: 12
	}
];

export const productBySlug = new Map(products.map((p) => [p.slug, p]));
