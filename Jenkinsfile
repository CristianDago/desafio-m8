pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'task-api'  
        DOCKER_TAG = 'latest'           
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
                    bat "docker build -t ${env.DOCKER_REGISTRY}/${env.DOCKER_IMAGE}:${env.DOCKER_TAG} ."
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
