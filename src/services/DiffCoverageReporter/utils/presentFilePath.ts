export const presentFilePath = (filePath: string, rootDir?: string) => {
  if (!rootDir) {
    return filePath;
  }

  const replaceValue = rootDir.endsWith('/') ? rootDir : `${rootDir}/`;

  return filePath.replace(replaceValue, '');
};
