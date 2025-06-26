pipeline {
    agent any

    environment {
        CYPRESS_CACHE_FOLDER = 'node_modules/.cache/Cypress'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/your-org/your-cypress-repo.git' // Replace with your repo URL
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Discover Spec Files') {
            steps {
                script {
                    // Find all .cy.js spec files
                    def specs = powershell(
                        returnStdout: true,
                        script: 'Get-ChildItem -Recurse -Filter *.cy.js -Path cypress\\e2e | ForEach-Object { $_.FullName.Replace("\\", "/") }'
                    ).trim().split('\n')

                    echo "Discovered Specs:\n${specs.join('\n')}"
                    env.SPECS = specs.join(',')
                }
            }
        }

        stage('Run Cypress Specs in Parallel') {
            steps {
                script {
                    def specFiles = env.SPECS.split(',')
                    def branches = [:]

                    for (int i = 0; i < specFiles.length; i++) {
                        def spec = specFiles[i].trim()
                        branches["Spec-${i+1}"] = {
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
            echo 'Merging Mochawesome JSON reports...'
            bat 'npx mochawesome-merge "cypress/reports/mochawesome/*.json" > "cypress/reports/merged-report.json"'

            echo 'Generating HTML report with marge...'
            bat 'npx marge "cypress/reports/merged-report.json" --reportDir "cypress/reports/mochawesome" --reportFilename "mochawesome" --inline'

            // Add a wait to make sure report is fully written
            bat 'ping -n 5 127.0.0.1 > nul'

            echo 'Archiving test artifacts...'
            archiveArtifacts artifacts: 'cypress/reports/mochawesome/mochawesome.html', fingerprint: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.*', allowEmptyArchive: true

            echo 'Publishing Mochawesome report...'
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
