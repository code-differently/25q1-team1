plugins {
    application
    jacoco
    id("com.diffplug.spotless") version "6.25.0"
    id("com.adarshr.test-logger") version "4.0.0"
}

repositories {
    // Use Maven Central for resolving dependencies.
    mavenCentral()
}

dependencies {
    // Use JUnit Jupiter for testing.
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.3")
    testImplementation("org.assertj:assertj-core:3.26.3")
    testImplementation("at.favre.lib:bcrypt:0.10.2")

    // This dependency is used by the application.
    implementation("com.google.guava:guava:33.3.1-jre")
    implementation("com.google.code.gson:gson:2.11.0")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

application {
    // Define the main class for the application.
    mainClass.set("q1.team1.App")
}

tasks.named<Test>("test") {
    // Use JUnit Platform for unit tests.
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
    dependsOn(tasks.test)
    reports {
        xml.required = true
    }
}

tasks.jacocoTestCoverageVerification {
  violationRules {
    rule {
      limit {
        minimum = "0.8".toBigDecimal()
      }
    }
  }
}

tasks.check {
	dependsOn(tasks.jacocoTestCoverageVerification)
}

configure<com.diffplug.gradle.spotless.SpotlessExtension> {

  format("misc", {
    // define the files to apply `misc` to
    target("*.gradle", ".gitattributes", ".gitignore")

    // define the steps to apply to those files
    trimTrailingWhitespace()
    indentWithTabs() // or spaces. Takes an integer argument if you don't like 4
    endWithNewline()
  })

  java {
    // don't need to set target, it is inferred from java

    // apply a specific flavor of google-java-format
    googleJavaFormat()
    // fix formatting of type annotations
    formatAnnotations()
  }
}
