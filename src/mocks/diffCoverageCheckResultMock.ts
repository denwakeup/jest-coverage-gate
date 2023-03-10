import {
  ECoverageCheckStatus,
  EDiffFileStatus,
} from '../constants/coverageGate.constants';
import { IDiffCoverageCheckResult } from '../interfaces/coverage.interfaces';

import { rootDirMock } from './changedFilesMock';

export const diffCoverageCheckResultMock: IDiffCoverageCheckResult = {
  threshold: {
    added: {
      functions: 50,
      branches: 50,
      lines: 50,
      statements: 50,
    },
    modified: {
      functions: 20,
      branches: 20,
      lines: 20,
      statements: 20,
    },
  },
  status: ECoverageCheckStatus.ERROR,
  summary: new Map(
    Object.entries({
      [`${rootDirMock}/frontend/apps/webadmin/src/utils/parseData.ts`]: {
        file: {
          filePath: `${rootDirMock}/frontend/apps/webadmin/src/utils/parseData.ts`,
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
      [`${rootDirMock}/frontend/apps/webadmin/src/components/Header/index.tsx`]:
        {
          file: {
            filePath: `${rootDirMock}/frontend/apps/webadmin/src/components/Header/index.tsx`,
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
