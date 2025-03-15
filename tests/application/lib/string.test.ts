import { getPercentageInString } from '../../../src/application/lib/string';

describe('getPercentageInString', () => {
  it('should return percentage correctly when input is higher than 0', async () => {
    expect(getPercentageInString(0.7)).toEqual('70%');
  });

  it('should return percentage correctly when input is 0', async () => {
    expect(getPercentageInString(0)).toEqual('0%');
  });

  it('should return percentage correctly when input is less than 0', async () => {
    expect(getPercentageInString(-0.4)).toEqual('-40%');
  });
});
