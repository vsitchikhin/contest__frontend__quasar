/**
 * Простая функция плюрализации
 *
 * @param variants строка вида 'яблок нет | {n} яблоко | {n} яблока | {n} яблок'
 */
export function usePluralization(variants: string) {
  const choices = variants.split(' | ');

  function $t(count: number) {
    const variant = getVariantNumber(Math.abs(count), choices.length);
    const usingPhrase = choices[variant];
    return usingPhrase.replace('{n}', count.toString());
  }

  return {
    $t,
  };
}

function getVariantNumber(choice: number, choicesLength: number): number {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (choicesLength < 4) {
    return !teen && endsWithOne ? 1 : 2;
  }
  if (!teen && endsWithOne) {
    return 1;
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}
