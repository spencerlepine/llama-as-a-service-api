### Publish to DockerHub
```
docker build -t laas-api .
docker tag laas-api spencerlepine/laas-api:1.0.0
docker push spencerlepine/laas-api:1.0.0
docker pull spencerlepine/laas-api
```

## Issue with Kubernetes and Local Docker Images
See [StackOverflow](https://stackoverflow.com/questions/42564058/how-to-use-local-docker-images-with-minikube) for more details


### Using local registry?
```sh
docker run -d -p 5000:5000 --restart=always --name local-registry registry:2
docker build -t myimage .
docker tag myimage localhost:5000/myimage
docker push localhost:5000/myimage
docker pull localhost:5000/myimage
```
