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
}

java {
  toolchain { languageVersion = JavaLanguageVersion.of(21) }
  withSourcesJar()
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
      // TODO: Figure out smart way to handle versioning
      version = "2026.1.0-${System.currentTimeMillis() / 1000L}"
    }
  }
  repositories {
    maven {
      name = "GitHubPackages"
      url = uri("https://maven.pkg.github.com/navikt/tsm-diagnoser")
      credentials {
        username = "x-access-token"
        password = System.getenv("GITHUB_TOKEN")
      }
    }
  }
}
