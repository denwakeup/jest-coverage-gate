import { DiffCoverageFiles } from '../index';
import * as GetGitChangedFiles from '../utils/getGitChangedFiles';
import { changedFilesMock, rootDirMock } from '../../../mocks';
import { EDiffFileStatus } from '../../../constants/coverageGate.constants';

describe('Diff Coverage Files', () => {
  const getGitChangedFiles = jest.spyOn(
    GetGitChangedFiles,
    'getGitChangedFiles'
  );

  const thresholdMock = {
    added: {
      functions: 80,
      branches: 80,
    },
    modified: {
      functions: 10,
      branches: 10,
    },
  };

  beforeEach(() => {
    getGitChangedFiles.mockReturnValue(changedFilesMock);
  });

  it('should work correctly', async () => {
    const diffCoverageFiles = new DiffCoverageFiles({
      since: 'develop',
      rootDir: rootDirMock,
      threshold: thresholdMock,
    });

    const files = await diffCoverageFiles.getFiles();

    const addedFile = Array.from(files.values()).find(
      (file) => file.status === EDiffFileStatus.ADDED
    );
    const modifiedFile = Array.from(files.values()).find(
      (file) => file.status === EDiffFileStatus.MODIFIED
    );

    expect(files).toBe(changedFilesMock);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(await diffCoverageFiles.getFileThreshold(addedFile!)).toEqual(
      thresholdMock.added
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(await diffCoverageFiles.getFileThreshold(modifiedFile!)).toEqual(
      thresholdMock.modified
    );
  });
});
