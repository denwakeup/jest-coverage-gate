import CliTable from 'cli-table';
import chalk from 'chalk';

import { IDiffCoverageCheckResult } from '../../../../interfaces/coverage.interfaces';
import { presentFilePath } from '../presentFilePath';
import { ICoverageParam } from '../../../../interfaces/coverageParam.interfaces';

import { presentColumnValue } from './presentColumnValue';

export interface IDiffCoverageTablePresenterParams {
  result: IDiffCoverageCheckResult;
  rootDir: string;
}

export const presentDiffCoverageTable = ({
  result,
  rootDir,
}: IDiffCoverageTablePresenterParams) => {
  const testTable = new CliTable({
    head: [
      'File',
      '% Stmts',
      '% Branch',
      '% Funcs',
      '% Lines',
      'File status',
    ].map((value) => chalk.whiteBright(value)),
  });

  const coverageKeysColumns: ICoverageParam[] = [
    'statements',
    'branches',
    'functions',
    'lines',
  ];

  result.summary.forEach((value) => {
    testTable.push([
      presentColumnValue(
        presentFilePath(value.file.filePath, rootDir),
        value.status
      ),
      ...coverageKeysColumns.map((coverageParam) =>
        presentColumnValue(
          value.summary[coverageParam]?.current ?? 0,
          value.summary[coverageParam]?.status
        )
      ),
      presentColumnValue(value.file.status, value.status),
    ]);
  });

  return testTable.toString();
};
