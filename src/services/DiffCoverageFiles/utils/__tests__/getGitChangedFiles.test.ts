import execa from 'execa';

import { getGitChangedFiles } from '../getGitChangedFiles';
import * as GetGitRoot from '../getGitRoot';
import { gitDiffResultMock, rootDirMock } from '../../../../mocks';

jest.mock('execa');

describe('Git Changed Files getter', () => {
  const getGitRootSpy = jest.spyOn(GetGitRoot, 'getGitRoot');
  const execaSpy = jest.spyOn(execa, 'sync');

  beforeEach(() => {
    getGitRootSpy.mockImplementation(() => rootDirMock);

    execaSpy.mockReturnValue({
      stdout: gitDiffResultMock,
    } as any);
  });

  it('should execute correct command', async () => {
    await getGitChangedFiles({
      rootDir: rootDirMock,
      since: 'develop',
    });

    expect(execaSpy).toHaveBeenLastCalledWith('git', [
      'diff',
      '--name-status',
      'develop...HEAD',
      '--',
      rootDirMock,
    ]);

    await getGitChangedFiles({
      rootDir: rootDirMock,
      since: 'develop...feature/test',
    });

    expect(execaSpy).toHaveBeenLastCalledWith('git', [
      'diff',
      '--name-status',
      'develop...feature/test',
      '--',
      rootDirMock,
    ]);
  });

  it('should return correct result', async () => {
    const result = await getGitChangedFiles({
      rootDir: rootDirMock,
      since: 'develop',
    });

    expect(Array.from(result.values())).toMatchInlineSnapshot(`
      [
        {
          "filePath": "/Users/packages/coverage-gate/src/apps/simple/src/utils/parseData.ts",
          "status": "MODIFIED",
        },
        {
          "filePath": "/Users/packages/coverage-gate/src/apps/simple/src/components/Header/index.tsx",
          "status": "ADDED",
        },
      ]
    `);
  });
});
