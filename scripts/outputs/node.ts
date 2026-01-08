import { join } from 'path'
import { writeFileSync } from 'fs'

const NODE_PATH = 'libs/node/src/data'

export function writeNodeJson(system: 'ICPC2B' | 'ICPC2' | 'ICD10', data: unknown[]) {
    const path = join(NODE_PATH, `${system.toLowerCase()}.json`)

    console.log(`    ↳ Writing ${data.length} ${system} codes to ${path}`)
    writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8')
}
