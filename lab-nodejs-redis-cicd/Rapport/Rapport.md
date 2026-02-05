| Marwan BENLKHIR - ING4 Data&IA APP - Groupe 1     | <img title="" src="file:///Users/marwan/Library/Application Support/marktext/images/96c5af7dd6678b756405f5142cb310d93922141c.png" alt="" width="146">                        |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hubert CHAVASSE - ING4 Data&IA APP - Groupe 1** | <img title="" src="file:///Users/marwan/Library/Application%20Support/marktext/images/d2826a477a6465e0166cddcd2485745ba2143a31.jpeg" alt="" width="110" data-align="center"> |

# DevOps with SRE

## Lab Node & Redis

**Github**

First, we had an issue with github branches on how to locate the origin of a new branch and how to handle branch management. 

We use commands like :

- git checkout

- git branch

- git push --set-upstream

- git branch -r

- git branch -a

The result is one branch main, a second branch dev and one personal branch each. One branch each because we use different OS (macOs, Windows) and to complete the lab different software and method were used.

**Installation**

Installations was completed without issue on macOs whilst WSL (WindowsSubsystemforLinux) was needed on the way to run all the lab in a linux environment.

**Usage**

After a few errors of ports and missing Redis services, the web page worked perfectly.

![](/Users/marwan/Library/Application%20Support/marktext/images/89db9eeb65be6bc590136212ab716b41257ab99c.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/c20a244de3338ffd795bf6c210691632075c3668.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/c2e2e42704b110a0805a1397a232b154cb6aff7b.png)

**Testing**

![](/Users/marwan/Library/Application%20Support/marktext/images/21b63049e41e04e1894e5bb894dd18acf3fd25dd.jpeg)

## Lab CI/CD

### Part 1. Continuous Integration with GitHub Actions

We don't have difficulty to implement Github Actions except with two configuration.

- The lab is in a subfolder of the repo

- The folder of the lab raise errors from sensitive software

So we can say that Github Actions is a little bit sensitive to special character, space, etc. We just need to specify working-directory.

![](/Users/marwan/Library/Application%20Support/marktext/images/4863a9e14f383def67641fdcfe1a868e60bc36a5.png)

### Part 2. Continuous Delivery (Deployment) with ~~Heroku~~ Render

The setup of render was pretty soft. The main difficulties encountered was with subfolder app, the complex name of the app folder and running npm on the way to build in render.

After many attempts, we finally decide to give up complex folder name. From "Lab NodeJS & Redis " to "lab-nodejs-redis-cicd".

Even with specification of subfolder name containing the app during Render setup, we had to manually change "Root Directory" value.

Then, the remote build of the app needed to correct "Build Command" from "npm" to "npm install".

![](/Users/marwan/Library/Application%20Support/marktext/images/8dfbba5b11a8c9a3ee7cc9c08451119fcabf9dee.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/f13142d7b6c66f46210464f5f513fb4e8fe53de4.png) 

Redis database was easier to setup than web service. Notably, we had to clear cache many times to ensure no such source of error.

![](/Users/marwan/Library/Application%20Support/marktext/images/3e054dcaf715d0b5fc186545faa5ca2212b73fa3.png)

Click here to access it : https://devopslabs.onrender.com/

### Bonus tasks

No difficulty to implement Swagger UI except finding to safer way to implement it because of deprecated documentation.

I have installed swagger ui in the wrong folder causing error.

Swagger is an ESM-only which is incompatible with build 18.x. So I switch to redoc-express

![](/Users/marwan/Library/Application%20Support/marktext/images/61fc6b83a49a341e79b8608f7bd06a710e8cbae0.png)

Click here to access it : https://devopslabs.onrender.com/reference

Because of time we don't take the time to properly manage the project using full capabilities of github like branch for example. It's a matter of habit.

## Questions

Objective of the lab  

- Possible application in the real world  
  - To build a Saas.
- Step in the DevOps cycle? Justify - ﻿﻿Problem encountered during the lab? How did you manage to solve the various problems? (Analysis of the problem starting from the error message, problem-solving process (Cite the links visited.)).
  - Taking time to conceive the solution is essential to not enter in an endless cycle of debugging. So we take time to review the code, optimise functions and correct errors before pushing and building. We used to use AI chatbots, but giving the full context is something difficult.
- ﻿﻿Purpose of the Lab (Is the lab's objective met?) If yes, why? If not, why? )
  - Yes, we understand how to automate integration and deployment on the way to becoming better developers. Tests are an essential competence to master.

Thanks !
