# Projet DevOps - ING4 Data&AI APP Grp01

| Marwan BENLKHIR - ING4 Data&IA APP - Groupe 1     | <img title="" src="file:///Users/marwan/Library/Application Support/marktext/images/9151ed6533b6fa34a933630031a1cfe58f3619e0.png" alt="" width="146">                      |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hubert CHAVASSE - ING4 Data&IA APP - Groupe 1** | <img title="" src="file:///Users/marwan/Library/Application Support/marktext/images/342e702094a862bfec78ca0392c177434ef3f561.jpeg" alt="" width="110" data-align="center"> |

## Structure

Here is the structure of the project repository:

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

You can read the project report here : "/Report/Report.md"
