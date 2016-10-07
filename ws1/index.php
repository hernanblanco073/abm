<?php

require_once "clases/AccesoDatos.php";
require_once "clases/Personas.php";
/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require 'vendor/autoload.php';

/**
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
/**
* GET: Para consultar y leer recursos
* POST: Para crear recursos
* PUT: Para editar recursos
* DELETE: Para eliminar recursos
*
*  GET: Para consultar y leer recursos */

$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});

$app->get('/personas[/]', function ($request, $response, $args) {
    
    $datos=Persona::TraerTodasLasPersonas();
    $response->write(json_encode($datos));

    return $response;
});

$app->get('/persona[/{persona}]', function ($request, $response, $args) {

    Persona::InsertarPersona(persona);
    //var_dump($args);
    $response->write("ALTA");
    
    return $response;
});


/* POST: Para crear recursos */
$app->post('/persona/{objeto}', function ($request, $response, $args) {

    $persona = json_decode($args["objeto"]);

    Persona::InsertarPersona($persona);

    $response->write("Di de alta");
    //var_dump($args);
    return $response;
});

// /* PUT: Para editar recursos */
$app->put('/persona/{objeto}', function ($request, $response, $args) {

    $persona = json_decode($args["objeto"]);

    Persona::ModificarPersona($persona);

    $response->write("Modifique");
    //var_dump($args);
    return $response;
});

// /* DELETE: Para eliminar recursos */
$app->delete('/persona/{id}', function ($request, $response, $args) {

    Persona::BorrarPersona($args["id"]);

    $datos=Persona::TraerTodasLasPersonas();
    $response->write(json_encode($datos));

    return $response;
});
/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
