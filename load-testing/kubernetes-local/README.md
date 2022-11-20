# LaaS Kubernetes Cluster

Get the NodeJS/Express API running on localhost, connected to MongoDB internally.

## Setup

### Start Minikube
```bash
$ minikube start
$ minikube status
```

### Build the Service Docker Image
Use the docker images locally, or pull from DockerHub
```sh
# In the API project folder
eval $(minikube docker-env)
docker build -t laas-api .
```

### Start Kubernetes
```sh
# In Kubernetes folder
$ kubectl apply -f kube
$ kubectl get pods --watch
$ minikube service laas-frontend-load-balancer --url
# access app on localhost
```

## Delete Minikube Node
```sh
kubectl delete -f kube --all
minikube stop
eval $(minikube docker-env -u)
minikube delete
```

## Scale up Cluster
```bash
$ kubectl scale --replicas=2 deployment/laas
$ kubectl get pods -l app=laas --watch
$ minikube service laas --url
```
