import { rootDirMock } from '../../../../mocks';
import { presentFilePath } from '../presentFilePath';

describe('File path presenters', () => {
  it('should work correctly', () => {
    const rootDirWithTrailingSlash = `${rootDirMock}/`;
    const filePath = `${rootDirMock}/utils/presentFilePath.ts`;

    expect(presentFilePath(filePath, rootDirMock)).toMatchInlineSnapshot(
      `"utils/presentFilePath.ts"`
    );

    expect(
      presentFilePath(filePath, rootDirWithTrailingSlash)
    ).toMatchInlineSnapshot(`"utils/presentFilePath.ts"`);

    expect(presentFilePath(filePath)).toMatchInlineSnapshot(
      `"/Users/packages/coverage-gate/src/utils/presentFilePath.ts"`
    );
  });
});
