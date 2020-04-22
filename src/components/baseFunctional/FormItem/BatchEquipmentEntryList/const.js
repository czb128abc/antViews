import rules from '@/utils/validate/rules';

export function isMatchCardIdLen(value = '', cardIdLength) {
  return `${value}`.length === cardIdLength;
}

export const isLetterOrNumber = rules.isLetterOrNumber();
