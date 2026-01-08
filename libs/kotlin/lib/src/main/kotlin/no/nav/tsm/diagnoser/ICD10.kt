package no.nav.tsm.diagnoser

import no.nav.tsm.diagnoser.utils.CSVs
import no.nav.tsm.diagnoser.utils.Load

object ICD10 : Diagnoseable() {
  override val OID = "2.16.578.1.12.4.1.1.7110"

  override val diagnosis: List<Diagnose> = Load.csv(CSVs.ICD10)

  override operator fun get(code: String): Diagnose? =
    diagnosis.find { it.code.replace(".", "") == code.replace(".", "") }
}
