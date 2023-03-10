import chalk from 'chalk';

export const presentMainText = (value: string | number, hasError: boolean) => {
  const setColor = hasError ? chalk.red : chalk.green;

  return setColor(value);
};
