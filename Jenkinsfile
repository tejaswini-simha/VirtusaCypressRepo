pipeline {
    agent any

    parameters {
        string(
            name: 'SPEC_FILES',
            defaultValue: '',
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
        stage('Clean reports') {
            steps {
                bat 'del /Q cypress\\reports\\mochawesome\\*.json'
            }
        }

        stage('Run Specs in Parallel') {
            steps {
                script {
                    def specs = env.SPECS.split(',')
                    def branches = [:]

                    for (int i = 0; i < specs.size(); i++) {
                        def spec = specs[i].trim()
                        branches["Spec-${i+1}"] = {
                            echo "▶️ Starting spec: ${spec} on executor ${env.NODE_NAME} at ${new Date()}"
                            bat "npx cypress run --browser chrome --headless --spec \"${spec}\""
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
