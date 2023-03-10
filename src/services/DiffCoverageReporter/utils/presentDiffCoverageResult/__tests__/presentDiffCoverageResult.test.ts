import jestSnapshotSerializerAnsi from 'jest-snapshot-serializer-ansi';

import { diffCoverageCheckResultMock, rootDirMock } from '../../../../../mocks';
import { presentDiffCoverageResult } from '../index';

expect.addSnapshotSerializer(jestSnapshotSerializerAnsi);

describe('Diff Coverage Result presenter', () => {
  it('should work correctly', () => {
    expect(
      presentDiffCoverageResult({
        result: diffCoverageCheckResultMock,
        rootDir: rootDirMock,
      })
    ).toMatchSnapshot();
  });
});
