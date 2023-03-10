export enum ECoverageCheckStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum EDiffFileStatus {
  ADDED = 'ADDED',
  MODIFIED = 'MODIFIED',
}

export const FILE_STATUS_MAP: Record<string, EDiffFileStatus> = {
  M: EDiffFileStatus.MODIFIED,
  A: EDiffFileStatus.ADDED,
};
