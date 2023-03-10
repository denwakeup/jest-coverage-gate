import { sync } from 'execa';

export const getGitRoot = ({ rootDir }: { rootDir: string }): string => {
  const { stdout } = sync('git', ['rev-parse', '--show-toplevel'], {
    cwd: rootDir,
  });

  return stdout;
};
