import ansiEscapesSerializer from 'jest-serializer-ansi-escapes';

import { presentMainText } from '../presentMainText';

expect.addSnapshotSerializer(ansiEscapesSerializer);

describe('Main text presenter', () => {
  it('should work correctly', () => {
    expect(presentMainText('Title', false)).toMatchInlineSnapshot(
      `"<green>Title</color>"`
    );
    expect(presentMainText('Title', true)).toMatchInlineSnapshot(
      `"<red>Title</color>"`
    );
  });
});
