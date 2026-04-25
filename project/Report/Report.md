# Project

## Instructions

1. Create a web application

2. Apply CI/CD pipeline

3. Configure and provision a virtual environment and run your application using the IaC approach

4. Build Docker image of your application

5. Make deployment using Kubernetes

6. Document your project

## Structure

Here is the structure of our project repository:

```markdown
.github/
.gitignore
.git/
.gitattributes
README.md
project/
├── code
│   ├── docker-compose
│   │   └── public-docker-compose.yaml
│   ├── k8s
│   │   ├── only webapp
│   │   │   ├── deployment.yaml
│   │   │   └── service.yaml
│   │   └── webapp + redis
│   │       ├── Chart.yaml
│   │       ├── templates
│   │       │   ├── _helpers.tpl
│   │       │   ├── deployment-webapp.yaml
│   │       │   ├── service-redis.yaml
│   │       │   ├── service-webapp.yaml
│   │       │   └── statefulset.yaml
│   │       └── values.yaml
│   ├── vagrant
│   │   ├── ansible.cfg
│   │   ├── playbooks
│   │   │   ├── roles
│   │   │   └── run.yml
│   │   ├── Rocky-9-Vagrant-Libvirt.latest.aarch64.box
│   │   └── Vagrantfile
│   └── webapp
│       ├── CHANGELOG.md
│       ├── conf
│       │   └── default.json
│       ├── db
│       ├── Dockerfile
│       ├── node_modules/
│       ├── package-lock.json
│       ├── package.json
│       ├── project_ci_workflow.yml
│       ├── render.yaml
│       ├── src
│       │   ├── configure.js
│       │   ├── controllers
│       │   ├── dbClient.js
│       │   ├── index.js
│       │   └── routes
│       │       ├── configure.js
│       │       ├── controllers
│       │       │   └── user.js
│       │       ├── dbClient.js
│       │       ├── index.js
│       │       └── routes
│       │           └── user.js
│       └── test
│           ├── user.controller.js
│           └── user.router.js
├── README.md
└── Report
    ├── images/
    └── Report.md
...
lab-<previous_labs>/    // a list of previous labs
```

##### DevOps methodology :

Instructions already guide us to respect an AGILE development method by stacking functionalities on top of previous versions.

To be compliant with DevOps methodology, we use Git, with branches (main, dev, project_dev_marwan), by tagging commits with version nomenclature, pull requests and more.

### 1. Create a web application

| <img src="local-images/19861a2c50425f312c2aa23aba3b6bba09dd4a99.png" title="" alt="" width="143"> | <img src="local-images/31d211f07709fbbf9db7db97f7185f5fecc4f264.png" title="" alt="" width="114"> | <img src="local-images/608a05c5b989cc846372fda5c615e2000d497561.png" title="" alt="" width="125"> | <img src="local-images/9ded82b060ca42258ef516223352128882bde9c1.png" title="" alt="" width="127"> |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |



We set up prerequisites.



![](local-images/c3893cab7cadc9afefa9963c1c7aad794c836ef7.png)



![](local-images/e2b596501b82374eae4261cc54055014d88579b9.png)



After developing the web app and its API, it was tested.



![](local-images/672c0ffe5e0be13d290d64100d22c4ec1bd5aa4f.png)



Here is the functional test of the API.



![](local-images/bb7ada0b3bba9ccd1f7b4e1400123d246bf13b8a.png)



Then, we tested the front end of the API.



![](local-images/e54e569c790790cde69d8e49685c97a798528738.png)



Files available here : "code/k8s/webapp/"



### 2. Apply CI/CD pipeline

| <img src="local-images/eadb0e6d09422fd5d104a7d8b5b4b07bfc9db775.png" title="" alt="" width="127"> | <img src="local-images/1b4ccbef6096270f74021026414eb7a89d05ba26.jpg" title="" alt="" width="127"> |
| ------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------- |

Git and versioning were implemented notably with these commands.

```bash
git push --set-upstream origin project_dev_marwan
git commit -m "project 0.1.2 fix ci workflow"
```

Before implementing integration tests, they were created and ran locally and manually. Then, they were pushed to a remote server.



![](local-images/7532ee7d0a3caa66e04244dcc807faf9d419721f.png)



File available here : "code/k8s/webapp/project_ci_worflow.yaml"

After succeeding in all tests of this version (1.0.0), the main branch and project_dev_marwan branch were merged in the first pull request.



![](local-images/16666a248f1b3df20427e5e15a15ff3444f1e585.png)



The next step consists of deploying the web app on a remote server for online access and also implementing Continuous Deployment. The PaaS choice is Render.

Connection to the database was enhanced by changing dbclient.js. Thus, the entire web app was refactored and enhanced for a higher-standard software architecture, for readability and to be open for unit tests. 



![](local-images/b1ba2f88f183b16e7dcb54a1bd25cf1eecd91aeb.png)



Files available here : "code/k8s/webapp/test/"

For a functional deployed web app, render.yaml and Render's environment were developed. Redoc's API was enhanced.



![](local-images/7d78dbd4e34b26f276ef6a33560dbdb4e3528016.png)



The web app is available here : [https://devopslabs.onrender.com](https://devopslabs.onrender.com)

Now, all unit tests succeed and CD was successfully implemented, it was the time for a second pull request (v2.0.0).



### 3. Configure and provision a virtual environment and run your application using the IaC approach

| <img src="local-images/240fdb01de0c4447cab7440923139b1cdf3aa90f.svg" title="" alt="" width="110"> | <img src="local-images/a34cc60dcdf845d2f6070c56a2312908c90526a7.png" title="" alt="" width="109"> | <img src="local-images/1fd3f5b47f213b848ee576f482cd83674a8052c1.png" title="" alt="" width="109"> | <img src="local-images/2f5ea9341573ad203b1c3dbe6eb29be63e8f0b67.png" title="" alt="" width="108"> |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |

Thanks to the Docker lab, all research for functional prerequisites like ARM Rocky and others was already done.

A lot of time was given to overcome installations and compatibility between Vagrant and Ansible, tasks specifically time-consuming for ARM macOS. 

The Vagrantfile and playbook files were enhanced. Provisioning the VM needed advanced skills to understand and fix errors like port connections and specific arborescence.

Here is a working VM with a test.



![](local-images/3e0051963b904a5f151f4f94ba1b666048d50212.png)



Files available here : "code/vagrant/"

A Docker Compose with a webapp and Redis was also developed and tested.



![](local-images/f28dd0b1b82e986bee6c84e9f2fa73f1f1a390d4.png)



Files available here : "code/docker-compose/"



### 4. Build Docker image of your application

The Docker image of webapp is available here : [8meta/devops_project_webapp - Docker Image](https://hub.docker.com/r/8meta/devops_project_webapp)

Already 28 pulls in 6 days ! 



![](local-images/119ad922b3b268cf90bf8dbc1b630eaf58dcd20d.png)

Also, a web app connected to Redis is buildable with "code/docker-compose/public-docker-compose.yml"

NB :

- Every file in the project folder is closely intertwined.

- Vagrant and Ansible reach the webapp at the "/code/" folder level

- "webapp/" can run even with Docker files in

- The entire project is developed for ARM



### 6. Make deployment using Kubernetes

| <img src="local-images/c92389e8b36c35e74fecf9597df53c97566d365c.png" title="" alt="" width="115"> |
| ------------------------------------------------------------------------------------------------- |

deployment.yaml and service.yaml were developed and tested.



![](local-images/77553a4fcfd5d758ab57641c49894a1e6e023abb.png)



Files available here : "code/k8s/only webapp/"



## Bonuses

| <img src="local-images/2e4e185fe37f3ca6061e0ac0c273a261de51889f.svg" title="" alt="" width="122"> |
| ------------------------------------------------------------------------------------------------- |

I figured out that only the web app was deployed without the Redis database in Kubernetes.

So, the webapp+Redis Kubernetes files were refactored to propose launching the whole app (webapp+Redis) with k8s by Helm.



![](local-images/41407766a1c3a5e79d4d6fc69c25b6e683d2d23d.png)



Files available here : "code/k8s/webapp + redis/"



### Personal Note

It was a tremendous project. Every learned skill was applied. In this project, the focus was, consciously, put on mastering core DevOps skills more than developing an advanced web application. Thanks to DevOps, high-end production is now learnt.



Thanks for reading !



| Marwan BENLKHIR - ING4 Data&IA APP - Groupe 1     | <img title="" src="local-images/9151ed6533b6fa34a933630031a1cfe58f3619e0.png" alt="" width="146">                      |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Hubert CHAVASSE - ING4 Data&IA APP - Groupe 1** | <img title="" src="local-images/342e702094a862bfec78ca0392c177434ef3f561.jpeg" alt="" width="110" data-align="center"> |
