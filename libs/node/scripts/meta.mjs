#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

const [, , inputDir] = process.argv

if (!inputDir) {
    console.error('Usage: meta.mjs <project-folder>')
    process.exit(1)
}

const project = path.basename(inputDir)
const metaPath = path.join(inputDir, 'dist', 'metafile-esm.json')
const prefix = inputDir.endsWith('/') ? inputDir : inputDir + '/'

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))

console.log(`## TSUP Build Summary: ${project}\n`)

console.log(`Entrypoints:\n`)

for (const [file, data] of Object.entries(meta.outputs).filter(([, it]) => !!it.entryPoint)) {
    const sizeKb = (data.bytes / 1024).toFixed(1)
    const relativeFile = file.replace(prefix, '')
    console.log(`- \`${relativeFile.replace('dist/', '')}\` (from \`${data.entryPoint}\`) — ${sizeKb} KB`)
    data.imports
        .map((it) => it.path)
        .forEach((it) => {
            console.log(
                `  - ↳ \`${it.replace(prefix, '').replace('dist/', '')}\` - ${(meta.outputs[it].bytes / 1024).toFixed(1)} KB`,
            )
        })
    console.log('\n')
}

console.log(`All chunks:\n`)

for (const [file, data] of Object.entries(meta.outputs).filter(([, it]) => !it.entryPoint)) {
    const sizeKb = (data.bytes / 1024).toFixed(1)
    const relativeFile = file.replace(prefix, '')
    console.log(`- \`${relativeFile.replace('dist/', '')}\` (with \`${Object.keys(data.inputs)[0]}\`) — ${sizeKb} KB`)
}
