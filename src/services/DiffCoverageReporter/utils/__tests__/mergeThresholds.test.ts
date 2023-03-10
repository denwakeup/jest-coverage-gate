import { mergeThresholds } from '../mergeThresholds';

describe('Merge thresholds', () => {
  it('should work correctly', () => {
    expect(
      mergeThresholds({
        coverageThreshold: {
          global: {
            statements: 80,
            functions: 70,
            lines: 60,
            branches: 40,
          },
        },
        diffThresholds: {
          added: {
            statements: 90,
            functions: 100,
            lines: 10,
            branches: 30,
          },
          modified: {
            statements: 0,
            functions: 0,
            lines: 0,
            branches: 0,
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "added": {
          "branches": 30,
          "functions": 100,
          "lines": 10,
          "statements": 90,
        },
        "modified": {
          "branches": 0,
          "functions": 0,
          "lines": 0,
          "statements": 0,
        },
      }
    `);

    expect(
      mergeThresholds({
        coverageThreshold: {
          global: {
            statements: 80,
            functions: 70,
            lines: 60,
            branches: 40,
          },
        },
        diffThresholds: {
          added: {
            statements: 90,
            functions: 100,
            lines: 10,
            branches: 30,
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "added": {
          "branches": 30,
          "functions": 100,
          "lines": 10,
          "statements": 90,
        },
        "modified": {
          "branches": 40,
          "functions": 70,
          "lines": 60,
          "statements": 80,
        },
      }
    `);
  });
});
