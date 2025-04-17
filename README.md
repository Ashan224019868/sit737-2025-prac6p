
# Deploy Node.js Calculator Microservice on Kubernetes (Docker Desktop)

This guide shows how to deploy a Node.js calculator microservice to a Kubernetes cluster running on **Docker Desktop**.

---

## Prerequisites

- Docker Desktop installed with Kubernetes enabled
- Node.js microservice (calculator-microservice)
- `kubectl` CLI installed

---

## Step-by-Step Instructions

### 1. Enable Kubernetes in Docker Desktop

1. Open Docker Desktop
2. Go to **Settings > Kubernetes**
3. Enable **“Kubernetes”** and wait for it to say “Kubernetes is running”

---

### 2. Build Docker Image Locally

```bash
docker build -t calculator .
```

This creates a local image Kubernetes will use.

---

### 3. Create Kubernetes Deployment File

#### 📄 `deployment.yml`

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: calculator-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: calculator
  template:
    metadata:
      labels:
        app: calculator
    spec:
      containers:
      - name: calculator
        image: calculator
        imagePullPolicy: Never
        ports:
        - containerPort: 3000
```

> `imagePullPolicy: Never` ensures Kubernetes uses local Docker image.

Apply it:

```bash
kubectl apply -f deployment.yml
```

---

### 4. Create Kubernetes Service File

#### 📄 `service.yml`

```yaml
apiVersion: v1
kind: Service
metadata:
  name: calculator-service
spec:
  type: NodePort
  selector:
    app: calculator
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 31000
```

Apply it:

```bash
kubectl apply -f service.yaml
```

---

### 5. Test the Application

Open in browser or Postman:

```
http://localhost:31000/add?num1=5&num2=2
```

