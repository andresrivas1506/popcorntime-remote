<!DOCTYPE html>
  <html lang="en" manifest="remote.appcache">
    <head>
      <meta charset="utf-8">
      <title>Popcorn Time Remote</title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
      <link rel="icon" href="assets/img/icons/icon152.png">
      <link rel="shortcut" href="assets/img/icons/icon152.png">
        
      <!--// Webapp (Apple) tags //-->
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black">
      <meta name="apple-mobile-web-app-title" content="Remote">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon152.png" sizes="152x152">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon144.png" sizes="144x144">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon120.png" sizes="120x120">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon114.png" sizes="114x114">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon76.png" sizes="76x76">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon72.png" sizes="72x72">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon57.png" sizes="57x57">
      <link rel="apple-touch-icon-precomposed" href="assets/img/icons/icon120.png">
      
      <!--// Webapp (Android) tags //-->
      <meta name="mobile-web-app-capable" content="yes">
      <link rel="icon" href="assets/img/icons/icon192.png" sizes="192x192">
      <!--//<link rel="icon" href="assets/img/icons/icon128.png" sizes="128x128">//-->
      
      <!--// Windows 8.1 Tile tags //-->
      <meta name="application-name" content="Popcorn Time Remote">
      <meta name="msapplication-TileColor" content="#2d72d9">
      <meta name="msapplication-square70x70logo" content="assets/img/icons/tiny.png">
      <meta name="msapplication-square150x150logo" content="assets/img/icons/square.png">
      <meta name="msapplication-wide310x150logo" content="assets/img/icons/wide.png">
      <meta name="msapplication-square310x310logo" content="assets/img/icons/large.png">
      
      <!--// SEO tags //-->
      <meta name="author" content="Andrés Rivas">
      <meta name="description" content="Popcorn Time Remote, the best way to control your Popcorn Time app.">
      <meta name="keywords" content="popcorn time remote, control, popcorn time, simple">
      <meta name="language" content="english">
      
      <!--// Open Graph tags //-->
      <!--//<link rel="author" href="https://plus.google.com/popcorntimeremote-google-plus-id">//-->
      <meta property="og:title" content="Popcorn Time Remote">
      <meta property="og:image" content="assets/img/icons/icon.png">
      <meta property="og:url" content="http://popcorntime-remote.andresrivas.com.ve/">
      <meta property="og:description" content="With Popcorn Time Remote, you can control your Popcorn Time application on your mobile phone without leaving your lazy chair.">
      
      <!--// Twitter Card tags //-->
      <meta name="twitter:card" content="summary">
      <meta name="twitter:url" content="http://popcorntime-remote.andresrivas.com.ve/">
      <meta name="twitter:description" content="With Popcorn Time Remote, you can control your Popcorn Time application on your mobile phone without leaving your lazy chair.">
      <meta name="twitter:image" content="assets/img/icons/icon.png">
      
      <link href="assets/css/bootstrap.min.css" rel="stylesheet">
      <link href="assets/css/font-awesome.min.css" rel="stylesheet">
      <link href="assets/css/styles.css" rel="stylesheet">
      <!--[if lt IE 9]>
        <script src="assets/js/html5shiv.min.js"></script>
        <script src="assets/js/respond.min.js"></script>
      <![endif]-->
    </head>
    <body class="col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4">
      <!--// SECTION:NOSCRIPT //-->
      <noscript>
        <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
          <h2>Enable Javascript</h2>
          <p>
            Whoops! Popcorn Time Remote requires Javascript to be enabled in your browser.
            Please enable Javascript and then come back here.
          </p>
        </div>
      </noscript>
      
      <!--// SECTION:MENU //-->
      <div class="menu" style="display: none;">
        <div class="nav-title">Popcorn Time Remote</div>
        <ul class="nav nav-hor pull-left">
          <li class="btn-movies">Movies</li>
          <li class="btn-shows">TV Series</li>
          <li class="btn-anime">Anime</li>
        </ul>
        <ul class="nav nav-hor nav-icons pull-right">
          <li class="btn-inbox"><i class="btn-inbox-icon fa fa-inbox"></i></li> 
          <li class="btn-favourites"><i class="btn-favourites-icon fa fa-heart"></i></li> 
          <li class="btn-settings"><i class="btn-settings-icon fa fa-cog"></i></li>
        </ul>
      </div>
      <div id="contents">
        
        <!--// SECTION:DEFAULT //-->
        <div id="default" class="hidden">
          <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2">
              <h2>Loading App...</h2>
            </div>
          </div>
        </div>
        
        <!--// SECTION:MAIN-BROWSER //-->
        <div id="main-browser" class="sections hidden">
          <!--// Search & Filter options //-->
          <div class="subsection-search-filter hidden">
            <div class="form-inline">
              Genre <select id="select-filter-genre" class="form-control"></select> 
              Sort by <select id="select-filter-sort" class="form-control"></select> 
              <br/>
              <input id="input-search" class="form-control" type="text" name="search" value="" placeholder="Search">
              <div class="btn-enter-search pull-right hidden"><i class="fa fa-search"></i></div>
              <div class="btn-clear-search pull-right hidden"><i class="fa fa-close"></i></div>
            </div>
          </div>
          <!--// Arrows //-->
          <div class="subsection-arrows">
            <center>
              <div class="btn-remote-circle">
                <div class="btn-enter"></div>
                <div class="btn-arrow-up">
                  <i class="fa fa-chevron-up"></i>
                </div>
                <div class="btn-arrow-left pull-left">
                  <i class="fa fa-chevron-left"></i>
                </div>
                <div class="btn-arrow-right pull-right">
                  <i class="fa fa-chevron-right"></i>
                </div>
                <div class="btn-arrow-down">
                  <i class="fa fa-chevron-down"></i>
                </div>
              </div>
            </center>
          </div>
          <!--// Favourites & seen toggle //-->
          <div class="subsection-favs-seen">
            <div class="row">
              <div class="col-xs-6">
                <div class="btn-seen"><i class="fa fa-eye"></i></div>
              </div>
              <div class="col-xs-6">
                <div class="btn-favourite"><i class="fa fa-heart"></i></div>
              </div>
            </div>
          </div>
        </div>
        
        <!--// SECTION:SHOWS-CONTAINER //-->
        <div id="shows-container" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <!--// Arrows //-->
          <div class="subsection-arrows">
            <center>
              <div class="btn-remote-circle btn-remote-circle-shows">
                <div class="btn-enter btn-enter-shows"></div>
                <div class="btn-arrow-up">
                  <i class="fa fa-chevron-up"></i>
                </div>
                <div class="btn-arrow-left-season btn-season-prev pull-left">
                  <i class="fa fa-chevron-left"></i>
                </div>
                <div class="btn-arrow-right-season btn-season-next pull-right">
                  <i class="fa fa-chevron-right"></i>
                </div>
                <div class="btn-arrow-down">
                  <i class="fa fa-chevron-down"></i>
                </div>
              </div>
            </center>
          </div>
          <center>
            <select id="select-player-shows-container-contain" class="form-control"><option>Select player</option></select>
          </center>
          <!--// Seen & Quality toggle //-->
          <div class="subsection-favs-seen show-toggles">
            <div class="row">
              <div class="col-xs-6">
                <div class="btn-seen btn-seen-episode"><i class="fa fa-eye"></i></div>
              </div>
              <div class="col-xs-6">
                <div class="btn-quality btn-quality-big btn-quality-episode"><i class="fa fa-toggle-on"></i></div>
              </div>
            </div>
          </div>
          <div class="row show-info">
            <div class="col-xs-6">
              <img class="show-info-poster" src="">
            </div>
            <div class="col-xs-6 show-info-main">
              <span class="show-info-title">Title</span><br/>
              <span class="show-info-year">Year - Status</span><br/>
              <span class="show-info-seasons">Seasons</span><br/>
              <span class="show-info-rating">Rating</span>
            </div>
            <div class="col-xs-12 show-info-metadata">
              <span class="show-info-genre"></span> &#149; 
              <span class="show-info-runtime"></span> &#149; 
              <span class="show-info-imdb"></span>
              <div class="show-info-synopsis"></div>
            </div>
          </div>
        </div>
        
        <!--// SECTION:MOVIE-DETAIL //-->
        <div id="movie-detail" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <!--// Play button over poster image //-->
          <center>
            <div class="movie-detail-poster">
              <img src="">
              <div class="movie-detail-play-button btn-play"><i class="fa fa-play movie-detail-play-inner"></i></div>
            </div>
          </center>
          <div class="movie-detail-container">
            <!--// Movie info //-->
            <div class="movie-detail-sub">
              <div class="movie-detail-title"></div>
              <span class="movie-detail-year pull-left"></span>
              <span class="movie-detail-rating pull-right"></span>
            </div>
            <div class="movie-detail-extra-info">
              <span class="movie-detail-metadata movie-detail-genre">Genre</span> &#149; 
              <span class="movie-detail-metadata movie-detail-runtime">0 min</span> &#149; 
              <span class="movie-detail-metadata movie-detail-imdblink"></span>
            </div>
            <!--// Synopsis div //-->
            <div class="movie-detail-synopsis"></div>
            <!--// Toggle quality button //-->
            <div class="btn-quality"><i class="fa fa-toggle-on"></i> Toggle Quality</div>
            <!--// Watch trailer button //-->
            <div class="btn-trailer"><i class="fa fa-film"></i> Watch Trailer</div>
            <center>
              <select id="select-subtitles-movie-detail" class="form-control"><option>Select subtitles</option></select>
              <select id="select-player-movie-detail" class="form-control"><option>Select player</option></select>
            </center>
            <!--// Favourites & seen toggle //-->
            <div class="subsection-favs-seen">
              <div class="row">
                <div class="col-xs-6">
                  <div class="btn-seen"><i class="fa fa-eye"></i></div>
                </div>
                <div class="col-xs-6">
                  <div class="btn-favourite"><i class="fa fa-heart"></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!--// SECTION:DOWNLOADING //-->
        <div id="downloading" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <!--// Downloading text //-->
          <div class="downloading-text">
            <h2>Please wait...</h2>
            <p>
              Your Popcorn Time client is downloading the selected item.
            </p>
          </div>
        </div>
        
        <!--// SECTION:LOADING //-->
        <div id="loading" class="sections hidden">
          <div class="loading-text">
            <h3>Popcorn Time client is loading...</h3>
          </div>
        </div>
        
        <!--// SECTION:STREAMER //-->
        <div id="streamer" class="sections hidden">
          <div class="btn-close-streamer"><i class="fa fa-chevron-left"></i> Close Streamer</div>
          <video id="streamer-video" src="" autoplay="false" controls>
            <source id="streamer-source" src="" type="video/mp4">
          </video>
          <div class="streamer-link"></div>
        </div>
        
        <!--// SECTION:SETTINGS-CLIENT //-->
        <div id="settings-client" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <div class="settings-text">
            <p>
              We're sorry, but the settings of Popcorn Time cannot be changed by the remote.
              You'll have to get up and walk (all the way!) to your device, in order to change PT's settings.<br/>
              <i>We know, life sucks ;(</i>
            </p>
          </div>
        </div>
        
        <!--// SECTION:PLAYER //-->
        <div id="player" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <!--// Info //-->
          <div id="player-title"></div>
          <div id="player-info"></div>
          <img id="player-image" src="">
          <!--// Player arrows //-->
          <div class="subsection-arrows-player">
            <center>
              <div class="btn-remote-circle">
                <div class=""><i class="btn-pause fa fa-pause"></i></div>
                <div class="btn-arrow-up-player">
                  <i class="fa fa-volume-up"></i>
                </div>
                <div class="btn-arrow-left-player pull-left">
                  <i class="fa fa-backward"></i>
                </div>
                <div class="btn-arrow-right-player pull-right">
                  <i class="fa fa-forward"></i>
                </div>
                <div class="btn-arrow-down-player">
                  <i class="fa fa-volume-down"></i>
                </div>
              </div>
            </center>
          </div>
          <div class="btn-mute"><i class="fa fa-volume-off"></i> Toggle Mute</div>
          <div class="btn-fullscreen"><i class="btn-fullscreen-child fa fa-expand"></i> Toggle Fullscreen</div>
          <div class="btn-stream"><i class="fa fa-download"></i> Stream here</div>
          <center>
            <select id="select-subtitles-player" class="form-control"><option>Select subtitles</option></select>
          </center>
          <!--// !TODO:
          # time bar indicator
          # subtitle shortcuts (delaysubs)
          //-->
        </div>
        
        <!--// SECTION:ABOUT //-->
        <div id="about" class="sections hidden">
          <!--// Back button //-->
          <div class="btn-back"><i class="fa fa-chevron-left"></i> Go back</div>
          <!--// About text //-->
          <div class="about-text">
            <h3>Popcorn Time Remote</h3>
            <p>
              Developed by Andrés Rivas.<br/>
              Licensed under the <a href="http://www.gnu.org/copyleft/gpl.html" target="_blank">GNU GPL V3</a> license. <br/>
              Copyright &copy; <?php echo date('Y'); ?> Popcorn Time Remote by Andrés Rivas.
            </p>
            <p>
              Contributors: Andrés Rivas.
            </p>
            <p>
              Visit my website at <a href="http://www.andresrivas.com.ve/?ref=app" target="_blank">AndresRivas.com.ve</a>.
              <!-- Browse through our code at <a href="https://www.github.com/ptrteam/remote" target="_blank">GitHub.com</a>. -->
            </p>
            <p>
              Popcorn Time Remote (PTR) is not affiliated with <a href="">Popcorn Time</a> itself. Please report problems with Popcorn Time to <a href="https://git.popcorntime.io/jira" target="_blank">their issue tracker</a>.
            </p>
            <p>
              We've done everything we can to make your experience with PTR as pleasant as possible. If you've got a problem, suggestion or idea please let us know.
            </p>
          </div>
        </div>
        
        <!--// SECTION:SETTINGS //-->
        <div id="settings" class="sections hidden">
          <div class="btn-close-settings pull-right"><i class="fa fa-close"></i></div>
          <div class="welcome welcome-text" style="display: none;">
            <div class="row">
              <div class="col-xs-12">
                <h2>Welcome to Popcorn Time Remote!</h2>
                <!--p>
                  Before you can control your Popcorn Time client, you'll have to set the connection settings.
                  Don't worry, you can always change these settings later in the settings menu. <a href="http://www.popcorntimeremote.com/help/#gettingstarted" target="_blank">Need help?</a>
                </p-->
                <hr>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12">
              <form id="form">
                <label for="ip">IP Address</label>
                <input id="ip" class="form-control" type="text" name="ip" value="" placeholder="localhost">
                <label for="port">Port</label>
                <input id="port" class="form-control" type="number" name="port" value="" placeholder="8008">
                <label for="username">Username</label>
                <input id="username" class="form-control" type="text" name="username" value="" placeholder="popcorn">
                <label for="password">Password</label>
                <input id="password" class="form-control" type="password" name="password" value="" placeholder="popcorn">
                <a class="btn-reload btn btn-default btn-naked pull-left" href="#" onclick="location.reload();">Reload App</a>
                <a class="btn-save btn btn-primary pull-right" href="#">Save</a>
                <div class="welcome welcome-button" style="display: none;">
                  <a class="btn-welcome btn btn-primary pull-right" href="#">Proceed</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/js/bootstrap.min.js"></script>
      <script src="assets/js/remote.js"></script>
      <?php include_once("analyticstracking.php") ?>
    </body>
  </html>