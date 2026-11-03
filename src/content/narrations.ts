/**
 * Islamic narrations shown, one at a time, on every product page.
 *
 * Arabic wording was checked against sunnah.com (Sahih Muslim 223, Sunan Ibn Majah 3809)
 * and quran.com (2:152). English is a plain translation. Add a narration here and it
 * appears in the carousel — nothing else to change.
 *
 * `ﷺ` in the English text is the salutation after the Prophet's name; the carousel
 * draws it in the Arabic typeface.
 */

export type NarrationPart = {
  arabic: string;
  english: string;
};

export type Narration = {
  id: string;
  /** Gold small-caps source line under the text. */
  reference: string;
  /** More than one part = several sources shown together (a verse followed by a hadith). */
  parts: NarrationPart[];
};

export const narrations: Narration[] = [
  {
    id: "bukhari-6689",
    reference: "Sahih al-Bukhari 6689",
    parts: [
      {
        arabic:
          "إِنَّمَا الْأَعْمَالُ بِالنِّيَّةِ، وَإِنَّمَا لِامْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا، أَوِ امْرَأَةٍ يَتَزَوَّجُهَا، فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
        english:
          "\u2018Umar ibn al-Khattab reported: I heard the Messenger of Allah \uFDFA say: \u201CActions are only by intentions, and every person will have only what he intended. So whoever\u2019s migration was to Allah and His Messenger, his migration is to Allah and His Messenger; and whoever\u2019s migration was for some worldly gain he would get, or a woman he would marry, his migration is to that for which he migrated.\u201D",
      },
    ],
  },
  {
    id: "muslim-223",
    reference: "Sahih Muslim 223",
    parts: [
      {
        arabic:
          "الطُّهُورُ شَطْرُ الإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ أَوْ تَمْلأُ مَا بَيْنَ السَّمَوَاتِ وَالأَرْضِ، وَالصَّلاَةُ نُورٌ، وَالصَّدَقَةُ بُرْهَانٌ، وَالصَّبْرُ ضِيَاءٌ، وَالْقُرْآنُ حُجَّةٌ لَكَ أَوْ عَلَيْكَ، كُلُّ النَّاسِ يَغْدُو فَبَائِعٌ نَفْسَهُ فَمُعْتِقُهَا أَوْ مُوبِقُهَا",
        english:
          "Abu Malik al-Ash’ari reported that the Messenger of Allah ﷺ said: “Cleanliness is half of faith. ‘Al-hamdu lillah’ fills the scale, and ‘Subhan Allah’ and ‘Al-hamdu lillah’ fill what is between the heavens and the earth. Prayer is light, charity is a proof, patience is radiance, and the Qur’an is an argument for you or against you. Every person starts the day and sells himself, either setting himself free or destroying himself.”",
      },
    ],
  },
  {
    id: "quran-2-152-ibn-majah-3809",
    reference: "Qur’an 2:152 · Sunan Ibn Majah 3809",
    parts: [
      {
        arabic: "فَٱذۡكُرُونِيٓ أَذۡكُرۡكُمۡ وَٱشۡكُرُواْ لِي وَلَا تَكۡفُرُونِ",
        english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me.",
      },
      {
        arabic:
          "إِنَّ مِمَّا تَذْكُرُونَ مِنْ جَلاَلِ اللَّهِ التَّسْبِيحَ وَالتَّهْلِيلَ وَالتَّحْمِيدَ يَنْعَطِفْنَ حَوْلَ الْعَرْشِ لَهُنَّ دَوِيٌّ كَدَوِيِّ النَّحْلِ تُذَكِّرُ بِصَاحِبِهَا أَمَا يُحِبُّ أَحَدُكُمْ أَنْ يَكُونَ لَهُ مَنْ يُذَكِّرُ بِهِ",
        english:
          "Nu’man ibn Bashir reported that the Prophet ﷺ said: “The glorifications you make of Allah’s majesty — ‘Subhan Allah’, ‘La ilaha illa Allah’ and ‘Al-hamdu lillah’ — gather around the Throne with a hum like the hum of bees, mentioning the one who said them. Would any of you not love to have someone there who keeps mentioning him?”",
      },
    ],
  },
];

/**
 * Narrations on camphor, shown on the Pure Camphor page (/camphor) only — they are
 * kept apart from `narrations` above so they do not appear in the carousel of every
 * product. All three are Umm ‘Atiyyah’s account of washing the Prophet’s daughter.
 *
 * Arabic wording was taken from sunnah.com (Sunan an-Nasa’i 1890, Sahih al-Bukhari 1253,
 * Sahih Muslim 939a), without the chain of narrators. English is a plain translation.
 */
export const camphorNarrations: Narration[] = [
  {
    id: "nasai-1890",
    reference: "Sunan an-Nasa\u2019i 1890",
    parts: [
      {
        arabic:
          "عَنْ أُمِّ عَطِيَّةَ، قَالَتْ: دَخَلَ عَلَيْنَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَنَحْنُ نَغْسِلُ ابْنَتَهُ فَقَالَ «اغْسِلْنَهَا ثَلاَثًا أَوْ خَمْسًا أَوْ أَكْثَرَ مِنْ ذَلِكِ إِنْ رَأَيْتُنَّ ذَلِكِ بِمَاءٍ وَسِدْرٍ وَاجْعَلْنَ فِي الآخِرَةِ كَافُورًا أَوْ شَيْئًا مِنْ كَافُورٍ فَإِذَا فَرَغْتُنَّ فَآذِنَّنِي». فَلَمَّا فَرَغْنَا آذَنَّاهُ فَأَلْقَى إِلَيْنَا حَقْوَهُ وَقَالَ «أَشْعِرْنَهَا إِيَّاهُ»",
        english:
          "Umm \u2018Atiyyah reported: The Messenger of Allah \uFDFA came to us while we were washing his daughter, and said: \u201CWash her three times, or five, or more than that if you see fit, with water and lotus leaves, and in the last wash put camphor, or a little camphor. When you have finished, let me know.\u201D When we had finished, we told him, and he threw his waist-wrapper to us and said: \u201CPlace it next to her body.\u201D",
      },
    ],
  },
  {
    id: "bukhari-1253",
    reference: "Sahih al-Bukhari 1253",
    parts: [
      {
        arabic:
          "عَنْ أُمِّ عَطِيَّةَ، قَالَتْ: دَخَلَ عَلَيْنَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ حِينَ تُوُفِّيَتِ ابْنَتُهُ فَقَالَ «اغْسِلْنَهَا ثَلاَثًا أَوْ خَمْسًا أَوْ أَكْثَرَ مِنْ ذَلِكَ إِنْ رَأَيْتُنَّ ذَلِكَ بِمَاءٍ وَسِدْرٍ، وَاجْعَلْنَ فِي الآخِرَةِ كَافُورًا أَوْ شَيْئًا مِنْ كَافُورٍ، فَإِذَا فَرَغْتُنَّ فَآذِنَّنِي». فَلَمَّا فَرَغْنَا آذَنَّاهُ فَأَعْطَانَا حِقْوَهُ فَقَالَ «أَشْعِرْنَهَا إِيَّاهُ». تَعْنِي إِزَارَهُ.",
        english:
          "Umm \u2018Atiyyah reported: The Messenger of Allah \uFDFA came to us when his daughter died, and said: \u201CWash her three times, or five, or more than that if you see fit, with water and lotus leaves, and in the last wash put camphor, or a little camphor. When you have finished, let me know.\u201D When we had finished, we told him, and he gave us his waist-wrapper and said: \u201CPlace it next to her body\u201D \u2014 meaning his lower garment.",
      },
    ],
  },
  {
    id: "muslim-939a",
    reference: "Sahih Muslim 939a",
    parts: [
      {
        arabic:
          "عَنْ أُمِّ عَطِيَّةَ، قَالَتْ: دَخَلَ عَلَيْنَا النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَنَحْنُ نَغْسِلُ ابْنَتَهُ فَقَالَ «اغْسِلْنَهَا ثَلاَثًا أَوْ خَمْسًا أَوْ أَكْثَرَ مِنْ ذَلِكَ إِنْ رَأَيْتُنَّ ذَلِكَ بِمَاءٍ وَسِدْرٍ وَاجْعَلْنَ فِي الآخِرَةِ كَافُورًا أَوْ شَيْئًا مِنْ كَافُورٍ فَإِذَا فَرَغْتُنَّ فَآذِنَّنِي». فَلَمَّا فَرَغْنَا آذَنَّاهُ فَأَلْقَى إِلَيْنَا حِقْوَهُ فَقَالَ «أَشْعِرْنَهَا إِيَّاهُ»",
        english:
          "Umm \u2018Atiyyah reported: The Prophet \uFDFA came to us while we were washing his daughter, and said: \u201CWash her three times, or five, or more than that if you see fit, with water and lotus leaves, and in the last wash put camphor, or a little camphor. When you have finished, let me know.\u201D When we had finished, we told him, and he gave us his waist-wrapper and said: \u201CPlace it next to her body.\u201D",
      },
    ],
  },
];

export function getNarration(id: string): Narration | undefined {
  return narrations.find((n) => n.id === id);
}
