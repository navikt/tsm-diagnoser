plugins {
  alias(libs.plugins.kotlin.jvm)
  `java-library`
  id("maven-publish")
}

repositories {
  mavenCentral()
}

dependencies {
  testImplementation("org.jetbrains.kotlin:kotlin-test")
  testImplementation(libs.junit.jupiter.engine)
  testRuntimeOnly("org.junit.platform:junit-platform-launcher")

  // External libs
  api(libs.commons.math3)

  // Internal libs
  implementation(libs.guava)
}

java {
  toolchain {
    languageVersion = JavaLanguageVersion.of(21)
  }
}

tasks.named<Test>("test") {
  useJUnitPlatform()
}

publishing {
  publications {
    create<MavenPublication>("gpr") {
      from(components["java"])
      groupId = "no.nav.tsm"
      artifactId = "diagnoser"
      // version = file("version").readText().trim()
    }
  }
  repositories {
    maven {
      name = "GitHubPackages"
      url = uri("https://maven.pkg.github.com/navikt/tsm-sykmelding-input")
      credentials {
        username = "x-access-token"
        password = System.getenv("GITHUB_TOKEN")
      }
    }
  }
}
