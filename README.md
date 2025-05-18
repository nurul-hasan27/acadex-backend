#command to make the image
docker build . -t hasan27/acadex-backend:0.0.1.RELEASE

#command to run the docker image
docker run -d 3000:3000 hasan27/acadex-backend:0.0.1.RELEASE

#stop the container
docker stop <id>

#start the container
docker start <id>

#mount volume to the container (any local changes would be reflect locally)
docker run -d -p 3000:3000 -v $(pwd):/app --name acadex-backend hasan27/acadex-backend:0.0.1.RELEASE

#include the .env file in the docker
docker run -d -p 3000:3000 -v $(pwd):/app --env-file ./.env --name acadex-backend hasan27/acadex-backend:0.0.1.RELEASE

# git-acadex-backend
