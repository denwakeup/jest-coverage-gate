import path from 'path';

import { FILE_STATUS_MAP } from '../../../constants/coverageGate.constants';
import { IDiffCoverageFile } from '../../../interfaces/coverageFiles.interfaces';

interface IParams {
  file: string;
  rootPath: string;
}

export const parseGitChangedFile = ({
  file,
  rootPath,
}: IParams): IDiffCoverageFile | null => {
  const [rawStatus, rawFilePath] = file.split('\t');

  const status = rawStatus && FILE_STATUS_MAP[rawStatus];

  if (!status || !rawFilePath) {
    return null;
  }

  return {
    filePath: path.resolve(rootPath, rawFilePath),
    status,
  };
};
