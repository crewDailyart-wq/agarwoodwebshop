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
