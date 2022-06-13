# Docker container avec Symfony6, MySQL, phpMyAdmin, ApiPlatform, VueJS, VueX,...  
  
* docker-compose up
* A partir d'un bash dans le container php :
* * composer install
* * Géneration des clefs JWT : php bin/console lexik:jwt:generate-keypair
  
  puis  

* yarn install  
* yarn build
* yarn dev --watch
   
1. https://localhost/signUp pour se créer un user  
2. https://localhost/login pour se connecter à l'app  
3. http://localhost:8090 phpmyadmin (root:root)

* Doc supplémentaire :  
  * https://www.citizenz.info/article/symfony-mysql-et-phpmyadmin-avec-docker  
  * https://gitlab.com/yoandev.co/environnement-de-developpement-symfony-5-avec-docker-et-docker-compose/-/blob/master/docker-compose.yml  
  