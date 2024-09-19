## Note

#docker network create --driver bridge micro_network

#docker build -t authapi .

#docker run -p 5001:5001 --detach --name auth-service --net=micro_network authapi

#docker rm <container_id_or_name>
