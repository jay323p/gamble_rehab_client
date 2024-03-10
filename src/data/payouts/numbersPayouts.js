export const numbersPayouts = [
  {
    type: '4 Exact',
    example: ['1234', '1234'],
    probability: '1 in 10000',
    payout: 2000,
  },
  {
    type: '3 Exact',
    example: ['1234', '1235'],
    probability: '1 in 1000',
    payout: 200,
  },
  {
    type: '2 Exact',
    example: ['1234', '1245'],
    probability: '1 in 100',
    payout: 30,
  },
  {
    type: '1 Exact',
    example: ['1234', '1345'],
    probability: '1 in 10',
    payout: 4,
  },
  {
    type: '4 Any',
    example: ['1234', '4321'],
    probability: '1 in 416.7',
    payout: 150,
  },
  {
    type: '3 Any',
    example: ['1234', '3125'],
    probability: '1 in 166.7',
    payout: 65,
  },
];
