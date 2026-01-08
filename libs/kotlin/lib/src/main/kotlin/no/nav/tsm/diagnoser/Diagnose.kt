package no.nav.tsm.diagnoser

enum class DiagnoseType {
  ICPC2,
  ICPC2B,
  ICD10
}

data class Diagnose(
  val system: DiagnoseType,
  val code: String,
  val text: String
) {
  companion object {
    fun from(system: String, code: String): Diagnose? =
      from(DiagnoseType.valueOf(system), code)

    fun from(system: DiagnoseType, code: String): Diagnose? =
      when (system) {
        DiagnoseType.ICPC2 -> ICPC2[code]
        DiagnoseType.ICPC2B -> ICPC2B[code]
        DiagnoseType.ICD10 -> ICD10[code]
      }
  }
}
