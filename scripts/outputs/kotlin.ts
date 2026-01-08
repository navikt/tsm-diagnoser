import * as R from 'remeda'
import { join } from 'path'
import { writeFileSync } from 'fs'

const KOTLIN_PATH = 'libs/kotlin/lib/src/main/resources'
const SEPARATOR = '#'

export function writeKotlinCsv(system: 'ICPC2B' | 'ICPC2' | 'ICD10', data: Record<string, unknown>[]) {
    const path = join(KOTLIN_PATH, `${system.toLowerCase()}.csv`)

    const headers = Object.keys(data[0]).join(SEPARATOR)
    const csv = R.pipe(
        data,
        R.map((it) => Object.values(it).join(SEPARATOR)),
        R.join('\n'),
    )
    const csvFile = `${headers}\n${csv}`

    console.log(`    ↳ Writing ${data.length} ${system} codes to ${path}`)
    writeFileSync(path, csvFile, 'utf-8')
}
