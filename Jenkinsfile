pipeline {
    agent any

    parameters {
        string(
            name: 'SPEC_FILES',
            defaultValue: 'cypress/e2e/session_handling_exs/session_handling*.cy.js',
            description: 'Comma-separated spec file paths to run (e.g., cypress/e2e/login.cy.js,cypress/e2e/dashboard.cy.js). Leave empty to run all.'
        )
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from Git URL configured in the Jenkins job
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx cypress --version'
            }
        }

        stage('Determine Specs to Run') {
            steps {
                script {
                    def pattern = params.SPEC_FILES?.trim()
                    def resolvedSpecs = []

                    if (pattern) {
                        echo "🔍 Resolving wildcard spec pattern: ${pattern}"

                        resolvedSpecs = powershell(
                            returnStdout: true,
                            script: '''Get-ChildItem -Recurse -Path ''' + pattern + ''' | ForEach-Object { "$($_.FullName.Replace('\\', '/'))" }'''
                        ).trim().split('\n').findAll { it }
                    } else {
                        echo "🔍 No spec pattern provided. Using default: cypress/e2e/**/*.cy.js"

                        resolvedSpecs = powershell(
                            returnStdout: true,
                            script: '''Get-ChildItem -Recurse -Path cypress/e2e -Filter *.cy.js | ForEach-Object { "$($_.FullName.Replace('\\', '/'))" }'''
                        ).trim().split('\n').findAll { it }
                    }

                    echo "📄 Resolved ${resolvedSpecs.size()} spec files:"
                    resolvedSpecs.each { echo "- ${it}" }

                    env.SPECS = resolvedSpecs.join(',')
                }
            }
        }

        stage('Clean Cypress Artifacts') {
            steps {
                bat 'rmdir /S /Q cypress\\downloads || exit 0'
                bat 'rmdir /S /Q cypress\\screenshots || exit 0'
                bat 'rmdir /S /Q cypress\\videos || exit 0'
            }
        }

        stage('Run Specs in Parallel') {
            steps {
                script {
                    def specs = env.SPECS.split(',')
                    def branches = [:]
                    def ciBuildId = env.BUILD_TAG ?: "jenkins-build-${env.BUILD_ID}"

                    for (int i = 0; i < specs.size(); i++) {
                        def spec = specs[i].trim()
                        def index = i // avoid closure issue

                        branches["Spec-${index + 1}"] = {
                            node('windows-agent') { // Replace with your agents' label
                                ws {
                                    echo "🧪 Running spec: ${spec} on ${env.NODE_NAME}"

                                    // Step 1: Checkout source
                                    checkout scm

                                    // Step 2: Install deps
                                    bat 'npm ci'

                                    // Step 3: Run Cypress test with Cloud integration
                                    bat """
                                        npx cypress run ^
                                            --record ^
                                            --key 97c9d750-0d32-4465-81d9-6e3fafb79c2a ^
                                            --parallel ^
                                            --ci-build-id "${ciBuildId}" ^
                                            --spec "${spec}"
                                    """
                                }
                            }
                        }
                    }

                    parallel branches
                }
            }
        }
    }

    post {
        always {
            echo '🔄 Merging Mochawesome JSON reports...'
            bat 'npx mochawesome-merge "cypress/reports/mochawesome/*.json" > "cypress/reports/merged-report.json"'

            echo '📝 Generating HTML report...'
            bat 'npx marge "cypress/reports/merged-report.json" --reportDir "cypress/reports/mochawesome" --reportFilename "mochawesome" --inline'

            // Small delay to ensure file write completes before archiving
            bat 'ping -n 5 127.0.0.1 > nul'

            echo '📦 Archiving Cypress test artifacts...'
            archiveArtifacts artifacts: 'cypress/reports/mochawesome/mochawesome.html', fingerprint: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true

            echo '🌐 Publishing Mochawesome HTML report...'
            publishHTML([
                reportDir: 'cypress/reports/mochawesome',
                reportFiles: 'mochawesome.html',
                reportName: 'MochawesomeReport',
                allowMissing: false,
                escapeUnderscores: false,
                alwaysLinkToLastBuild: true,
                keepAll: true
            ])

            echo "📄 View report: ${env.BUILD_URL}artifact/cypress/reports/mochawesome/mochawesome.html"
        }
    }
}
