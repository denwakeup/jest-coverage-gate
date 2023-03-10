import { EDiffFileStatus } from '../constants/coverageGate.constants';

export const rootDirMock = '/Users/packages/coverage-gate/src';

export const changedFilesMock = new Map(
  Object.entries({
    [`${rootDirMock}/apps/simple/src/utils/parseData.ts`]: {
      filePath: `${rootDirMock}/apps/simple/src/utils/parseData.ts`,
      status: EDiffFileStatus.MODIFIED,
    },
    [`${rootDirMock}/apps/simple/src/components/Header/index.tsx`]: {
      filePath: `${rootDirMock}/apps/simple/src/components/Header/index.tsx`,
      status: EDiffFileStatus.ADDED,
    },
  })
);
