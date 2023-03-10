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
      })
    ).toMatchSnapshot();
  });
});
