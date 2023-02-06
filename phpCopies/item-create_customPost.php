<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
//common environment attributes including search paths. not specific to Learnosity

//site scaffolding

//common Learnosity config elements including API version control vars
include_once '../lrn_config.php';

//alias(es) to eliminate the need for fully qualified classname(s) from sdk
use LearnositySdk\Request\Init;
use LearnositySdk\Utils\Uuid;

//security object. timestamp added by SDK
$security = [
    'consumer_key' => $consumer_key,
    'domain' => $domain
];



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // if (isset($_GET['mode']) && $_GET['mode'] === 'item_list') {
    //     echo json_encode(['success' => 'item-edit']);

    //     echo json_encode(['success' => true]);
    // }
    // elseif (isset($_GET['mode']) && $_GET['mode'] === 'item_edit') {
        $mode = htmlspecialchars($_GET['mode']);

            $request = [
                // Modes 'activity_edit' is used to create a new activity
                'mode' => $mode,
                'reference' => Uuid::generate(),
                'config' => [
                    'item_edit' => [
                        'item' => [
                            'reference' => [
                                'edit' => true
                            ],
                            'dynamic_content' => true,
                            'shared_passage' => true,
                            'actions' => [
                                'show' => true
                            ],
                            'details' => [
                                'description' => [
                                    'show' => true,
                                    'edit' => true
                                ],
                                'source' => [
                                    'show' => true,
                                    'edit' => true
                                ],
                                'note' => [
                                    'show' => true,
                                    'edit' => true
                                ]
                            ],
                            'enable_audio_recording' => true
                        ]
                    ]
                ],
                'user' => [
                    'id' => 'demos-site',
                    'firstname' => 'Demos',
                    'lastname' => 'User',
                    'email' => 'demos@learnosity.com'
                ]
            ];
            
        // } else {
        //     echo json_encode(['error' => 'Invalid mode']);
        // }
    }


    $Init = new Init('author', $security, $consumer_secret, $request);
    $signedRequest = $Init->generate();
    $learnosityTest = (object) [
        'request' => $signedRequest,
        'url_authorapi' => $url_authorapi,
      ];
    echo json_encode($learnosityTest);
?>
