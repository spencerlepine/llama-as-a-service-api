Following this [article](https://learnk8s.io/deploying-nodejs-kubernetes). For next steps, visit the [scaling article](https://learnk8s.io/scaling-nodejs-kubernetes)

## Getting Started
Creating a Kubernetes cluster on your local machine with a tool like [Minikube](https://kubernetes.io/docs/setup/learning-environment/minikube/), [MicroK8s](https://microk8s.io/), or [k3s](https://k3s.io/)

### Install Kubectl
- Installing [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) guide

```sh
$ brew install kubectl
$ kubectl version --client
```

### Install Minikube
- Installing [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) guide

```sh
$ brew install minikube
$ minikube start
$ kubectl cluster-info
```

## Defining a Deployment
First of all, create a folder named kube in your application directory:

The purpose of this folder is to hold all the Kubernetes resource definition YAML files you will create.

```sh
$ mkdir kube
```

- Create `knote.yml` in `kube` folder
```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: knote
spec:
  replicas: 1
  selector:
    matchLabels:
      app: knote
  template:
    metadata:
      labels:
        app: knote
    spec:
      containers:
        - name: app
          image: learnk8s/knote-js:1.0.0
          ports:
            - containerPort: 3000
          env:
            - name: MONGO_URL
              value: mongodb://mongo:27017/dev
          imagePullPolicy: Always
```

## Defining A Service
A Service resource makes Pods accessible to other Pods or users outside the cluster.

Without a Service, a Pod cannot be accessed at all.

A Service forwards requests to a set of Pods.

In this regard, a Service is akin to a load balancer.

Now, let's add a Service resource definition to make your Knote Pod accessible from outside the cluster.

We will add this resource definition to the existing YAML file:

```diff
+apiVersion: v1
+kind: Service
+metadata:
+  name: knote
+spec:
+  selector:
+    app: knote
+  ports:
+    - port: 80
+      targetPort: 3000
+  type: LoadBalancer
+---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: knote
spec:
  replicas: 1
  selector:
    matchLabels:
      app: knote
  template:
    metadata:
      labels:
        app: knote
```

## Defining the database tier
Create `mongo.yml` in the `kube` folder
```yml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: mongo
spec:
  selector:
    app: mongo
  ports:
    - port: 27017
      targetPort: 27017
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
        - name: mongo
          image: mongo:3.6.17-xenial
          ports:
            - containerPort: 27017
          volumeMounts:
            - name: storage
              mountPath: /data/db
      volumes:
        - name: storage
          persistentVolumeClaim:
            claimName: mongo-pvc
```

## Deploying the Application

Make sure that your Minikube cluster is running:
```sh
$ minikube status
```

Then submit your resource definitions to Kubernetes with the following command:
```sh
$ kubectl apply -f kube
```

You can watch your Pods coming alive with:
```sh
$ kubectl get pods --watch
```

In Minikube, a Service can be accessed with the following command:
```sh
$ minikube service knote --url
# You can open the URL in a web browser.
```

## Close the App

When you're done testing the app, you can remove it from the cluster with the following command:
```sh
$ kubectl delete -f kube
# The command deletes all the resources created by kubectl apply.
```

