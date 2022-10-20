pipeline {
    agent any

    environment {
        VERSION = sh (script: $/cat package.json | grep version | head -1 | sed 's/[^0-9\.]//g'/$, returnStdout: true).trim()
        REGISTRY_CREDENTIALS = 'dockerhub-magnatagbuilder'
        IMAGE_REPOSITORY = 'magnatag/password-generator'
    }

    stages {

        stage ('Install') {
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIALS) {
                        sh 'docker build --pull --target install .'
                    }
                }
            }
        }

        stage ('Build') {
            steps {
                sh 'docker build -t ${IMAGE_REPOSITORY}:${BRANCH_NAME} .'
            }
        }

        stage ('Push Latest') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIALS) {
                        sh 'docker tag ${IMAGE_REPOSITORY}:${BRANCH_NAME} ${IMAGE_REPOSITORY}'
                        sh 'docker push ${IMAGE_REPOSITORY}'
                    }
                }
            }
        }

        stage ('Push Version') {
            when {
                expression { BRANCH_NAME ==~ /^release-[0-9]+\.[0-9]+\.[0-9]+$/ }
            }
            steps {
                script {
                    docker.withRegistry('', REGISTRY_CREDENTIALS) {
                        sh 'docker tag ${IMAGE_REPOSITORY}:${BRANCH_NAME} ${IMAGE_REPOSITORY}:${VERSION}'
                        sh 'docker push ${IMAGE_REPOSITORY}:${VERSION}'
                    }
                }
            }
        }

    }

}