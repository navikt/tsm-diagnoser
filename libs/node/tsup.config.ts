import { defineConfig } from 'tsup'

export default defineConfig({
    format: 'esm',
    dts: true,
    clean: true,
    metafile: true,
    entry: ['src/index.ts', 'src/icd10.ts', 'src/icpc2.ts', 'src/icpc2b.ts'],
})
