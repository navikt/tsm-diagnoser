/* eslint-disable no-console */

import { readFile } from 'node:fs/promises'

import * as R from 'remeda'
import { isBefore } from 'date-fns'

import { writeNodeJson } from './outputs/node.ts'
import { writeKotlinCsv } from './outputs/kotlin.ts'

const today = new Date()

async function parseICPC2(): Promise<void> {
    console.info('Parsing ICPC-2(B) kodeverk')

    const rawIcpc2 = await readFile('./scripts/raw/icpc2.json', 'utf-8')
        .catch(() => {
            console.error('\x1b[31m\n    ↳ Unable to find ./scripts/raw/icpc2.json. Run yarn kote:get first.\x1b[0m')
            process.exit(1)
        })
        .then(JSON.parse)

    type KoteEntry = {
        Kode: string
        Tekst_uten_lengdebegrensning: string
        Gyldig_fra: string
        Gyldig_til?: string
        Kodeverk: string
        Tilhørighet_i_ICPC_2B: string
        Foreldrekode: string
        Foreldrekodetekst: string
    }

    const icpc2 = R.pipe(
        rawIcpc2 as KoteEntry[],
        R.groupBy((it) => it.Kodeverk),
        R.prop('ICPC-2B'),
        // "Root" ICDC-2 nodes are the only one that have Tilhørighet_i_ICPC_2B === 'ICPC-2'
        R.filter((it) => it['Tilhørighet_i_ICPC_2B'] === 'ICPC-2'),
        R.filter((it) => it['Gyldig_til'] == null || !isBefore(it['Gyldig_til'], today)),
        R.map((it) => ({
            system: 'ICPC2',
            code: it.Foreldrekode,
            text: it.Foreldrekodetekst,
        })),
    )

    writeNodeJson('ICPC2', icpc2)
    writeKotlinCsv('ICPC2', icpc2)

    const icpc2b = R.pipe(
        rawIcpc2 as KoteEntry[],
        R.groupBy((it) => it.Kodeverk),
        R.prop('ICPC-2B'),
        // "Sub-terms" in ICDC-2B has the value TERM, there are also ICD-10 nodes, we don't want these (probably).
        R.filter((it) => it['Tilhørighet_i_ICPC_2B'] === 'TERM'),
        R.filter((it) => it['Gyldig_til'] == null || !isBefore(it['Gyldig_til'], today)),
        R.map((it) => ({
            system: 'ICPC2B',
            code: it.Kode,
            text: it.Tekst_uten_lengdebegrensning,
            parent_code: it.Foreldrekode,
            parent_text: it.Foreldrekodetekst,
        })),
    )

    writeNodeJson('ICPC2B', icpc2b)
    writeKotlinCsv('ICPC2B', icpc2b)
}

async function parseICD10(): Promise<void> {
    console.info('Parsing ICD10 kodeverk')

    const rawIcd10 = await readFile('./scripts/raw/icd10.json', 'utf-8')
        .catch(() => {
            console.error('\x1b[31m\n    ↳ Unable to find ./scripts/raw/icd10.json. Run yarn kote:get first.\x1b[0m')
            process.exit(1)
        })
        .then(JSON.parse)

    type KoteEntry = {
        Kode: string
        Tekst_uten_lengdebegrensning: string
        Tekst_med_maksimalt_60_tegn?: string
        Gyldig_fra: string
        Gyldig_til?: string
        Rapporteres_til_NPR?: string
        NPR_Gyldig_fra?: string
        NPR_Gyldig_til?: string
        Stjernekode?: string
        Tilleggskode?: string
        Kjønn?: string
        Uspesifikk_kode?: string
        Foreldrekode?: string
        Foreldrekodetekst?: string
    }

    const icd10 = R.pipe(
        rawIcd10 as KoteEntry[],
        R.filter((it) => it.Rapporteres_til_NPR == 'Ja'),
        R.filter((it) => it['Gyldig_til'] == null || !isBefore(it['Gyldig_til'], today)),
        R.map((it) => ({
            system: 'ICD10',
            code: it.Kode,
            text: it.Tekst_uten_lengdebegrensning,
        })),
    )

    writeNodeJson('ICD10', icd10)
    writeKotlinCsv('ICD10', icd10)
}

await parseICD10()
await parseICPC2()
