import Fuse from 'fuse.js';

const getNumberMaxTwoDecimalPlaces = (number: number): number => {
  const numberInTwoDecimalPlaces = Number(number).toFixed(2);

  return parseFloat(numberInTwoDecimalPlaces);
};

/**
 * The function calculates the precision of how similar two alphanumeric words are. It works as follows:
 * 1. Determine the shorter word length.
 * 2. Compare each character at the same position in both words.
 * 3. If the characters match, count it as 1 hit.
 * 4. If they don't match, check if the characters are listed as similar and count it as a hit if they are.
 * 5. Calculate the similarity by dividing the number of hits by the total number of characters.
 *
 * @param word_1: string
 * @param word_2: string
 * @returns {similarity}: in decimal percent, exe: 0.55 is equivalent to 55%
 * @example
 * ```
 * getAccuracyOfSimilarAlphanumericWords("1B05G", "IBOSG")
 * // returns { similarity: 0.55 }
 * ```
 */
export const getSimilarityFromAlphanumericWords = (word_1: string, word_2: string): { similarity: number } => {
  const similarCharacters = [
    {
      char: 'G',
      similarities: ['B', '6']
    },
    {
      char: '8',
      similarities: ['B']
    },
    {
      char: '6',
      similarities: ['G']
    },
    {
      char: 'B',
      similarities: ['8']
    },
    {
      char: '1',
      similarities: ['l', 'I']
    },
    {
      char: 'l',
      similarities: ['1', 'I']
    },
    {
      char: 'I',
      similarities: ['1', 'l']
    },
    {
      char: '0',
      similarities: ['O', 'o']
    },
    {
      char: 'O',
      similarities: ['0']
    },
    {
      char: '9',
      similarities: ['6']
    },
    {
      char: '7',
      similarities: ['Z']
    },
    {
      char: 'Z',
      similarities: ['7']
    },
    {
      char: '5',
      similarities: ['S']
    },
    {
      char: 'S',
      similarities: ['5']
    },
    {
      char: '@',
      similarities: ['a']
    },
    {
      char: 'a',
      similarities: ['@']
    }
  ];

  const smallerWord = word_1.length >= word_2.length ? word_1 : word_2;
  const totalOfChars = smallerWord.length;

  let hits = 0;

  for (let i = 0; i < totalOfChars; i++) {
    if (word_1[i] === word_2[i]) {
      hits++;
      continue;
    }

    const foundCharSimilarities = similarCharacters.find((set) => set.char === word_1[i])?.similarities;

    if (foundCharSimilarities?.includes(word_2[i])) {
      hits++;
      continue;
    }
  }

  const proportionOfSimilarity = hits / totalOfChars;

  return { similarity: getNumberMaxTwoDecimalPlaces(proportionOfSimilarity) };
};

/**
 * Function to return the precision of how equivalent two values can be.
 * Currently using Fuse library, docs: https://www.fusejs.io/api/options.html
 *
 * @param word_1: string
 * @param word_2: string
 * @returns {similarity}: in decimal percent, exe: 0.55 is equivalent to 55%
 * @example
 * ```
 * getAccuracyOfCorrespondingValues("Matheus", "M4thews")
 * // returns { similarity: 0.55 }
 * ```
 */
export const getSimilarityOfWords = (word_1: string, word_2: string): { similarity: number } => {
  const matcher = new Fuse([word_1], { includeScore: true }).search(word_2);

  const score = matcher[0]?.score;

  if (score === undefined) {
    return { similarity: 0 };
  }

  /**
   * The [score] of 0 indicates a perfect match, while a score of 1 indicates a complete mismatch.
   *   ref: https://www.fusejs.io/api/options.html#includescore
   *
   * With that, converting the score to be a proportion in decimal, which means:
   *  - score of 0.54 => 1 - 0.54 => 0.46 => 46% of similarity
   */
  const positiveProportionInDecimal = 1 - score;

  return { similarity: getNumberMaxTwoDecimalPlaces(positiveProportionInDecimal) };
};
