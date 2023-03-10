import ansiEscapesSerializer from 'jest-serializer-ansi-escapes';

import { ECoverageCheckStatus } from '../../../../../constants/coverageGate.constants';
import { presentColumnValue } from '../presentColumnValue';

expect.addSnapshotSerializer(ansiEscapesSerializer);

describe('Column Value presenter', () => {
  it('should work correctly', () => {
    expect(presentColumnValue('testValue')).toMatchInlineSnapshot(
      `"<white>testValue</color>"`
    );
    expect(
      presentColumnValue('testValue', ECoverageCheckStatus.ERROR)
    ).toMatchInlineSnapshot(`"<red>testValue</color>"`);
    expect(
      presentColumnValue('testValue', ECoverageCheckStatus.SUCCESS)
    ).toMatchInlineSnapshot(`"<green>testValue</color>"`);
  });
});
