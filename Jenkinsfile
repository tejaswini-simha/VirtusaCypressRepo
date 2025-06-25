pipeline {
    agent any

    parameters {
        string(name: 'SPEC', defaultValue: '', description: 'Optional spec file(s) to run (e.g. cypress/e2e/mytest.cy.js)')
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Cypress Tests (Headless Chrome with Retries)') {
            steps {
                script {
                    def specOption = params.SPEC?.trim() ? "--spec \"${params.SPEC}\"" : ""
                    bat "npx cypress run --browser chrome --headless ${specOption}"
                }
            }
        }

        // stage('Generate HTML Report') {
        //     steps {
        //         bat '''
        //             npx mochawesome-merge "cypress\\reports\\*.json" > "cypress\\reports\\merged-report.json"
        //             npx marge "cypress\\reports\\merged-report.json" --reportDir "cypress\\reports\\mochawesome"
        //         '''
        //     }
        // }
    }

    post {
        always {
            // Merge and generate HTML report (even on failures)
            bat '''
                npx mochawesome-merge "cypress/reports/mochawesome/*.json" > "cypress/reports/merged-report.json"
                npx marge "cypress/reports/merged-report.json" --reportDir "cypress/reports/mochawesome-report" --reportFilename "mochawesome"
            '''

            // Archive and publish
            archiveArtifacts artifacts: 'cypress\\reports\\mochawesome-report\\mochawesome.html', fingerprint: true
            archiveArtifacts artifacts: 'cypress\\screenshots\\**\\*.*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress\\videos\\**\\*.*', allowEmptyArchive: true

            // Publish HTML report
            publishHTML([
                reportDir: 'cypress/reports/mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'MochaAwesome Report',
                alwaysLinkToLastBuild: true,
                keepAll: true
            ])
        }
    }

}
