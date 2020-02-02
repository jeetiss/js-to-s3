export default (
  path: string,
  opts: { filename: string, version: string }
): string =>
  Object.entries(opts).reduce<string>(
    (path, [key, value]) =>
      path.replace(new RegExp(`\\[${key}\\]`, 'g'), value),
    path
  )
