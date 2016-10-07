
var app = angular.module('ABMangularPHP', ['ui.router','satellizer']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $authProvider.loginUrl = 'abm/jwt/php/auth.php';
  $authProvider.tokenName = 'MiTokendePHP';
  $authProvider.tokenPrefix = 'Aplicacion';
  $authProvider.authHeader = 'data';  

  $stateProvider

      .state('inicio', {
                url : '/inicio',
                templateUrl : 'vistas/inicio.html',
                controller : 'controlInicio'
            })
      .state('persona', {
                url : '/persona',
                abstract:true,
                templateUrl : 'vistas/abstractaPersona.html',
                controller : 'controlPersona'
            })
  
      .state('persona.menu', {
                url: '/menu',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaMenu.html',
                        controller : 'controlPersonaMenu'
                    }
                }
            })
      .state('persona.login', {
                url: '/login',
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaLogin.html',
                        controller : 'controlPersonaLogin'
                    }
                }
            })
      .state('persona.grilla', {
                url: '/grilla',
                cache: false,
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaGrilla.html',
                        controller : 'controlPersonaGrilla'
                    }
                }
            })
      .state('persona.alta', {
                url: '/alta',
                cache: false,
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaAlta.html',
                        controller : 'controlPersonaAlta'
                    }
                }
            })
      .state('persona.modificar', {
                url: '/modificar',
                cache: false,
                params: {modificar: null},
                views: {
                    'contenido': {
                        templateUrl: 'vistas/personaModificar.html',
                        controller : 'controlPersonaModificar'
                    }
                }
            })


   
   $urlRouterProvider.otherwise('/inicio');
});

app.controller('controlPersonaMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});

app.controller('controlMenu', function($scope, $http) {
  $scope.DatoTest="**Menu**";
});

app.controller('controlPersona', function($scope, $http) {

});


app.controller('controlInicio', function($scope, $http, $state, $auth) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB"

  $scope.logeado = $auth.isAuthenticated(); //es la unica manera de saber si el token es correcto

  /*if(!$scope.logeado)
  {
    $state.go('persona.alta');
  }
  else
  {
    alert("esta logeado");
  }*/
  
});


app.controller('controlPersonaGrilla', function($scope, $http, $state) {
  $scope.DatoTest="**Grilla**";
  $scope.titulo="Grilla Persona";
  $scope.ListadoPersonas = {};

  $http.get('http://localhost:8080/ws1/personas')
    .then(function(respuesta) {       

        console.log(respuesta.data);
        $scope.ListadoPersonas = respuesta.data;

    },function (error) {
        console.log( error);
        
   });


  $scope.Borrar = function(persona){

    $http.delete('http://localhost:8080/ws1/persona/'+persona.id)
    .then(function(respuesta) {       

        console.log(respuesta.data);
        $scope.ListadoPersonas = respuesta.data;

    },function (error) {
        console.log( error);
        
    });

    $state.go('persona.grilla');

  }


  $scope.Modificar = function(persona){

    $state.go('persona.modificar', {modificar:persona});

  }
});



app.controller('controlPersonaLogin', function($scope, $http, $auth, $state) {

  $scope.usuario = {};
  $scope.usuario.clave = "la clave";
  $scope.usuario.correo = "el correo";


  $scope.IniciarSesion = function(){

    $auth.login($scope.usuario)
        .then(function(response) {
          console.info("correcto",response);

       })
        .catch(function(response) {
          console.info("NO",response);
        });

  if($auth.isAuthenticated())
  {
    console.info("token true",$auth.getPayload());
  }
  else
  {
    console.info("token false",$auth.getPayload());
  }

  }
});






app.controller('controlAlta', function($scope, $http) {
  $scope.DatoTest="**Menu**";
  $scope.titulo="Inicio y presentacion de la WEB"
});

app.controller('controlPersonaAlta', function($scope, $http) {


//inicio las variables
  $scope.persona={};
  $scope.persona.nombre= "natalia" ;
  $scope.persona.dni= 444412312 ;
  $scope.persona.apellido= "natalia" ;
  $scope.persona.foto="sinfoto";


  $scope.Guardar=function(){

    $http.post('http://localhost:8080/ws1/persona/'+ JSON.stringify($scope.persona))
       .then(function(respuesta) {       

           console.info(respuesta);

       },function (error) {
           console.log( error);
           
      });

  }


});


app.controller('controlPersonaModificar', function($scope, $http, $stateParams, $state) {


//inicio las variables
  $scope.persona = $stateParams.modificar;


  $scope.Guardar=function(persona){

    $http.put('http://localhost:8080/ws1/persona/'+ JSON.stringify($scope.persona))
       .then(function(respuesta) {       

           console.info(respuesta);
           console.log("modifique");
           $state.go('persona.grilla');

       },function (error) {
           console.log( error);
           
      });

  }


});



app.controller('controlGrilla', function($scope, $http) {
  	$scope.DatoTest="**grilla**";
 	

  $http.get(' http://www.mocky.io/v2/57c82b3a1200008404e769ad')
  .then(function(respuesta) {       

         $scope.ListadoPersonas = respuesta.data;
         console.log(respuesta.data);

    },function (error) {
         $scope.ListadoPersonas= [];
        console.log( error);
        
   });
 /*	$http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	

      	 $scope.ListadoPersonas = respuesta.data.listado;
      	 console.log(respuesta.data);

    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
     		
 	 });*/




  /*

          https://docs.angularjs.org/api/ng/service/$http

          the response object has these properties:

        data – {string|Object} – The response body transformed with the transform functions.
        status – {number} – HTTP status code of the response.
        headers – {function([headerName])} – Header getter function.
        config – {Object} – The configuration object that was used to generate the request.
        statusText – {string} – HTTP status text of the response.
            A response status code between 200 and 299 is considered a success
             status and will result in the success callback being called. 
             Note that if the response is a redirect, XMLHttpRequest will 
             transparently follow it, meaning that 
             the error callback will not be called for such responses.
   */
 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);



 	}




 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);
 	}





});
