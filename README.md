# Enviroment
# Set up 
cd root folder<br/>
# Start project
* To start our app, write the following command in your terminal<br/>
docker-compose up<br/>
docker ps<br/>
docker exec -it mycontainer sh ##for alpine<br/>
# Do a Clean Restart of a Docker Instance
  * Stop the container(s) using the following command:<br/>
    docker-compose down<br/>
    
  * To delete all the images:<br/>
    docker rmi -f $(docker images -aq)<br/>

  * Delete all containers using the following command:<br/>
    docker rm -f $(docker ps -a -q)<br/>

  * Delete all volumes using the following command:<br/>
    docker volume rm $(docker volume ls -q)<br/>

  * Use this to delete everything:<br/>
    docker system prune -a --volumes

  * Restart the containers using the following command:<br/>
    docker-compose up<br/>
#  How do I discard unstaged changes in Git?<br/>
git stash save --keep-index --include-untracked<br/>

----------------------------------------------------------------

# Library UI, Icon

# Prime React
https://primefaces.org/primereact/

# TailwindCSS (same as bootstrap)
https://tailwindcss.com/

# Icon
https://react-icons.github.io/react-icons/

----------------------------------------------------------------
# Animation lib

# Framer motion
https://www.framer.com/docs/

----------------------------------------------------------------
# Redux

https://redux-toolkit.js.org/

# Next auth
https://next-auth.js.org/