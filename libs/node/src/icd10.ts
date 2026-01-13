import { BaseEntry } from './types'

import icd10 from './data/icd10.json' with { type: 'json' }

export type ICD10Diagnosis = BaseEntry & {
    system: 'ICD10'
}

export const ICD10_OID = '2.16.578.1.12.4.1.1.7110'

export const ICD10 = icd10.map((it) => ({ ...it, system: 'ICD10' })) satisfies ICD10Diagnosis[]

export function getICD10(code: string): ICD10Diagnosis | null {
    return ICD10.find((it) => it.code.replace('.', '') === code.replace('.', '')) ?? null
}

export default ICD10
