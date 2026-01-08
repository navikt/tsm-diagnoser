package no.nav.tsm.diagnoser.utils

import no.nav.tsm.diagnoser.Diagnose
import no.nav.tsm.diagnoser.DiagnoseType
import java.nio.charset.StandardCharsets

enum class CSVs(
  val path: String
) {
  ICD10("/icd10.csv"),
  ICPC2("/icpc2.csv"),
  ICPC2B("/icpc2b.csv"),
}

object Load {
  fun csv(file: CSVs): List<Diagnose> =
    requireNotNull(Load::class.java.getResourceAsStream(file.path)) {
      "Missing resource: /${file.path}"
    }.bufferedReader(StandardCharsets.UTF_8).use { reader ->
      reader.lineSequence()
        // First line is header
        .drop(1)
        .map(String::trim)
        .map { line ->
          val (systemRaw, codeRaw, textRaw) = line.split('#').also {
            require(it.size == 3 || it.size == 5) { "Bad ${file.path} line (expected 3 or 5 fields): '$line'" }
          }

          Diagnose(
            system = DiagnoseType.valueOf(systemRaw.trim()),
            code = codeRaw.trim(),
            text = textRaw.trim()
          )
        }
        .toList()
    }
}
