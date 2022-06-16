# Docker container avec Symfony6, MySQL, phpMyAdmin, ApiPlatform, VueJS, VueX,...  
  
* docker-compose up
* Puis, à partir d'un bash dans le container php :
  * composer install
  * Géneration des clefs JWT : php bin/console lexik:jwt:generate-keypair
  
  puis  

* yarn install  
* yarn build
* yarn watch
   
Urls :  
* https://localhost/signUp pour se créer un user  
* https://localhost/login pour se connecter à l'app  
* http://localhost:8090 phpmyadmin (root:root)  

* tests : 
  * renseigner login/mdp d'un user dans cypress.json  
  * yarn cypress run  

* Credits :  
  * https://www.citizenz.info/article/symfony-mysql-et-phpmyadmin-avec-docker  
  * https://gitlab.com/yoandev.co/environnement-de-developpement-symfony-5-avec-docker-et-docker-compose/-/blob/master/docker-compose.yml  
  