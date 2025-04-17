
##  Gestión del repositorio con Git

```bash
git init
git add .
git commit -m "Gestión del Repositorio Git"
git branch -M main
git remote add origin https://github.com/CristianDago/desafio-m8.git
git push -u origin main
```





##  Instalación y configuración

### Inicializar el proyecto

```bash
npm install
```
```bash
npm start
```

##  Ejecución con Docker

### 1. Construir la imagen

```bash
docker build -t task-api .
```

### 2. Ejecutar el contenedor

```bash
docker run -p 3000:3000 task-api
```

### 3. Pruebas usando Postman

```bash
http://localhost:3000/task
```

```bash
http://localhost:3000/tasks/1
```

```bash
http://localhost:3000/tasks/2
```



## Configurar Jenkins

### 1. Clonar repositorio desde Github

```bash
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Agrega más etapas aquí después
    }
}
```

##  2. Instalar dependencias

```bash
pipeline {
    agent any

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
    }
}

```


##  3. Pruebas automatizadas

#### 1. Ejecutar comando:

```bash
npm install --save-dev jest supertest
```

#### 2. Cambio script "test" para usar Jest:
```bash
"scripts": {
  "start": "node app.js",
  "test": "jest"
}
```
#### 3. Creo archivo test para pruebas
```bash
const request = require('supertest');
const express = require('express');
const app = require('./app');

// Prueba para GET /tasks
describe('GET /tasks', () => {
  it('should return all tasks', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// Prueba para GET /tasks/:id
describe('GET /tasks/:id', () => {
  it('should return a single task if ID exists', async () => {
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should return 404 if task is not found', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toBe(404);
  });
});

```
#### 4. Test
```bash
pipeline {
    agent any

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
    }
}
```

 ## 4. Imagen Docker 

```bash
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
```

 ## Documentos 

 En la carpeta documents se encuentra una imagen con cada una de las verificaciones de jenkins