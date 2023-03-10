import {
  ECoverageCheckStatus,
  EDiffFileStatus,
} from '../constants/coverageGate.constants';
import { IDiffCoverageCheckResult } from '../interfaces/coverage.interfaces';

import { rootDirMock } from './changedFilesMock';

export const diffCoverageCheckResultMock: IDiffCoverageCheckResult = {
  status: ECoverageCheckStatus.ERROR,
  summary: new Map(
    Object.entries({
      [`${rootDirMock}/apps/simple/src/utils/parseData.ts`]: {
        file: {
          filePath: `${rootDirMock}/apps/simple/src/utils/parseData.ts`,
          status: EDiffFileStatus.MODIFIED,
        },
        status: ECoverageCheckStatus.SUCCESS,
        summary: {
          functions: {
            expected: 50,
            current: 80,
            status: ECoverageCheckStatus.SUCCESS,
          },
        },
      },
      [`${rootDirMock}/apps/simple/src/components/Header/index.tsx`]: {
        file: {
          filePath: `${rootDirMock}/apps/simple/src/components/Header/index.tsx`,
          status: EDiffFileStatus.ADDED,
        },
        status: ECoverageCheckStatus.ERROR,
        summary: {
          functions: {
            expected: 50,
            current: 20,
            status: ECoverageCheckStatus.ERROR,
          },
        },
      },
    })
  ),
};
