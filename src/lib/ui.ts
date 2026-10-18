/**
 * Рядки інтерфейсу «Хвилі» українською та англійською. Тип — з української версії.
 * `t` — жива прив’язка: після setLang() усі компоненти бачать потрібну мову (див. #lib/lang.ts).
 */
import { onLang } from '#lib/lang-core.ts';

export const tUk = {
	skip: 'Перейти до вмісту',
	home: 'Головна',
	brand: 'Хвиля',
	brandSuffix: '| Хвиля',
	q: (s: string) => `«${s}»`,
	close: 'Закрити',
	nothing: 'Нічого не знайдено',
	qty: 'Кількість',
	less: 'Зменшити',
	more: 'Збільшити',
	phone: 'Телефон',
	pcs: 'шт.',
	free: 'безкоштовно',
	byTariff: 'за тарифами НП',
	toPay: 'До сплати',
	total: 'Разом',
	discount: 'Знижка',
	delivery: 'Доставка',
	inCart: 'У кошик',
	added: 'Додано',
	toCatalog: 'До каталогу',
	toHome: 'На головну',
	priceSale: 'Ціна зі знижкою: ',
	priceOld: 'Стара ціна: ',
	answers: 'Відповіді',
	waitCall: 'Чекаю дзвінка',
	rating: (v: string, count?: number) =>
		`Рейтинг ${v} з 5${count !== undefined ? `, ${count} відгуків` : ''}`,
	productInfo: 'Інформація про товар',
	range: {
		price: 'Ціна',
		min: 'Мінімальна',
		max: 'Максимальна',
		from: 'Від',
		to: 'До',
		uah: (v: string) => `${v} грн`
	},
	pages: {
		nav: 'Сторінки каталогу',
		prev: 'Попередня сторінка',
		next: 'Наступна сторінка',
		page: (p: number) => `Сторінка ${p}`
	},
	crumbs: 'Хлібні крихти',
	search: {
		label: 'Пошук по сайту',
		sr: 'Пошук товарів',
		placeholder: 'Навушники, колонка, програвач…',
		clear: 'Очистити пошук',
		recent: 'Нещодавно шукали',
		hints: 'Підказки пошуку',
		products: 'Товари',
		none: (q: string) => `Нічого не знайдено за «${q}». Спробуйте «навушники» або назву бренду.`,
		all: (q: string) => `Усі результати за «${q}» →`,
		errorPage: 'Пошук на сторінці помилки'
	},
	nf: {
		title: 'Сторінку не знайдено',
		error: 'Помилка',
		h1: 'Тут тиша',
		h1Error: 'Щось пішло не так',
		text: 'Такої сторінки немає — можливо, товар зняли з продажу або посилання застаріло. Спробуйте пошук:',
		textShort: 'Такої сторінки немає — можливо, товар зняли з продажу або посилання застаріло.',
		home: 'На головну'
	},
	infoLinks: [
		{ href: '/dostavka-i-oplata', label: 'Доставка і оплата' },
		{ href: '/harantiia-ta-povernennia', label: 'Гарантія та повернення' },
		{ href: '/faq', label: 'Питання та відповіді' },
		{ href: '/pro-nas', label: 'Про нас' },
		{ href: '/kontakty', label: 'Контакти' },
		{ href: '/polityka-konfidentsiinosti', label: 'Політика конфіденційності' }
	],
	footer: {
		about: 'Офіційна гарантія, доставка Новою Поштою по всій Україні.',
		demo: 'Демо-магазин для портфоліо. Замовлення не обробляються, оплата не списується.',
		catalog: 'Каталог',
		brands: 'Бренди',
		buyers: 'Покупцям',
		expert: 'Аудіо-експерт',
		freeCall: (hours: string) => `${hours}, безкоштовно по Україні`,
		showroom: (city: string, street: string) => `Шоурум: ${city}, ${street}`,
		photos: 'Фото: Unsplash'
	},
	menu: {
		title: 'Меню',
		close: 'Закрити меню',
		allCats: 'Усі категорії',
		all: (name: string) => `Усі ${name.toLowerCase()}`,
		catalog: 'Каталог',
		brands: 'Бренди',
		buyers: 'Покупцям'
	},
	toastClose: 'Закрити повідомлення',
	header: {
		menu: 'Меню',
		home: '«Хвиля» — на головну',
		search: 'Пошук',
		compare: 'Порівняння',
		wishlist: 'Обране',
		cart: 'Кошик',
		switchLabel: 'English version'
	},
	mega: {
		catalog: 'Каталог',
		nav: 'Каталог товарів',
		allBrands: 'Усі бренди',
		sections: 'Розділи',
		all: (name: string) => `Усі ${name.toLowerCase()}`,
		brands: 'Бренди',
		popular: 'Обирають найчастіше'
	},
	landing: {
		places: ['Метро', 'Літак', 'Офіс'],
		ip: [
			{ text: 'Піт і бризки', use: 'Зал, прогулянки' },
			{ text: 'Струмінь води', use: 'Біг під дощем' },
			{ text: 'Пил і вода', use: 'Трейл, вело' },
			{ text: 'Занурення до 1 м', use: 'Можна промити' }
		],
		withCase: 'з кейсом',
		onEar: 'Накладні',
		sizes: ['Міні', 'Середня', 'Велика'],
		chain: ['Програвач', 'Фонокоректор', 'Підсилювач', 'Колонки'],
		noiseCap: 'Рівень шуму, дБ',
		noAnc: 'Без ANC',
		withAnc: 'З ANC',
		noiseTable: 'Рівень шуму без і з шумозаглушенням, дБ',
		place: 'Місце',
		noiseNote: 'Мінус 25–30 дБ — це як вчетверо тихіше на слух.',
		ipCap: 'Захист від води й поту',
		ipNote: 'Для залу вистачить IPX4. Бігаєте в будь-яку погоду — беріть від IPX5.',
		hoursCap: 'Скільки годин музики, год',
		oneCharge: 'Від одного заряду',
		fromCase: 'Підзарядка з кейсу',
		hoursLine: (b: number, extra: number, label: string) =>
			`: ${b} год від заряду${extra ? `, ще ${extra} год ${label}` : ''}`,
		budgetNote: 'До 3000 ₴ уже є кодек AAC, мультипоінт і заряд через USB-C.',
		stereoCap: 'Стереотрикутник: як поставити колонки',
		stereoAria:
			'Дві колонки й місце слухача утворюють рівносторонній трикутник зі сторонами близько 2,5 м; колонки трохи розвернуті до слухача',
		m25: '2,5 м',
		you: 'Ви',
		stereoNote: 'Колонки — на рівні вух і щонайменше 30 см від стіни: бас стане чистішим.',
		sizeCap: 'Що дає більший корпус',
		sizeTable: 'Типова потужність і автономність портативних колонок',
		size: 'Розмір',
		power: 'Потужність, Вт',
		battery: 'Автономність, год',
		sizeNote: 'Для пікніка вистачить 20 Вт; міні-колонка — для душу й велосипеда.',
		chainCap: 'Шлях сигналу від платівки до колонок',
		builtIn: 'часто вбудований',
		chainNote:
			'Фонокоректор підсилює слабкий сигнал голки. Є в програвачі — колонки можна підключати одразу.',
		ohmCap: 'Опір навушників, Ом',
		ohm: ' Ом',
		ohmLow: 'Телефон і ноутбук впораються',
		ohmMid: 'Бажано',
		ohmHigh: 'Потрібен підсилювач',
		ohmNote: 'Студійні моделі на 250–300 Ом розкриваються лише з окремим підсилювачем.'
	},
	category: {
		inSection: 'у розділі',
		subs: 'Підрозділи',
		guide: 'Довідка',
		collapse: 'Згорнути',
		readMore: 'Читати далі',
		faq: 'Питання й відповіді'
	},
	catalog: {
		found: (g: string) => `Знайдено ${g}`,
		nothingFiltered: 'За цими фільтрами нічого не знайдено',
		anc: 'З шумозаглушенням',
		inStock: 'В наявності',
		ratingFrom: (r: number) => `Рейтинг від ${r}`,
		filters: 'Фільтри',
		searching: 'Шукаємо…',
		sort: 'Сортування',
		view: 'Вигляд списку',
		grid: 'Сітка',
		list: 'Список',
		removeFilter: (l: string) => `Прибрати фільтр: ${l}`,
		reset: 'Скинути все',
		products: 'Товари',
		loadError: (e: string) => `Не вдалося завантажити товари: ${e}. Спробуйте оновити сторінку.`,
		loading: 'Завантаження товарів',
		showMore: (n: number) => `Показати ще ${n}`,
		emptyTitle: 'Нічого не знайдено',
		emptyText: 'Спробуйте прибрати частину фільтрів або розширити діапазон ціни.',
		resetFilters: 'Скинути фільтри',
		closeFilters: 'Закрити фільтри',
		resetShort: 'Скинути',
		show: (n: string) => `Показати ${n}`
	},
	filter: {
		anc: 'Активне шумозаглушення',
		inStock: 'Лише в наявності',
		rating: 'Рейтинг',
		any: 'Будь-який',
		from: (v: string) => `від ${v} ★`,
		price: 'Ціна, ₴',
		brand: 'Бренд',
		type: 'Тип',
		conn: 'Підключення',
		ancTitle: 'Шумозаглушення',
		color: 'Колір',
		stock: 'Наявність'
	},
	mini: {
		close: 'Закрити кошик',
		title: 'Кошик',
		withPromo: (p: string) => `з урахуванням промокоду ${p}`,
		toCart: 'До кошика',
		checkout: 'Оформити',
		empty: 'Кошик порожній',
		emptyText: 'Почніть з навушників — у нас є з чого обрати.'
	},
	undo: { removed: 'Товар видалено', restored: 'Товар повернуто в кошик', undo: 'Скасувати' },
	cartRow: {
		remove: (n: string, c: string) => `Видалити: ${n}, ${c}`,
		removed: (n: string) => `${n} видалено з кошика`,
		qty: (n: string) => `Кількість: ${n}`
	},
	card: {
		new: 'Новинка',
		hit: 'Хіт',
		wish: (n: string) => `В обране: ${n}`,
		compare: (n: string) => `Порівняти: ${n}`,
		outAria: (n: string) => `${n}: немає в наявності`,
		addAria: (n: string) => `У кошик: ${n}`,
		colors: 'Кольори',
		out: 'Немає в наявності',
		low: 'Закінчується'
	},
	promo: {
		empty: 'Введіть промокод',
		wrong: 'Такого промокоду немає. Спробуйте HVYLIA10',
		applied: 'Промокод застосовано',
		remove: 'Прибрати промокод',
		label: 'Промокод',
		apply: 'Застосувати'
	},
	gallery: {
		alt: (n: string, i: number, total: number) => `${n} — фото ${i} з ${total}`,
		photos: 'Фото товару',
		photo: (i: number, n: number) => `Фото ${i} з ${n}`,
		fullscreen: 'Відкрити фото на весь екран',
		close: 'Закрити перегляд',
		title: (n: string, i: number, total: number) => `${n}: фото ${i} з ${total}`,
		role: 'галерея',
		prev: 'Попереднє фото',
		next: 'Наступне фото'
	},
	reviews: {
		errName: 'Вкажіть ім’я',
		errRating: 'Поставте оцінку',
		errText: 'Розкажіть трохи більше — хоча б 20 символів',
		count: (n: number) => `${n} відгуків`,
		filter: 'Фільтр за оцінкою',
		write: 'Написати відгук',
		thanks: (n: string) =>
			`Дякуємо! Відгук на «${n}» з’явиться після модерації (це демо — насправді він нікуди не надсилається).`,
		yours: (n: string) => `Ваш відгук про ${n}`,
		name: 'Ім’я',
		rating: 'Оцінка',
		of5: (s: number) => `${s} з 5`,
		text: 'Відгук',
		send: 'Надіслати відгук',
		verified: 'Підтверджена покупка',
		pros: 'Переваги',
		cons: 'Недоліки',
		none: 'Відгуків з такою оцінкою поки немає.'
	},
	anc: {
		aria: 'Активне шумозаглушення (ANC)',
		state: (on: boolean) => `ANC ${on ? 'увімкнено' : 'вимкнено'}`,
		cabin: 'Рівень шуму в салоні літака',
		db: ' дБ',
		on: 'Двигуни й вентиляція зникають — лишається тиха музика.',
		off: 'Гул двигунів, вентиляція, розмови поруч. Увімкніть ANC.'
	},
	ship: {
		left: 'до безкоштовної доставки',
		more: 'Ще',
		free: 'Доставка безкоштовна',
		aria: 'До безкоштовної доставки',
		leftText: (p: string) => `Залишилось ${p}`,
		freeText: 'Безкоштовна доставка'
	},
	fr: { measuring: 'вимірюємо', range: '20 Гц – 20 кГц' },
	actions: {
		added: (n: string, c: number) => `${n} додано в кошик. У кошику ${c} шт.`,
		wishOn: (n: string) => `«${n}» в обраному`,
		wishOff: (n: string) => `«${n}» прибрано з обраного`,
		open: 'Відкрити',
		compareLimit: 'Порівнювати можна до 4 товарів. Приберіть один зі списку.',
		toCompare: 'До порівняння',
		compareOn: (n: string) => `«${n}» додано до порівняння`,
		compareOff: (n: string) => `«${n}» прибрано з порівняння`,
		compare: 'Порівняти'
	},
	seo: {
		siteName: (s: string) => `«${s}» — аудіотехніка`,
		ogLocale: 'uk_UA',
		inLanguage: 'uk-UA'
	},
	api: {
		unavailable: (s: number) => `Каталог недоступний (${s})`,
		empty: 'Кошик порожній',
		name: 'Вкажіть ім’я',
		phone: 'Номер неповний',
		check: 'Перевірте дані замовлення'
	},
	sets: { travel: 'Для подорожей', home: 'Для дому', vinyl: 'Перший вініл' },
	order: {
		title: (id: string) => `Замовлення ${id} | Хвиля`,
		description: 'Підтвердження замовлення в магазині «Хвиля».',
		h1: 'Дякуємо, замовлення прийнято',
		number: 'Номер замовлення',
		ttn: (phone: string) => `. Ми надішлемо ТТН у SMS на ${phone}.`,
		demo: 'Це демо-замовлення: воно не обробляється, гроші не списано, товари не будуть відправлені.',
		items: 'Склад замовлення',
		recipient: 'Отримувач',
		payment: 'Оплата',
		back: 'Повернутися до покупок',
		notFound: 'Замовлення не знайдено',
		notFoundText:
			'Демо-замовлення зберігаються лише в цьому браузері. Можливо, ви відкрили посилання на іншому пристрої.'
	},
	homePage: {
		curves: {
			'aurel-studio-x':
				'Зібраний бас, рівна середина, повітряний верх. Звук для довгого прослуховування.',
			'aurel-air-pro': 'Більше басу й енергії — під метро, спорт і поп-музику.',
			'kobza-m1-studio': 'Майже рівна лінія: монітори для зведення, нічого не прикрашають.',
			'pulse-lab-raid-7': 'Підкреслені низи й верхи: кроки й постріли чути чіткіше.'
		} as Record<string, string>,
		callError: 'Вкажіть номер повністю',
		emailError: 'Перевірте адресу email',
		sets: [
			{ title: 'Для подорожей', text: 'Шумозаглушення й автономність на весь переліт' },
			{ title: 'Для дому', text: 'Полична акустика, саундбари й розумні колонки' },
			{ title: 'Перший вініл', text: 'Програвач, платівка й догляд — усе для старту' }
		],
		title: 'Хвиля — купити навушники, колонки, програвачі вінілу в Україні',
		description:
			'Магазин аудіотехніки «Хвиля»: бездротові навушники з шумозаглушенням, портативні колонки, полична акустика і вініл. Гарантія до 3 років, 30 днів на повернення.',
		h1: 'Аудіотехніка, в якій чути різницю',
		lead: 'Навушники, колонки й вініл з офіційною гарантією до 3 років. Перед покупкою — консультація аудіо-експерта.',
		allHeadphones: 'Усі навушники',
		frLabel: (n: string) =>
			`Частотна характеристика ${n}: рівний бас, підйом близько 3 кГц, плавний спад на верхах`,
		cats: 'Що шукаєте?',
		compare: 'Порівняйте, як вони звучать',
		compareText:
			'Графік показує, які частоти модель підсилює. Наведіть курсор — побачите рівень на будь-якій частоті.',
		model: 'Модель на графіку',
		compareLabel: 'Порівняння частотних характеристик чотирьох навушників',
		hits: 'Обирають найчастіше',
		back: 'Прокрутити назад',
		fwd: 'Прокрутити вперед',
		hitsAria: 'Хіти продажів',
		ancTitle: 'Тиша — теж частина звуку',
		ancText:
			'Активне шумозаглушення прибирає гул транспорту, тому музику можна слухати тихіше й довше.',
		ancLink: 'Навушники з шумозаглушенням',
		setsTitle: 'Готові добірки',
		brands: 'Бренди',
		reviews: 'Що кажуть покупці',
		about: 'про',
		prevReview: 'Попередній відгук',
		nextReview: 'Наступний відгук',
		consult: 'Консультація і розсилка',
		expertTitle: 'Не знаєте, що обрати? Спитайте аудіо-експерта',
		expertText:
			'Наші консультанти — звукорежисери й музиканти. Підберемо навушники під ваш телефон і музику.',
		callMe: 'Замовити дзвінок',
		newsTitle: 'Листи для уважних слухачів',
		newsText: 'Огляди новинок і розбори кодеків — двічі на місяць.',
		newsDone: 'Готово! Перший лист прийде у вівторок. Це демо — адреса нікуди не надсилається.',
		email: 'Ваш email',
		newsDemo: 'Демо-форма: адреса не зберігається.',
		subscribe: 'Підписатися',
		callTitle: 'Замовити дзвінок аудіо-експерта',
		callDone:
			'Дякуємо! Експерт передзвонить протягом 15 хвилин (демо — номер нікуди не надсилається).',
		callText: (hours: string) => `Передзвонимо протягом 15 хвилин у робочий час (${hours}).`
	},
	brandsPage: {
		title: 'Бренди аудіотехніки — навушники, колонки, вініл | Хвиля',
		description:
			'Усі бренди «Хвилі»: навушники Aurel і Kobza Audio, колонки Nordwave і Lumen, вініл Ottava, Hi-Fi Basalt. Офіційна гарантія.',
		h1: 'Бренди',
		lead: 'Ми працюємо напряму з виробниками — тому даємо офіційну гарантію і знаємо кожну модель зсередини.',
		meta: (country: string, founded: number, goods: string) =>
			`${country} · з ${founded} · ${goods}`
	},
	brandPage: {
		notFound: 'Такого бренду немає',
		eyebrow: (country: string, founded: number) => `${country} · з ${founded}`,
		title: (n: string) => `${n} — офіційна гарантія, ціни | Хвиля`,
		description: (n: string, country: string, tagline: string) =>
			`${n} (${country}): ${tagline.toLowerCase()}. Техніка ${n} з офіційною гарантією, доставка по Україні, 30 днів на повернення.`,
		about: (n: string) => `Про ${n}`
	},
	catPage: {
		notFound: 'Такої категорії немає',
		subNotFound: 'Такого розділу немає',
		subTitle: (h1: string) => `${h1} — купити в Україні, ціни | Хвиля`,
		subDescription: (h1: string, lead: string) =>
			`${h1}: ${lead.charAt(0).toLowerCase()}${lead.slice(1)} Офіційна гарантія, безкоштовна доставка від 3000 грн.`
	},
	product: {
		notFound: 'Такого товару немає',
		ocError: 'Вкажіть номер повністю: +380 (XX) XXX-XX-XX',
		tabs: {
			opys: 'Опис',
			kharakterystyky: 'Характеристики',
			vidhuky: 'Відгуки',
			pytannia: 'Питання'
		} as Record<string, string>,
		title: (n: string, price: string) => `${n} — купити, ціна ${price} | Хвиля`,
		description: (n: string, short: string, months: number) =>
			`${n}: ${short} Офіційна гарантія ${Math.round(months / 12) || ''}${months >= 12 ? ' р.' : ''}, доставка по Україні, 30 днів на повернення.`,
		code: (id: string) => `Код: ${id}`,
		out: 'Немає в наявності',
		low: 'Закінчується — залишилось кілька штук',
		in: 'В наявності, відправимо сьогодні',
		color: 'Колір:',
		wish: 'В обране',
		compare: 'Порівняти',
		oneClick: 'Купити в 1 клік',
		npTitle: 'Доставка Новою Поштою за 1–3 дні.',
		freeThis: 'Безкоштовно для цього товару.',
		freeFrom: (n: number) => `Безкоштовно від ${n} ₴.`,
		warranty: (m: number) => `Офіційна гарантія ${m} міс.`,
		warrantyText: 'Обмін у сервісі виробника.',
		returns: (d: number) => `${d} днів на повернення`,
		returnsText: 'без пояснення причин.',
		terms: 'Умови',
		keySpecs: 'Ключові характеристики',
		sounds: (n: string) => `Як звучить ${n}`,
		frText:
			'Частотна характеристика: які частоти модель підсилює, а які приглушує. Наведіть курсор, щоб побачити рівень на будь-якій частоті.',
		frLabel: (n: string) => `Частотна характеристика ${n} у порівнянні зі схожими моделями`,
		frDemo: 'Демонстраційні дані, побудовані за типовими рисами класу пристроїв.',
		details: 'Детальна інформація',
		noQuestions:
			'Питань ще немає. Зателефонуйте аудіо-експерту: 0 800 33 41 77 — відповімо одразу.',
		blocks: { together: 'З цим купують', similar: 'Схожі товари', recent: 'Ви переглядали' },
		ocDone: 'Дякуємо! Аудіо-експерт передзвонить протягом 10 хвилин, щоб підтвердити замовлення.',
		ocDemo: 'Це демо: номер нікуди не надсилається.',
		ocText: (n: string, color: string, qty: number) =>
			`${n}, ${color.toLowerCase()} · ${qty} шт. Залиште номер — ми передзвонимо й оформимо замовлення за вас.`,
		ocDemoShort: 'Демо-магазин: дані не надсилаються.'
	},
	checkout: {
		err: {
			name: 'Вкажіть ім’я',
			letters: 'Лише літери',
			surname: 'Вкажіть прізвище — як у документі для Нової Пошти',
			phoneShort: 'Номер неповний: +380 (XX) XXX-XX-XX',
			phone: 'Вкажіть телефон — на нього прийде ТТН',
			email: 'Перевірте адресу email',
			city: 'Оберіть місто зі списку',
			postomat: 'Оберіть поштомат',
			warehouse: 'Оберіть відділення',
			street: 'Вкажіть вулицю',
			house: 'Вкажіть будинок',
			cardBad: 'Некоректний номер (для демо: 4242 4242 4242 4242)',
			card: 'Вкажіть номер картки',
			expBad: 'Строк минув або невірний',
			exp: 'ММ/РР',
			cvv: '3 цифри',
			check: 'Перевірте виділені поля',
			failed: 'Не вдалося оформити замовлення. Спробуйте ще раз.'
		},
		methodNames: {
			warehouse: 'Відділення Нової Пошти',
			postomat: 'Поштомат Нової Пошти',
			courier: 'Кур’єр Нової Пошти'
		},
		flat: (f: string) => `, кв. ${f}`,
		payNames: {
			card: 'Карткою онлайн (демо)',
			cod: 'При отриманні',
			parts: (n: string) => `Оплата частинами на ${n} платежі (демо)`
		},
		methods: [
			{ label: 'Відділення', hint: 'від 70 ₴, 1–3 дні' },
			{ label: 'Поштомат', hint: 'від 60 ₴, до 30 кг' },
			{ label: 'Кур’єр', hint: 'від 110 ₴, до дверей' }
		],
		pays: [
			{ label: 'Карткою онлайн', hint: 'Visa, Mastercard — демо' },
			{ label: 'При отриманні', hint: 'Комісія НП 20 ₴ + 2%' },
			{ label: 'Оплата частинами', hint: 'Без переплат — демо' }
		],
		title: 'Оформлення замовлення | Хвиля',
		description: 'Оформлення замовлення в магазині «Хвиля».',
		cart: 'Кошик',
		crumb: 'Оформлення',
		h1: 'Оформлення замовлення',
		empty: 'Кошик порожній — немає що оформлювати',
		shop: 'До покупок',
		contacts: '1. Контакти',
		first: 'Ім’я',
		last: 'Прізвище',
		emailOpt: '(для чека, необов’язково)',
		deliveryTitle: '2. Доставка Новою Поштою',
		method: 'Спосіб доставки',
		city: 'Місто',
		cityPh: 'Почніть вводити: Київ, Львів…',
		noCity: 'Такого міста немає в демо-довіднику',
		street: 'Вулиця',
		house: 'Будинок',
		flatLabel: 'Квартира',
		postomat: 'Поштомат',
		warehouse: 'Відділення',
		pointPh: 'Номер або вулиця',
		pickCity: 'Спершу оберіть місто',
		point: (postomat: boolean, n: number) => `${postomat ? 'Поштомат' : 'Відділення'} №${n}`,
		noPostomat: 'У цьому місті немає поштоматів у демо-довіднику',
		payTitle: '3. Оплата',
		payDemo:
			'Це демо-магазин: оплата не списується, дані картки нікуди не надсилаються і не зберігаються. Не вводьте справжню картку — спробуйте 4242 4242 4242 4242.',
		payMethod: 'Спосіб оплати',
		cardNumber: 'Номер картки',
		expiry: 'Строк',
		expPh: 'ММ/РР',
		parts: 'Кількість платежів',
		partsLine: (n: string, each: string) =>
			`${n} платежі${n === '6' || n === '10' ? 'в' : ''} по ${each}`,
		comment: 'Коментар до замовлення',
		commentPh: 'Наприклад: зателефонуйте за годину до доставки',
		yourOrder: 'Ваше замовлення',
		goods: 'Товари',
		confirm: 'Підтвердити замовлення',
		demo: 'Демо: замовлення не обробляється, гроші не списуються.'
	},
	searchPage: {
		title: (q: string) => (q ? `«${q}» — пошук | Хвиля` : 'Пошук | Хвиля'),
		description: 'Пошук навушників, колонок, програвачів вінілу та аксесуарів у магазині «Хвиля».',
		crumb: 'Пошук',
		results: (q: string) => `Результати за «${q}»`,
		h1: 'Пошук по каталогу'
	},
	comparePage: {
		title: 'Порівняння товарів | Хвиля',
		description: 'Порівняйте характеристики навушників, колонок і техніки «Хвилі».',
		h1: 'Порівняння',
		onlyDiff: 'Лише відмінності',
		empty: 'Ще нічого порівнювати',
		emptyText: 'Натисніть на ваги на картці товару — до 4 моделей.',
		toHeadphones: 'До навушників',
		spec: 'Характеристика',
		remove: (n: string) => `Прибрати з порівняння: ${n}`,
		legend: '— характеристики, що відрізняються'
	},
	cartPage: {
		title: 'Кошик | Хвиля',
		description: 'Ваш кошик у магазині аудіотехніки «Хвиля».',
		h1: 'Кошик',
		checkout: 'Оформити замовлення',
		empty: 'Кошик порожній',
		emptyText: 'Подивіться хіти — з них зазвичай починають.',
		addMore: 'Додайте до замовлення'
	},
	wishPage: {
		title: 'Обране | Хвиля',
		description: 'Збережені товари «Хвилі».',
		h1: 'Обране',
		empty: 'В обраному поки порожньо',
		emptyText: 'Натисніть на серце на картці, щоб зберегти товар на потім.'
	},
	apiProduct: { notFound: 'Товар не знайдено' }
};

export type Ui = typeof tUk;

export const tEn: Ui = {
	skip: 'Skip to content',
	home: 'Home',
	brand: 'Hvylia',
	brandSuffix: '| Hvylia',
	q: (s: string) => `“${s}”`,
	close: 'Close',
	nothing: 'Nothing found',
	qty: 'Quantity',
	less: 'Decrease',
	more: 'Increase',
	phone: 'Phone',
	pcs: 'pcs',
	free: 'free',
	byTariff: 'Nova Poshta rates',
	toPay: 'To pay',
	total: 'Total',
	discount: 'Discount',
	delivery: 'Delivery',
	inCart: 'Add to cart',
	added: 'Added',
	toCatalog: 'Browse the shop',
	toHome: 'Back to home',
	priceSale: 'Sale price: ',
	priceOld: 'Was: ',
	answers: 'Answers',
	waitCall: 'Call me back',
	rating: (v: string, count?: number) =>
		`Rated ${v} out of 5${count !== undefined ? `, ${count} reviews` : ''}`,
	productInfo: 'Product information',
	range: {
		price: 'Price',
		min: 'Minimum',
		max: 'Maximum',
		from: 'From',
		to: 'To',
		uah: (v: string) => `${v} UAH`
	},
	pages: {
		nav: 'Catalogue pages',
		prev: 'Previous page',
		next: 'Next page',
		page: (p: number) => `Page ${p}`
	},
	crumbs: 'Breadcrumbs',
	search: {
		label: 'Site search',
		sr: 'Search products',
		placeholder: 'Headphones, speaker, turntable…',
		clear: 'Clear search',
		recent: 'Recent searches',
		hints: 'Search suggestions',
		products: 'Products',
		none: (q: string) => `Nothing found for “${q}”. Try “headphones” or a brand name.`,
		all: (q: string) => `All results for “${q}” →`,
		errorPage: 'Search on the error page'
	},
	nf: {
		title: 'Page not found',
		error: 'Error',
		h1: 'Silence here',
		h1Error: 'Something went wrong',
		text: 'This page doesn’t exist — the product may have been discontinued or the link is out of date. Try searching:',
		textShort:
			'This page doesn’t exist — the product may have been discontinued or the link is out of date.',
		home: 'Back to home'
	},
	infoLinks: [
		{ href: '/dostavka-i-oplata', label: 'Delivery and payment' },
		{ href: '/harantiia-ta-povernennia', label: 'Warranty and returns' },
		{ href: '/faq', label: 'Questions and answers' },
		{ href: '/pro-nas', label: 'About us' },
		{ href: '/kontakty', label: 'Contacts' },
		{ href: '/polityka-konfidentsiinosti', label: 'Privacy policy' }
	],
	footer: {
		about: 'Official warranty and Nova Poshta delivery across Ukraine.',
		demo: 'A demo shop for a portfolio. Orders aren’t processed and no payment is taken.',
		catalog: 'Shop',
		brands: 'Brands',
		buyers: 'For customers',
		expert: 'Audio expert',
		freeCall: (hours: string) => `${hours}, free within Ukraine`,
		showroom: (city: string, street: string) => `Showroom: ${street}, ${city}`,
		photos: 'Photos: Unsplash'
	},
	menu: {
		title: 'Menu',
		close: 'Close menu',
		allCats: 'All categories',
		all: (name: string) => `All ${name.toLowerCase()}`,
		catalog: 'Shop',
		brands: 'Brands',
		buyers: 'For customers'
	},
	toastClose: 'Close notification',
	header: {
		menu: 'Menu',
		home: 'Hvylia — home',
		search: 'Search',
		compare: 'Compare',
		wishlist: 'Wishlist',
		cart: 'Cart',
		switchLabel: 'Українська версія'
	},
	mega: {
		catalog: 'Shop',
		nav: 'Product catalogue',
		allBrands: 'All brands',
		sections: 'Sections',
		all: (name: string) => `All ${name.toLowerCase()}`,
		brands: 'Brands',
		popular: 'Most popular'
	},
	landing: {
		places: ['Metro', 'Plane', 'Office'],
		ip: [
			{ text: 'Sweat and splashes', use: 'Gym, walks' },
			{ text: 'Water jets', use: 'Running in the rain' },
			{ text: 'Dust and water', use: 'Trail, cycling' },
			{ text: 'Immersion up to 1 m', use: 'Can be rinsed' }
		],
		withCase: 'with the case',
		onEar: 'On-ear',
		sizes: ['Mini', 'Medium', 'Large'],
		chain: ['Turntable', 'Phono preamp', 'Amplifier', 'Speakers'],
		noiseCap: 'Noise level, dB',
		noAnc: 'Without ANC',
		withAnc: 'With ANC',
		noiseTable: 'Noise level with and without noise cancelling, dB',
		place: 'Place',
		noiseNote: 'Minus 25–30 dB sounds about four times quieter.',
		ipCap: 'Water and sweat protection',
		ipNote: 'IPX4 is enough for the gym. If you run in any weather, go for IPX5 or higher.',
		hoursCap: 'Hours of music, h',
		oneCharge: 'On one charge',
		fromCase: 'Recharging from the case',
		hoursLine: (b: number, extra: number, label: string) =>
			`: ${b} h per charge${extra ? `, plus ${extra} h ${label}` : ''}`,
		budgetNote: 'Under 3,000 UAH you already get AAC, multipoint and USB-C charging.',
		stereoCap: 'The stereo triangle: how to place speakers',
		stereoAria:
			'Two speakers and the listening position form an equilateral triangle with sides of about 2.5 m; the speakers are angled slightly towards the listener',
		m25: '2.5 m',
		you: 'You',
		stereoNote: 'Speakers at ear level and at least 30 cm from the wall: the bass gets cleaner.',
		sizeCap: 'What a bigger body gives you',
		sizeTable: 'Typical power and battery life of portable speakers',
		size: 'Size',
		power: 'Power, W',
		battery: 'Battery life, h',
		sizeNote: '20 W is enough for a picnic; a mini speaker suits the shower and the bike.',
		chainCap: 'The signal path from record to speakers',
		builtIn: 'often built in',
		chainNote:
			'A phono preamp boosts the stylus’s weak signal. If the turntable has one, you can connect speakers straight away.',
		ohmCap: 'Headphone impedance, Ω',
		ohm: ' Ω',
		ohmLow: 'A phone or laptop will cope',
		ohmMid: 'Recommended',
		ohmHigh: 'Needs an amplifier',
		ohmNote: '250–300 Ω studio models only open up with a separate amplifier.'
	},
	category: {
		inSection: 'in this section',
		subs: 'Subsections',
		guide: 'Guide',
		collapse: 'Show less',
		readMore: 'Read more',
		faq: 'Questions and answers'
	},
	catalog: {
		found: (g: string) => `Found ${g}`,
		nothingFiltered: 'Nothing matches these filters',
		anc: 'Noise cancelling',
		inStock: 'In stock',
		ratingFrom: (r: number) => `Rating from ${r}`,
		filters: 'Filters',
		searching: 'Searching…',
		sort: 'Sort by',
		view: 'List view',
		grid: 'Grid',
		list: 'List',
		removeFilter: (l: string) => `Remove filter: ${l}`,
		reset: 'Clear all',
		products: 'Products',
		loadError: (e: string) => `Couldn’t load products: ${e}. Try refreshing the page.`,
		loading: 'Loading products',
		showMore: (n: number) => `Show ${n} more`,
		emptyTitle: 'Nothing found',
		emptyText: 'Try removing some filters or widening the price range.',
		resetFilters: 'Clear filters',
		closeFilters: 'Close filters',
		resetShort: 'Reset',
		show: (n: string) => `Show ${n}`
	},
	filter: {
		anc: 'Active noise cancelling',
		inStock: 'In stock only',
		rating: 'Rating',
		any: 'Any',
		from: (v: string) => `from ${v} ★`,
		price: 'Price, UAH',
		brand: 'Brand',
		type: 'Type',
		conn: 'Connectivity',
		ancTitle: 'Noise cancelling',
		color: 'Colour',
		stock: 'Availability'
	},
	mini: {
		close: 'Close cart',
		title: 'Cart',
		withPromo: (p: string) => `including promo code ${p}`,
		toCart: 'View cart',
		checkout: 'Checkout',
		empty: 'Your cart is empty',
		emptyText: 'Start with headphones — there’s plenty to choose from.'
	},
	undo: { removed: 'Item removed', restored: 'Item returned to the cart', undo: 'Undo' },
	cartRow: {
		remove: (n: string, c: string) => `Remove: ${n}, ${c}`,
		removed: (n: string) => `${n} removed from the cart`,
		qty: (n: string) => `Quantity: ${n}`
	},
	card: {
		new: 'New',
		hit: 'Bestseller',
		wish: (n: string) => `Add to wishlist: ${n}`,
		compare: (n: string) => `Compare: ${n}`,
		outAria: (n: string) => `${n}: out of stock`,
		addAria: (n: string) => `Add to cart: ${n}`,
		colors: 'Colours',
		out: 'Out of stock',
		low: 'Running low'
	},
	promo: {
		empty: 'Enter a promo code',
		wrong: 'That code doesn’t exist. Try HVYLIA10',
		applied: 'Promo code applied',
		remove: 'Remove promo code',
		label: 'Promo code',
		apply: 'Apply'
	},
	gallery: {
		alt: (n: string, i: number, total: number) => `${n} — photo ${i} of ${total}`,
		photos: 'Product photos',
		photo: (i: number, n: number) => `Photo ${i} of ${n}`,
		fullscreen: 'Open photo full screen',
		close: 'Close viewer',
		title: (n: string, i: number, total: number) => `${n}: photo ${i} of ${total}`,
		role: 'gallery',
		prev: 'Previous photo',
		next: 'Next photo'
	},
	reviews: {
		errName: 'Enter your name',
		errRating: 'Choose a rating',
		errText: 'Tell us a bit more — at least 20 characters',
		count: (n: number) => `${n} review${n === 1 ? '' : 's'}`,
		filter: 'Filter by rating',
		write: 'Write a review',
		thanks: (n: string) =>
			`Thank you! Your review of “${n}” will appear after moderation (this is a demo — it isn’t actually sent anywhere).`,
		yours: (n: string) => `Your review of ${n}`,
		name: 'Name',
		rating: 'Rating',
		of5: (s: number) => `${s} out of 5`,
		text: 'Review',
		send: 'Submit review',
		verified: 'Verified purchase',
		pros: 'Pros',
		cons: 'Cons',
		none: 'No reviews with this rating yet.'
	},
	anc: {
		aria: 'Active noise cancelling (ANC)',
		state: (on: boolean) => `ANC ${on ? 'on' : 'off'}`,
		cabin: 'Noise level in an aircraft cabin',
		db: ' dB',
		on: 'Engines and ventilation fade away — only quiet music remains.',
		off: 'Engine drone, ventilation, chatter nearby. Turn on ANC.'
	},
	ship: {
		left: 'to free delivery',
		more: '',
		free: 'Delivery is free',
		aria: 'Progress to free delivery',
		leftText: (p: string) => `${p} to go`,
		freeText: 'Free delivery'
	},
	fr: { measuring: 'measuring', range: '20 Hz – 20 kHz' },
	actions: {
		added: (n: string, c: number) =>
			`${n} added to the cart. ${c} item${c === 1 ? '' : 's'} in the cart.`,
		wishOn: (n: string) => `“${n}” added to the wishlist`,
		wishOff: (n: string) => `“${n}” removed from the wishlist`,
		open: 'Open',
		compareLimit: 'You can compare up to 4 products. Remove one from the list.',
		toCompare: 'Go to comparison',
		compareOn: (n: string) => `“${n}” added to comparison`,
		compareOff: (n: string) => `“${n}” removed from comparison`,
		compare: 'Compare'
	},
	seo: {
		siteName: (s: string) => `${s} — audio gear`,
		ogLocale: 'en_US',
		inLanguage: 'en'
	},
	api: {
		unavailable: (s: number) => `Catalogue unavailable (${s})`,
		empty: 'The cart is empty',
		name: 'Enter your name',
		phone: 'Incomplete number',
		check: 'Check your order details'
	},
	sets: { travel: 'For travel', home: 'For the home', vinyl: 'First vinyl' },
	order: {
		title: (id: string) => `Order ${id} | Hvylia`,
		description: 'Order confirmation at Hvylia.',
		h1: 'Thank you, your order has been placed',
		number: 'Order number',
		ttn: (phone: string) => `. We’ll text the tracking number to ${phone}.`,
		demo: 'This is a demo order: it isn’t processed, no money was taken and nothing will be shipped.',
		items: 'Order contents',
		recipient: 'Recipient',
		payment: 'Payment',
		back: 'Back to shopping',
		notFound: 'Order not found',
		notFoundText:
			'Demo orders are only stored in this browser. You may have opened the link on another device.'
	},
	homePage: {
		curves: {
			'aurel-studio-x':
				'Controlled bass, even mids, an airy top. Sound for long listening sessions.',
			'aurel-air-pro': 'More bass and energy — for the metro, workouts and pop music.',
			'kobza-m1-studio': 'An almost flat line: monitors for mixing that flatter nothing.',
			'pulse-lab-raid-7': 'Boosted lows and highs: footsteps and shots sound clearer.'
		} as Record<string, string>,
		callError: 'Enter the full number',
		emailError: 'Check your email address',
		sets: [
			{ title: 'For travel', text: 'Noise cancelling and battery life for the whole flight' },
			{ title: 'For the home', text: 'Bookshelf speakers, soundbars and smart speakers' },
			{ title: 'First vinyl', text: 'A turntable, a record and care — everything to start' }
		],
		title: 'Hvylia — buy headphones, speakers and turntables in Ukraine',
		description:
			'Hvylia audio store: noise-cancelling wireless headphones, portable speakers, bookshelf speakers and vinyl. Up to a 3-year warranty and 30-day returns.',
		h1: 'Audio gear where you can hear the difference',
		lead: 'Headphones, speakers and vinyl with an official warranty of up to 3 years. Talk to an audio expert before you buy.',
		allHeadphones: 'All headphones',
		frLabel: (n: string) =>
			`Frequency response of ${n}: flat bass, a lift around 3 kHz and a gentle roll-off at the top`,
		cats: 'What are you looking for?',
		compare: 'Compare how they sound',
		compareText:
			'The graph shows which frequencies a model emphasises. Hover to see the level at any frequency.',
		model: 'Model on the graph',
		compareLabel: 'Frequency responses of four headphones compared',
		hits: 'Most popular',
		back: 'Scroll back',
		fwd: 'Scroll forward',
		hitsAria: 'Bestsellers',
		ancTitle: 'Silence is part of the sound too',
		ancText:
			'Active noise cancelling removes transport rumble, so you can listen quieter and longer.',
		ancLink: 'Noise-cancelling headphones',
		setsTitle: 'Ready-made picks',
		brands: 'Brands',
		reviews: 'What customers say',
		about: 'about',
		prevReview: 'Previous review',
		nextReview: 'Next review',
		consult: 'Advice and newsletter',
		expertTitle: 'Not sure what to choose? Ask an audio expert',
		expertText:
			'Our advisers are sound engineers and musicians. We’ll match headphones to your phone and your music.',
		callMe: 'Request a call',
		newsTitle: 'Letters for careful listeners',
		newsText: 'New-release reviews and codec deep dives — twice a month.',
		newsDone:
			'Done! The first letter arrives on Tuesday. This is a demo — your address isn’t sent anywhere.',
		email: 'Your email',
		newsDemo: 'Demo form: your address isn’t stored.',
		subscribe: 'Subscribe',
		callTitle: 'Request a call from an audio expert',
		callDone:
			'Thank you! An expert will call you within 15 minutes (demo — the number isn’t sent anywhere).',
		callText: (hours: string) =>
			`We’ll call back within 15 minutes during working hours (${hours}).`
	},
	brandsPage: {
		title: 'Audio brands — headphones, speakers, vinyl | Hvylia',
		description:
			'All Hvylia brands: Aurel and Kobza Audio headphones, Nordwave and Lumen speakers, Ottava vinyl and Basalt hi-fi. Official warranty.',
		h1: 'Brands',
		lead: 'We work directly with manufacturers, so we give an official warranty and know every model inside out.',
		meta: (country: string, founded: number, goods: string) =>
			`${country} · since ${founded} · ${goods}`
	},
	brandPage: {
		notFound: 'No such brand',
		eyebrow: (country: string, founded: number) => `${country} · since ${founded}`,
		title: (n: string) => `${n} — official warranty, prices | Hvylia`,
		description: (n: string, country: string, tagline: string) =>
			`${n} (${country}): ${tagline.toLowerCase()}. ${n} gear with an official warranty, delivery across Ukraine and 30-day returns.`,
		about: (n: string) => `About ${n}`
	},
	catPage: {
		notFound: 'No such category',
		subNotFound: 'No such section',
		subTitle: (h1: string) => `${h1} — buy in Ukraine, prices | Hvylia`,
		subDescription: (h1: string, lead: string) =>
			`${h1}: ${lead.charAt(0).toLowerCase()}${lead.slice(1)} Official warranty, free delivery from 3,000 UAH.`
	},
	product: {
		notFound: 'No such product',
		ocError: 'Enter the full number: +380 (XX) XXX-XX-XX',
		tabs: {
			opys: 'Description',
			kharakterystyky: 'Specifications',
			vidhuky: 'Reviews',
			pytannia: 'Questions'
		} as Record<string, string>,
		title: (n: string, price: string) => `${n} — buy, price ${price} | Hvylia`,
		description: (n: string, short: string, months: number) =>
			`${n}: ${short} Official ${Math.round(months / 12) || ''}${months >= 12 ? '-year' : ''} warranty, delivery across Ukraine, 30-day returns.`,
		code: (id: string) => `SKU: ${id}`,
		out: 'Out of stock',
		low: 'Running low — only a few left',
		in: 'In stock, ships today',
		color: 'Colour:',
		wish: 'Add to wishlist',
		compare: 'Compare',
		oneClick: 'Buy in 1 click',
		npTitle: 'Nova Poshta delivery in 1–3 days.',
		freeThis: 'Free for this item.',
		freeFrom: (n: number) => `Free from ${n.toLocaleString('en-US')} UAH.`,
		warranty: (m: number) => `Official ${m}-month warranty.`,
		warrantyText: 'Service through the manufacturer.',
		returns: (d: number) => `${d}-day returns`,
		returnsText: 'with no questions asked.',
		terms: 'Terms',
		keySpecs: 'Key specifications',
		sounds: (n: string) => `How the ${n} sounds`,
		frText:
			'Frequency response: which frequencies the model boosts and which it softens. Hover to see the level at any frequency.',
		frLabel: (n: string) => `Frequency response of ${n} compared with similar models`,
		frDemo: 'Demonstration data based on typical traits of this device class.',
		details: 'Detailed information',
		noQuestions:
			'No questions yet. Call an audio expert on 0 800 33 41 77 — we’ll answer right away.',
		blocks: {
			together: 'Frequently bought together',
			similar: 'Similar products',
			recent: 'Recently viewed'
		},
		ocDone: 'Thank you! An audio expert will call you within 10 minutes to confirm the order.',
		ocDemo: 'This is a demo: the number isn’t sent anywhere.',
		ocText: (n: string, color: string, qty: number) =>
			`${n}, ${color.toLowerCase()} · ${qty} pcs. Leave your number — we’ll call back and place the order for you.`,
		ocDemoShort: 'Demo shop: no data is sent.'
	},
	checkout: {
		err: {
			name: 'Enter your first name',
			letters: 'Letters only',
			surname: 'Enter your last name as in your ID — Nova Poshta checks it',
			phoneShort: 'Incomplete number: +380 (XX) XXX-XX-XX',
			phone: 'Enter your phone — the tracking number will be sent to it',
			email: 'Check your email address',
			city: 'Choose a city from the list',
			postomat: 'Choose a parcel locker',
			warehouse: 'Choose a branch',
			street: 'Enter the street',
			house: 'Enter the house number',
			cardBad: 'Invalid number (for the demo: 4242 4242 4242 4242)',
			card: 'Enter your card number',
			expBad: 'Expired or invalid date',
			exp: 'MM/YY',
			cvv: '3 digits',
			check: 'Check the highlighted fields',
			failed: 'Couldn’t place the order. Please try again.'
		},
		methodNames: {
			warehouse: 'Nova Poshta branch',
			postomat: 'Nova Poshta parcel locker',
			courier: 'Nova Poshta courier'
		},
		flat: (f: string) => `, apt ${f}`,
		payNames: {
			card: 'Card online (demo)',
			cod: 'Cash on delivery',
			parts: (n: string) => `${n} instalments (demo)`
		},
		methods: [
			{ label: 'Branch', hint: 'from 70 UAH, 1–3 days' },
			{ label: 'Parcel locker', hint: 'from 60 UAH, up to 30 kg' },
			{ label: 'Courier', hint: 'from 110 UAH, to your door' }
		],
		pays: [
			{ label: 'Card online', hint: 'Visa, Mastercard — demo' },
			{ label: 'Cash on delivery', hint: 'Nova Poshta fee 20 UAH + 2%' },
			{ label: 'Instalments', hint: 'No overpayment — demo' }
		],
		title: 'Checkout | Hvylia',
		description: 'Checkout at Hvylia.',
		cart: 'Cart',
		crumb: 'Checkout',
		h1: 'Checkout',
		empty: 'Your cart is empty — nothing to check out',
		shop: 'Go shopping',
		contacts: '1. Contacts',
		first: 'First name',
		last: 'Last name',
		emailOpt: '(for the receipt, optional)',
		deliveryTitle: '2. Nova Poshta delivery',
		method: 'Delivery method',
		city: 'City',
		cityPh: 'Start typing: Kyiv, Lviv…',
		noCity: 'This city isn’t in the demo directory',
		street: 'Street',
		house: 'House',
		flatLabel: 'Apartment',
		postomat: 'Parcel locker',
		warehouse: 'Branch',
		pointPh: 'Number or street',
		pickCity: 'Choose a city first',
		point: (postomat: boolean, n: number) => `${postomat ? 'Parcel locker' : 'Branch'} No. ${n}`,
		noPostomat: 'There are no parcel lockers in this city in the demo directory',
		payTitle: '3. Payment',
		payDemo:
			'This is a demo shop: no payment is taken, and card details are never sent or stored. Don’t enter a real card — try 4242 4242 4242 4242.',
		payMethod: 'Payment method',
		cardNumber: 'Card number',
		expiry: 'Expiry',
		expPh: 'MM/YY',
		parts: 'Number of instalments',
		partsLine: (n: string, each: string) => `${n} payments of ${each}`,
		comment: 'Order comment',
		commentPh: 'For example: call an hour before delivery',
		yourOrder: 'Your order',
		goods: 'Items',
		confirm: 'Place order',
		demo: 'Demo: the order isn’t processed and no money is taken.'
	},
	searchPage: {
		title: (q: string) => (q ? `“${q}” — search | Hvylia` : 'Search | Hvylia'),
		description: 'Search headphones, speakers, turntables and accessories at Hvylia.',
		crumb: 'Search',
		results: (q: string) => `Results for “${q}”`,
		h1: 'Search the catalogue'
	},
	comparePage: {
		title: 'Product comparison | Hvylia',
		description: 'Compare the specifications of headphones, speakers and other gear at Hvylia.',
		h1: 'Compare',
		onlyDiff: 'Differences only',
		empty: 'Nothing to compare yet',
		emptyText: 'Tap the scales on a product card — up to 4 models.',
		toHeadphones: 'Browse headphones',
		spec: 'Specification',
		remove: (n: string) => `Remove from comparison: ${n}`,
		legend: '— specifications that differ'
	},
	cartPage: {
		title: 'Cart | Hvylia',
		description: 'Your cart at the Hvylia audio store.',
		h1: 'Cart',
		checkout: 'Checkout',
		empty: 'Your cart is empty',
		emptyText: 'Have a look at the bestsellers — that’s where most people start.',
		addMore: 'Add to your order'
	},
	wishPage: {
		title: 'Wishlist | Hvylia',
		description: 'Saved Hvylia products.',
		h1: 'Wishlist',
		empty: 'Your wishlist is empty',
		emptyText: 'Tap the heart on a product card to save it for later.'
	},
	apiProduct: { notFound: 'Product not found' }
};

export let t: Ui = tUk;
onLang((l) => {
	t = l === 'en' ? tEn : tUk;
});
