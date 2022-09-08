
![logo](logo.png)

## AWS SQS  
### Micro services to work with AWS SQS Service  


![](https://img.shields.io/badge/version-1.0-blue)
![](https://img.shields.io/badge/python-3.9-blue)

## Content  
[Important info](#important_info)  
[Install](#install)  
[Configuration](#configuration)  
[Client](#client)  
[SQS Service](#usage)  


<a name="important_info"/>

## Important info  
</a>  

> AWS SQS work as fully separates API in Async mode  
> Stack: FastAPI + React + Nginx + SQS Service  
> Each Service run in docker containers   
> Easily expandability With Micro Service architecture  
> Database can be easily switch from Postgres to MongoDB or other  

<a name="install"/>  

## Install  
</a>  

- Install `docker` and `docker-compose`  
- Clone repo  
- Run `docker-compose up -d`   

<a name="configuration"/>  

## Configuration  
</a>  

> To solve problem with performance each Service run in container  
> Uvicorn work as ASGI server and connect to one piece with Nginx  
> Main configuration is `docker-compose.yml`  

- every service located in separate directory `name-service`  
- use `Dockerfile` to change docker installation settings  
- folder `app` contain FastAPI application  
- all services connected to one piece in `docker-compose.yml`  


<a name="client"/>  

## Client UI  
</a>  

- UI is available via URI `http://localhost:8080/tickets`   


## SQS Service  
</a>  

- Service is using the SQS queue to get/send data
- Delay for sleeping/receiving can be changed via sleep/delay parameters


