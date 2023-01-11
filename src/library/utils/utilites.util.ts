import _ from 'lodash';
export const checkNotUndefined = (object: any) => {
  for (const key in object) {
    if (object[key] !== undefined) return true;
  }
  return false;
};

export const calculateTimimg = d => {
  let months = 0,
    years = 0,
    days = 0,
    weeks = 0;
  while (d) {
    if (d >= 365) {
      years++;
      d -= 365;
    } else if (d >= 30) {
      months++;
      d -= 30;
    } else if (d >= 7) {
      weeks++;
      d -= 7;
    } else {
      days++;
      d--;
    }
  }
  return {
    years,
    months,
    weeks,
    days,
  };
};

export const toTitleCase = str => {
  return str
    ? str?.replace(/\w\S*/g, function (txt) {
        return txt?.charAt(0).toUpperCase() + txt?.slice(1).toLowerCase();
      })
    : '';
};

const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0, n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f(g(x));
const not = x => !x;
const chunk = n => xs =>
  isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

// numToWords :: (Number a, String a) => a -> String
export const numToWords = n => {
  const a = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ];

  const b = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ];

  const g = [
    '',
    'thousand',
    'million',
    'billion',
    'trillion',
    'quadrillion',
    'quintillion',
    'sextillion',
    'septillion',
    'octillion',
    'nonillion',
  ];

  // this part is really nasty still
  // it might edit this again later to show how Monoids could fix this up
  const makeGroup = ([ones, tens, huns]) => {
    return [
      num(huns) === 0 ? '' : a[huns] + ' hundred ',
      num(ones) === 0 ? b[tens] : (b[tens] && b[tens] + '-') || '',
      a[tens + ones] || a[ones],
    ].join('');
  };

  const thousand = (group, i) => (group === '' ? group : `${group} ${g[i]}`);

  if (typeof n === 'number') return numToWords(String(n));
  else if (n === '0') return 'zero';
  else
    return comp(chunk(3))(reverse)(arr(n))
      .map(makeGroup)
      .map(thousand)
      .filter(comp(not)(isEmpty))
      .reverse()
      .join(' ');
};

export const debounce = _.debounce((fun: () => void) => {
  fun();
}, 1000);
