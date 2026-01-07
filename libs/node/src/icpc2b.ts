import { BaseEntry } from './types'

import icpc2b from './data/icpc2b.json' with { type: 'json' }

export type ICPC2BDiagnosis = BaseEntry & {
    system: 'ICPC2B'
    parent_code: string
    parent_text: string
}

export const ICPC2B = icpc2b.map((it) => ({ ...it, system: 'ICPC2B' })) satisfies ICPC2BDiagnosis[]

export default ICPC2B
