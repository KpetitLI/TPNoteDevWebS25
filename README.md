# TPNoteDevWebS25

Avec toutes les connaissances acquises, il vous est demandé de mettre en
place un composant web configurable permettant d’afficher la météo
globale d’une ville (de France).  

Le composant doit être un composant web utilisable avec la balise <mymeteo>
et doit comporter un attribut de balise ville avec la valeur de la ville
à configurer. Par défaut, si aucune ville n’est configuré on affichera la
météo de Paris. Tant que la météo n’est pas affiché on doit afficher un
message de chargement.  

L’information de météo sera récupérée sur cette URL : www.previsionmeteo.
ch/services/json/XXXX où XXX est à remplacer par le nom de la ville.
Le composant doit gérer le cas d’erreur si on entre un nom de ville inconnu
pour le service météo.  

Le composant devra afficher le nom de la ville ainsi que son pays, l’heure
locale, la vitesse du vent, le taux d’humidité et contiendra un logo
représentant la météo actuelle.  

L’appel au web service se fera avec un XmlHttpRequest.
