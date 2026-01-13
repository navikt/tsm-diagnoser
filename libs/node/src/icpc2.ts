import { BaseEntry } from './types'

import icpc2 from './data/icpc2.json' with { type: 'json' }

export type ISPC2Diagnosis = BaseEntry & {
    system: 'ICPC2'
}

export const ICPC2 = icpc2.map((it) => ({ ...it, system: 'ICPC2' })) satisfies ISPC2Diagnosis[]

export function getICPC2(code: string): ISPC2Diagnosis | null {
    return ICPC2.find((it) => it.code === code) ?? null
}

export default ICPC2
