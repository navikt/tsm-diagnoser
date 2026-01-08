package no.nav.tsm.diagnoser

import no.nav.tsm.diagnoser.utils.CSVs
import no.nav.tsm.diagnoser.utils.Load

object ICPC2B : Diagnoseable() {

  override val OID = "2.16.578.1.12.4.1.1.7171"

  override val diagnosis: List<Diagnose> = Load.csv(CSVs.ICPC2B)
}

fun Diagnose.toICPC2(): Diagnose {
  require(this.system == DiagnoseType.ICPC2B) { "Cannot convert non-ICPC2B diagnose to ICPC2" }

  val icpc2Code = requireNotNull(this.code.split('.').firstOrNull()) { "Invalid ICPC2B code format: ${this.code}" }
  val icpc2Diagnosis = requireNotNull(ICPC2[icpc2Code]) { "No matching ICPC2 code found for ICPC2B code: ${this.code}"}

  return icpc2Diagnosis
}
