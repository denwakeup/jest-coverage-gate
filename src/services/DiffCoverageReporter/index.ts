import type { ReportBase, Context, ReportNode } from 'istanbul-lib-report';
import type { CoverageSummary } from 'istanbul-lib-coverage';

import { ECoverageCheckStatus } from '../../constants/coverageGate.constants';
import { IDiffCoverageThreshold } from '../../interfaces/threshold.interfaces';
import { IDiffCoverageCheckResult } from '../../interfaces/coverage.interfaces';
import { CoverageGate } from '../CoverageGate';
import { DiffCoverageFiles } from '../DiffCoverageFiles';

import { mergeThresholds } from './utils/mergeThresholds';
import { presentDiffCoverageResult } from './utils/presentDiffCoverageResult';

interface IParams extends Partial<IDiffCoverageThreshold> {
  since?: string;
  rootDir?: string;
}

export class DiffCoverageReporter implements ReportBase {
  static default: typeof DiffCoverageReporter;

  private threshold: IDiffCoverageThreshold;
  private since?: string;
  private rootDir: string;

  constructor({ rootDir, since, added, modified }: IParams = {}) {
    this.rootDir = rootDir ?? process.cwd();
    this.since = since;

    this.threshold = mergeThresholds({
      diffThresholds: { added, modified },
    });
  }

  execute(context: Context) {
    const collectSince = this.since;

    if (!collectSince) {
      return;
    }

    const coverageMap = new Map<string, CoverageSummary>();

    context.getTree('flat').visit(
      {
        onDetail: (node: ReportNode) => {
          coverageMap.set(
            node.fileCoverage.path,
            node.fileCoverage.toSummary()
          );
        },

        onEnd: () => {
          const files = new DiffCoverageFiles({
            rootDir: this.rootDir,
            since: collectSince,
            threshold: this.threshold,
          });

          const coverageGate = new CoverageGate({
            coverageMap,
          });

          const result = coverageGate.check({ files });

          if (result.status === ECoverageCheckStatus.ERROR) {
            console.log(
              presentDiffCoverageResult({
                result,
                threshold: this.threshold,
                rootDir: this.rootDir,
              })
            );
            process.exit(1);
          }
        },
      },
      context
    );
  }
}
