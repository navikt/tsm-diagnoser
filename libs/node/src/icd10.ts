import { BaseEntry } from './types'

import icd10 from './data/icd10.json' with { type: 'json' }

export type ICD10Diagnosis = BaseEntry & {
    system: 'ICD10'
}

export const ICD10 = icd10.map((it) => ({ ...it, system: 'ICD10' })) satisfies ICD10Diagnosis[]

export function getICD10(code: string): ICD10Diagnosis | null {
    return ICD10.find((it) => it.code === code) ?? null
}

export default ICD10
