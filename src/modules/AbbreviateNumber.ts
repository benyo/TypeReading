import * as R from 'ramda';

function toFixed(fractionDigits: number): (value: number) => string {
  return R.ifElse(Number.isInteger, R.toString, (value: number) =>
    value.toFixed(fractionDigits)
  );
}

function formatAbbreviateNumber(num: number) {
  return ({ threshold, symbol }: any) =>
    R.pipe(
      R.divide(R.__, threshold),
      toFixed(2),
      (valueFormatted) => `${valueFormatted}${symbol}`
    )(num);
}

export function abbreviateNumber(number: number) {
  const abbreviations = [
    { threshold: 1e3, symbol: 'k' },
    { threshold: 1e6, symbol: 'M' },
    { threshold: 1e9, symbol: 'B' },
  ];

  return R.pipe(
    R.findLast<any>(R.propSatisfies(R.gte(number), 'threshold')),
    R.ifElse<any, any, any>(
      R.identity,
      formatAbbreviateNumber(number),
      R.toString
    )
  )(abbreviations);
}
