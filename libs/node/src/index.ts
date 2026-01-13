import { getICD10, ICD10_OID } from './icd10'
import { getICPC2, ICPC2_OID } from './icpc2'
import { getICPC2B, ICPC2B_OID } from './icpc2b'

export { ICD10, ICD10_OID, type ICD10Diagnosis, getICD10 } from './icd10'
export { ICPC2, ICPC2_OID, type ISPC2Diagnosis, getICPC2 } from './icpc2'
export { ICPC2B, ICPC2B_OID, type ICPC2BDiagnosis, getICPC2B } from './icpc2b'

export function diagnoseFrom(system: 'ICD10' | 'ICPC2' | 'ICPC2B', code: string) {
    switch (system) {
        case 'ICPC2B':
            return getICPC2B(code)
        case 'ICPC2':
            return getICPC2(code)
        case 'ICD10':
            return getICD10(code)
        default:
            return null
    }
}

export function diagnoseFromOid(oid: string, code: string) {
    switch (oid) {
        case ICPC2B_OID:
            return getICPC2B(code)
        case ICPC2_OID:
            return getICPC2(code)
        case ICD10_OID:
            return getICD10(code)
        default:
            return null
    }
}
