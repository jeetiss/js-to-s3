#!/usr/bin/env node

const { default: cli } = require('../lib/cli')
const { upload } = require('../lib/upload')

upload(cli.input, cli.flags.path, cli.flags.V, cli.flags.bucket, cli.flags.dryRun).then(() => {
  console.log('Done.')
}).catch((eror) => {
  console.log('Fail.')
  console.log(eror)
})
