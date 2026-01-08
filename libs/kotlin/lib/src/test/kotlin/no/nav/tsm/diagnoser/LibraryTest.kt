package no.nav.tsm.diagnoser

import org.junit.jupiter.api.assertThrows
import kotlin.test.Test
import kotlin.test.assertEquals

class LibraryTest {

  @Test
  fun `should properly load ICD10 diagnosis`() {
    assertEquals(ICD10["A00.0"]?.text, "Kolera som skyldes Vibrio cholerae 01, biovar cholerae")
    assertEquals(ICD10["A000"]?.text, "Kolera som skyldes Vibrio cholerae 01, biovar cholerae")

    assert(ICD10().size > 19000) { "ICD10 diagnosis size was ${ICD10().size}, expected more than 19000" }
  }

  @Test
  fun `should properly load ICPC2 diagnosis`() {
    assertEquals(ICPC2["A03"]?.text, "Feber")

    assert(ICPC2().size > 700) { "ICPC2 diagnosis size was ${ICPC2().size}, expected more than 700" }
  }

  @Test
  fun `should properly load ICPC2B diagnosis`() {
    assertEquals(ICPC2B["A01.0001"]?.text, "Kronisk generell smerte")

    assert(ICPC2B().size > 6000) { "ICPC2B diagnosis size was ${ICPC2B().size}, expected more than 6000" }
  }

  @Test
  fun `should be able to go from ICPC2B to ICPC2 diagnosis`() {
    val icpc2bDiagnosis = requireNotNull(ICPC2B["A01.0001"])

    assertEquals(icpc2bDiagnosis.toICPC2().text, "Smerte generell/flere steder")
  }

  @Test
  fun `should be able to instansiate with dot-from`() {
    assertEquals(
      requireNotNull(
        Diagnose.from(DiagnoseType.ICPC2B, "A01.0001")
      ).text, "Kronisk generell smerte"
    )
    assertEquals(
      requireNotNull(
        Diagnose.from("ICPC2B", "A01.0001")
      ).text, "Kronisk generell smerte"
    )
  }

  @Test
  fun `instansiateing with dot-from with bad system should throw`() {
    assertThrows<IllegalArgumentException> { Diagnose.from("Wat", "A01.0001") }
  }
}
