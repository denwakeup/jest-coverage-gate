import { checkCoverageParam } from '../checkCoverageParam';

describe('Coverage Param checker', () => {
  it('should work correctly', () => {
    expect(
      checkCoverageParam(
        {
          total: 30,
          covered: 20,
          skipped: 10,
          pct: 60,
        },
        80
      )
    ).toMatchInlineSnapshot(`
      {
        "current": 60,
        "expected": 80,
        "status": "ERROR",
      }
    `);

    expect(
      checkCoverageParam(
        {
          total: 30,
          covered: 20,
          skipped: 10,
          pct: 60,
        },
        40
      )
    ).toMatchInlineSnapshot(`
      {
        "current": 60,
        "expected": 40,
        "status": "SUCCESS",
      }
    `);

    expect(checkCoverageParam()).toBeNull();
    expect(checkCoverageParam(undefined, 50)).toBeNull();
    expect(
      checkCoverageParam({
        total: 30,
        covered: 20,
        skipped: 10,
        pct: 60,
      })
    ).toBeNull();
  });
});
