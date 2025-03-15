import { getSimilarityFromAlphanumericWords, getSimilarityOfWords } from '../../../src/application/lib/match';

describe('getSimilarityFromAlphanumericWords', () => {
  const values = [
    {
      inputs: ['1B6', 'I8G'],
      expected: 1
    },
    {
      inputs: ['ZOSCHR1', '705TAB1'],
      expected: 0.57
    }
  ];

  it.each(values)('should return the equivalency correctly', async (value) => {
    const result = getSimilarityFromAlphanumericWords(value.inputs[0], value.inputs[1]);

    expect(result.similarity).toEqual(value.expected);
  });
});

describe('getSimilarityOfWords', () => {
  const values = [
    {
      inputs: ['Matheus', 'M4thews'],
      expected: 0.71
    },
    {
      inputs: ['Alex Abel', 'Alexis Abe'],
      expected: 0.68
    },
    {
      inputs: ['Brian Ball', 'Brian Ball'],
      expected: 1
    }
  ];

  it.each(values)('should return the equivalency correctly', async (value) => {
    const result = getSimilarityOfWords(value.inputs[0], value.inputs[1]);

    expect(result.similarity).toEqual(value.expected);
  });
});
