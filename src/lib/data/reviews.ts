/**
 * reviews: українська або англійська версія за мовою сторінки (див. #lib/lang.ts).
 * Експорти — живі прив’язки ES-модулів: після setLang() усі імпортери бачать нову мову.
 */
import { onLang } from '#lib/lang-core.ts';
import * as uk from './reviews.uk.ts';
import * as en from './en/reviews.ts';

export let reviews = uk.reviews;
export let questions = uk.questions;
export let ratingOf = uk.ratingOf;

onLang((l) => {
	const m = l === 'en' ? en : uk;
	reviews = m.reviews;
	questions = m.questions;
	ratingOf = m.ratingOf;
});
