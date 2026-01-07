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
)

