import { sync } from 'execa';

import { IDiffCoverageFileMap } from '../../../interfaces/coverageFiles.interfaces';

import { getGitRoot } from './getGitRoot';
import { parseGitChangedFile } from './parseGitChangedFile';

interface IParams {
  rootDir: string;
  since: string;
}

export const getGitChangedFiles = ({
  rootDir,
  since,
}: IParams): IDiffCoverageFileMap => {
  const passedSince = since.includes('...') ? since : `${since}...HEAD`;
  const rootPath = getGitRoot({ rootDir });

  const { stdout } = sync('git', [
    'diff',
    '--name-status',
    passedSince,
    `--`,
    rootDir,
  ]);

  return stdout
    .split('\n')
    .filter(Boolean)
    .reduce<IDiffCoverageFileMap>((acc, file) => {
      const parsedFile = parseGitChangedFile({ file, rootPath });

      if (parsedFile) {
        acc.set(parsedFile.filePath, parsedFile);
      }

      return acc;
    }, new Map());
};
