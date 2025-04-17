pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'task-api'
        DOCKER_TAG = 'task-api'
        DOCKER_REGISTRY = 'docker.io'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                bat 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    // Construir la imagen Docker
                    bat 'docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} .'
                }
            }
        }
    }

    post {
        always {
          
            echo 'Cleaning up...'
        }
    }
}
