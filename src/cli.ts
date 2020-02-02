import meow from 'meow'

export default meow(`
    Usage
      $ js-on-s3 <file>

    Options
      --backet, -b    to bucket
      --path, -p      with this pash
      --ver, -V       with this version
      --dry-run, -d   run script but don't do anything

    Examples
      $ js-on-s3 ./uploadcare.js -b static -V 1.0.1 -p uploadcare/[version]/libs/[filename]
`, {
  flags: {
    backet: {
      type: 'string',
      alias: 'b'
    },
    path: {
      type: 'string',
      alias: 'p'
    },
    ver: {
      type: 'string',
      alias: 'v'
    },
    dryRun: {
      type: 'boolean',
      alias: 'd'
    }
  }
})
