pipeline {
    agent none

    environment {
        CYPRESS_RECORD_KEY = '97c9d750-0d32-4465-81d9-6e3fafb79c2a' // replace with your Cypress Cloud record key
        BUILD_ID_FOR_CYPRESS = "${env.BUILD_TAG ?: "jenkins-${env.BUILD_ID}"}"
    }

    stages {
        stage('Parallel Cypress Tests') {
            parallel {
                stage('Tester A - Node 1') {
                    agent { label 'windows-agent' }
                    steps {
                        echo "🖥️ Running on windows-agent node with build ID: ${env.BUILD_ID_FOR_CYPRESS}"
                        checkout scm
                        bat 'npm ci'
                        bat """
                            npx cypress run ^
                              --record ^
                              --parallel ^
                              --key %CYPRESS_RECORD_KEY% ^
                              --ci-build-id "%BUILD_ID_FOR_CYPRESS%"
                        """
                    }
                }

                stage('Tester B - Node 2') {
                    agent { label 'win-agent' }
                    steps {
                        echo "🖥️ Running on win-agent node with build ID: ${env.BUILD_ID_FOR_CYPRESS}"
                        checkout scm
                        bat 'npm ci'
                        bat """
                            npx cypress run ^
                              --record ^
                              --parallel ^
                              --key %CYPRESS_RECORD_KEY% ^
                              --ci-build-id "%BUILD_ID_FOR_CYPRESS%"
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo '📦 Build complete. You can view results on the Cypress Dashboard.'
        }
    }
}
