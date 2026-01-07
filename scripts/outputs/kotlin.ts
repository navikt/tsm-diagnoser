import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const KOTLIN_PATH = 'libs/kotlin/lib/src/main/kotlin/no/nav/tsm/diagnoser/codes'

export function generateKotlinDiagnosis(
    system: 'ICPC2B' | 'ICPC2' | 'ICD10',
    diagnosis: { code: string; text: string }[],
): void {
    const file = readFileSync(join(KOTLIN_PATH, `${system}.kt`), 'utf-8')

    let generatedKotlinList = diagnosis
        .map((it) => `Diagnose(system = DiagnoseType.${system}, code = "${it.code}", text = "${it.text}"),`)
        .join('\n  ')

    const updatedIcpc2bFile = file.replace(
        /\/\*\* CODEGEN START \*\*\/[\s\S]*?\/\*\* CODEGEN END \*\*\//,
        `/** CODEGEN START **/\n  ${generatedKotlinList}\n  /** CODEGEN END **/`,
    )

    console.log(`    ↳ Writing ${diagnosis.length} ${system} to ${system}.kt (Kotlin)`)
    writeFileSync(join(KOTLIN_PATH, `${system}.kt`), updatedIcpc2bFile, 'utf-8')
}
