/**
 * Texts for the homepage charity section (Madinah Global Foundation), in the same shape
 * as the product-page narrations so the same carousel and text styles show them.
 *
 * Arabic of the narrations was copied from sunnah.com (Sahih al-Bukhari 6023, 6442,
 * 1427-1428; Sahih Muslim 1014, 2588, 2959), without the chain of narrators; the
 * numbers are sunnah.com's. Arabic and English of the verses (2:261, 2:215, 30:38)
 * are from the Uthmani text and the Saheeh International translation. English of the
 * narrations is a plain translation.
 */

import type { Narration } from "./narrations";

/** Verses and narrations on giving, shown one at a time in the carousel. */
export const charityNarrations: Narration[] = [
  {
    id: "quran-2-261-bukhari-6023",
    reference: "Qur’an 2:261 · Sahih al-Bukhari 6023",
    parts: [
      {
        arabic:
          "مَّثَلُ ٱلَّذِينَ يُنفِقُونَ أَمۡوَٰلَهُمۡ فِي سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنۢبَتَتۡ سَبۡعَ سَنَابِلَ فِي كُلِّ سُنۢبُلَةٖ مِّاْئَةُ حَبَّةٖۗ وَٱللَّهُ يُضَٰعِفُ لِمَن يَشَآءُۚ وَٱللَّهُ وَٰسِعٌ عَلِيمٌ",
        english:
          "The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.",
      },
      {
        arabic:
          "عَنْ عَدِيِّ بْنِ حَاتِمٍ رَضِيَ اللَّهُ عَنْهُ قَالَ: ذَكَرَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ النَّارَ، فَتَعَوَّذَ مِنْهَا وَأَشَاحَ بِوَجْهِهِ، ثُمَّ ذَكَرَ النَّارَ، فَتَعَوَّذَ مِنْهَا، وَأَشَاحَ بِوَجْهِهِ – قَالَ شُعْبَةُ أَمَّا مَرَّتَيْنِ فَلاَ أَشُكُّ – ثُمَّ قَالَ «اتَّقُوا النَّارَ وَلَوْ بِشِقِّ تَمْرَةٍ، فَإِنْ لَمْ تَجِدْ فَبِكَلِمَةٍ طَيِّبَةٍ»",
        english:
          "‘Adi ibn Hatim reported: The Prophet ﷺ mentioned the Fire and sought refuge from it, and turned his face away. Then he mentioned the Fire again, sought refuge from it, and turned his face away (Shu‘bah said: “I have no doubt that it was twice”). Then he said: “Protect yourselves from the Fire, even with half a date. And if you cannot find that, then with a good word.”",
      },
    ],
  },
  {
    id: "muslim-1014",
    reference: "Sahih Muslim 1014",
    parts: [
      {
        arabic:
          "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ «مَا تَصَدَّقَ أَحَدٌ بِصَدَقَةٍ مِنْ طَيِّبٍ - وَلاَ يَقْبَلُ اللَّهُ إِلاَّ الطَّيِّبَ - إِلاَّ أَخَذَهَا الرَّحْمَنُ بِيَمِينِهِ وَإِنْ كَانَتْ تَمْرَةً فَتَرْبُو فِي كَفِّ الرَّحْمَنِ حَتَّى تَكُونَ أَعْظَمَ مِنَ الْجَبَلِ كَمَا يُرَبِّي أَحَدُكُمْ فَلُوَّهُ أَوْ فَصِيلَهُ»",
        english:
          "Abu Hurayrah reported that the Messenger of Allah ﷺ said: “No one gives in charity something from lawful earnings — and Allah accepts only what is good — except that the Most Merciful takes it in His right hand, even if it is a single date, and it grows in the palm of the Most Merciful until it becomes greater than a mountain, just as one of you raises his foal or his young camel.”",
      },
    ],
  },
  {
    id: "muslim-2588",
    reference: "Sahih Muslim 2588",
    parts: [
      {
        arabic:
          "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ، عَنْ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلاَّ عِزًّا وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلاَّ رَفَعَهُ اللَّهُ»",
        english:
          "Abu Hurayrah reported that the Messenger of Allah ﷺ said: “Charity does not decrease wealth. Allah increases a servant in nothing but honor for his forgiving, and no one humbles himself for Allah except that Allah raises him.”",
      },
    ],
  },
  {
    id: "muslim-2959",
    reference: "Sahih Muslim 2959",
    parts: [
      {
        arabic:
          "عَنْ أَبِي هُرَيْرَةَ رَضِيَ اللَّهُ عَنْهُ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «يَقُولُ الْعَبْدُ مَالِي مَالِي إِنَّمَا لَهُ مِنْ مَالِهِ ثَلاَثٌ مَا أَكَلَ فَأَفْنَى أَوْ لَبِسَ فَأَبْلَى أَوْ أَعْطَى فَاقْتَنَى وَمَا سِوَى ذَلِكَ فَهُوَ ذَاهِبٌ وَتَارِكُهُ لِلنَّاسِ»",
        english:
          "Abu Hurayrah reported that the Messenger of Allah ﷺ said: “The servant says, ‘My wealth, my wealth!’ But only three things of his wealth are truly his: what he eats and uses up, what he wears and wears out, or what he gives away and so stores up for himself. Everything besides that goes away, and he leaves it for the people.”",
      },
    ],
  },
  {
    id: "bukhari-6442",
    reference: "Sahih al-Bukhari 6442",
    parts: [
      {
        arabic:
          "عَنْ عَبْدِ اللَّهِ رَضِيَ اللَّهُ عَنْهُ قَالَ: قَالَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ «أَيُّكُمْ مَالُ وَارِثِهِ أَحَبُّ إِلَيْهِ مِنْ مَالِهِ» قَالُوا يَا رَسُولَ اللَّهِ مَا مِنَّا أَحَدٌ إِلاَّ مَالُهُ أَحَبُّ إِلَيْهِ. قَالَ «فَإِنَّ مَالَهُ مَا قَدَّمَ، وَمَالُ وَارِثِهِ مَا أَخَّرَ»",
        english:
          "‘Abdullah ibn Mas‘ud reported: The Prophet ﷺ said: “Which of you loves the wealth of his heir more than his own wealth?” They said: “O Messenger of Allah, there is none of us who does not love his own wealth more.” He said: “Then his wealth is what he sends ahead, and the wealth of his heir is what he leaves behind.”",
      },
    ],
  },
];

/** Stays under the carousel whichever narration is showing. */
export const charityTeaching =
  "One can give only a little in charity, but because of his pure intention and lawful means of attaining his wealth, it can be something great in the eyes of his Creator.";

/** Two verses on the right of kith and kin, shown together, one under the other. */
export const kinVerses: Narration = {
  id: "kin-verses",
  reference: "Qur’an 30:38 · Qur’an 2:215",
  parts: [
    {
      arabic:
        "فَـَٔاتِ ذَا ٱلۡقُرۡبَىٰ حَقَّهُۥ وَٱلۡمِسۡكِينَ وَٱبۡنَ ٱلسَّبِيلِۚ ذَٰلِكَ خَيۡرٞ لِّلَّذِينَ يُرِيدُونَ وَجۡهَ ٱللَّهِۖ وَأُوْلَـٰٓئِكَ هُمُ ٱلۡمُفۡلِحُونَ",
      english:
        "So give the relative his right, as well as the needy and the traveler. That is best for those who desire the countenance of Allah, and it is they who will be the successful.",
    },
    {
      arabic:
        "يَسۡـَٔلُونَكَ مَاذَا يُنفِقُونَۖ قُلۡ مَآ أَنفَقۡتُم مِّنۡ خَيۡرٖ فَلِلۡوَٰلِدَيۡنِ وَٱلۡأَقۡرَبِينَ وَٱلۡيَتَٰمَىٰ وَٱلۡمَسَٰكِينِ وَٱبۡنِ ٱلسَّبِيلِۗ وَمَا تَفۡعَلُواْ مِنۡ خَيۡرٖ فَإِنَّ ٱللَّهَ بِهِۦ عَلِيمٞ",
      english:
        "They ask you, [O Muhammad], what they should spend. Say, “Whatever you spend of good is [to be] for parents and relatives and orphans and the needy and the traveler. And whatever you do of good — indeed, Allah is Knowing of it.”",
    },
  ],
};

/** Said before the narration below. */
export const kinText =
  "Our Creator tells us in these verses and others like them to give our kith and kin their due right, meaning not only in charity but also in upholding good ties with them, first our mothers, fathers, brothers and sisters, the closest after them and then the closest after them. So before one gives in charity to those he does not know, he must look around him to see if he has given them their right first, like what Prophet Muhammad ﷺ tells us in this narration:";

export const kinNarration: Narration = {
  id: "bukhari-1427-1428",
  reference: "Sahih al-Bukhari 1427, 1428",
  parts: [
    {
      arabic:
        "عَنْ حَكِيمِ بْنِ حِزَامٍ رَضِيَ اللَّهُ عَنْهُ، عَنِ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: «الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى، وَابْدَأْ بِمَنْ تَعُولُ، وَخَيْرُ الصَّدَقَةِ عَنْ ظَهْرِ غِنًى، وَمَنْ يَسْتَعْفِفْ يُعِفَّهُ اللَّهُ، وَمَنْ يَسْتَغْنِ يُغْنِهِ اللَّهُ»",
      english:
        "Hakim ibn Hizam reported that the Prophet ﷺ said: “The upper hand is better than the lower hand. Begin with those you support. The best charity is that which is given from surplus wealth. Whoever abstains from asking, Allah will keep him from need, and whoever seeks to be self-sufficient, Allah will make him self-sufficient.”",
    },
  ],
};
