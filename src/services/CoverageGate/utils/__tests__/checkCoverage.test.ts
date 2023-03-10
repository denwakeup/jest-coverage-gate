import { coverageSummaryDataMock } from '../../../../mocks';
import { checkCoverage } from '../checkCoverage';

describe('Coverage checker', () => {
  it('should work correctly', () => {
    expect(
      checkCoverage(coverageSummaryDataMock, {
        branches: 80,
        functions: 30,
        lines: 50,
        statements: 80,
      })
    ).toMatchInlineSnapshot(`
      {
        "status": "ERROR",
        "summary": {
          "branches": {
            "current": 60,
            "expected": 80,
            "status": "ERROR",
          },
          "functions": {
            "current": 60,
            "expected": 30,
            "status": "SUCCESS",
          },
          "lines": {
            "current": 60,
            "expected": 50,
            "status": "SUCCESS",
          },
        },
      }
    `);

    expect(
      checkCoverage(coverageSummaryDataMock, {
        branches: 5,
        functions: 5,
        lines: 5,
        statements: 5,
      })
    ).toMatchInlineSnapshot(`
      {
        "status": "SUCCESS",
        "summary": {
          "branches": {
            "current": 60,
            "expected": 5,
            "status": "SUCCESS",
          },
          "functions": {
            "current": 60,
            "expected": 5,
            "status": "SUCCESS",
          },
          "lines": {
            "current": 60,
            "expected": 5,
            "status": "SUCCESS",
          },
        },
      }
    `);
  });
});
