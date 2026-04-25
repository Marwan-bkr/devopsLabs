# Project

# 

## Opportunities

1. The DevOps project is based on all of the labs passed during the course, it is allowed to use them.

2. Work on the project can be carried out by 3 students. (keep the same group as the one for the labs)

3. You are allowed to collaborate with other students.

## Instructions

##### AGILE Versions :

cf plan

1. cicd based on lab 3
   
   - implement git versioning
     
     ```bash
     git push --set-upstream origin project_dev_marwan
     git commit -m "project 0.1.2 fix ci workflow"
     ```
   
   - create env for web app, running it locally and manually
   
   - implement ci
     
     i add to specify the path to push the new workflow
     
     ```bash
     git add .github/workflows/projectci.yml
     ```
   
   - first pull request

2. CD render
   
   - write code for web app : core functions and unit tests
   
   - reconnect database by changing dbclient.js, render.yaml, webapp render env
   
   - enhance api redoc
   
   - second pull request
   
   available here : https://devopslabs.onrender.com

3. vagrant + ansible
   
   - setup 
     
     ```bash
     vagrant up --provider qemu
     ```

                with several tries to overcome installations, compatibility between vagrant and ansible, changing vagrantfile and playbook files. provision was difficult because of internet access, handling my arborescence

4. docker
   
   [8meta/devops_project_webapp - Docker Image](https://hub.docker.com/r/8meta/devops_project_webapp)
   
   and there is a public-docker-compose.yml to ...

NB : 

- every files are closely enterlace. iac for vagrant and ansible reach the webapp at the code/ level , the webapp/ can run even with docker files in.

- all the project is arm
5. K8s
   1- dev deployment.yaml and service.yaml
      
      kubectl apply -f deployment.yaml
      
      kubectl apply -f service.yaml
   
   2- I figuring out that only the web app was deployed without the redis database so let's refactor the docker file to be able to launch th whole app (webapp+redis) from k8s by helm
      
      
      
      
      
       

### 1. Create a web application

### 2. Apply CI/CD pipeline

### 3. Configure and provision a virtual environment and run your application using the IaC approach

### 4. Build Docker image of your application

### 6. Make deployment using Kubernetes

### 5. Document your project

## Bonuses

### bilan personnel
