import { BaseEntry } from './types'

import icd10 from './data/icd10.json' with { type: 'json' }

export type ICD10Diagnosis = BaseEntry & {
    system: 'ICD10'
}

export const ICD10 = icd10.map((it) => ({ ...it, system: 'ICD10' })) satisfies ICD10Diagnosis[]

export default ICD10
