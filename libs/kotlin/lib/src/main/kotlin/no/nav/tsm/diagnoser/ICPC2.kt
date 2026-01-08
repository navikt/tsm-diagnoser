package no.nav.tsm.diagnoser

import no.nav.tsm.diagnoser.utils.CSVs
import no.nav.tsm.diagnoser.utils.Load

object ICPC2 : Diagnoseable() {
  override val OID = "2.16.578.1.12.4.1.1.7170"

  override val diagnosis: List<Diagnose> = Load.csv(CSVs.ICPC2)
}
