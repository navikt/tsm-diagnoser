package no.nav.tsm.diagnoser

abstract class Diagnoseable {

  /**
   * OID for the code system
   */
  abstract val OID: String

  protected abstract val diagnosis: List<Diagnose>

  open operator fun get(code: String): Diagnose? =
    diagnosis.find { it.code == code }

  operator fun invoke() = diagnosis
}
