import execa from 'execa';

import { rootDirMock } from '../../../../mocks';
import { getGitRoot } from '../getGitRoot';

jest.mock('execa');

describe('Git Root getter', () => {
  const execaSpy = jest.spyOn(execa, 'sync');

  beforeEach(() => {
    execaSpy.mockReturnValue({
      stdout: '',
    } as any);
  });

  it('should work correctly', async () => {
    await getGitRoot({
      rootDir: rootDirMock,
    });

    expect(execaSpy).toBeCalledWith('git', ['rev-parse', '--show-toplevel'], {
      cwd: rootDirMock,
    });
  });
});
