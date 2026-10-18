/** Офіційна транслітерація українських імен латиницею (постанова КМУ № 55, 2010) */
const map: Record<string, string> = {
	а: 'a',
	б: 'b',
	в: 'v',
	г: 'h',
	ґ: 'g',
	д: 'd',
	е: 'e',
	є: 'ie',
	ж: 'zh',
	з: 'z',
	и: 'y',
	і: 'i',
	ї: 'i',
	й: 'i',
	к: 'k',
	л: 'l',
	м: 'm',
	н: 'n',
	о: 'o',
	п: 'p',
	р: 'r',
	с: 's',
	т: 't',
	у: 'u',
	ф: 'f',
	х: 'kh',
	ц: 'ts',
	ч: 'ch',
	ш: 'sh',
	щ: 'shch',
	ь: '',
	ю: 'iu',
	я: 'ia',
	'’': '',
	ʼ: '',
	"'": ''
};
/** На початку слова є/ї/й/ю/я пишуться як ye/yi/y/yu/ya */
const initial: Record<string, string> = { є: 'ye', ї: 'yi', й: 'y', ю: 'yu', я: 'ya' };

export function translit(s: string) {
	let out = '';
	for (let i = 0; i < s.length; i++) {
		const ch = s[i];
		const lower = ch.toLowerCase();
		const start = i === 0 || /[\s\-«(.,]/.test(s[i - 1]);
		// «зг» передається як «zgh», щоб не плутати з «ж»
		let t =
			lower === 'г' && s[i - 1]?.toLowerCase() === 'з'
				? 'gh'
				: start && initial[lower]
					? initial[lower]
					: map[lower];
		if (t === undefined) {
			out += ch;
			continue;
		}
		if (ch !== lower && t) t = t[0].toUpperCase() + t.slice(1);
		out += t;
	}
	return out;
}
