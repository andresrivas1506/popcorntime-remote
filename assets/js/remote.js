/*! Make sure that we've got jQuery included. */
if (typeof jQuery === "undefined") {
	throw new Error("Popcorn Time Remote requires jQuery.");
}

/************!
 * FUNCTIONS
 ************/

/*!
 * Call the Popcorn Time API with given arguments.
 *
 * @returns {void}
 */
function popcorntimeAPI(method, parameters) {
	if (!window.connected) {
		console.warn("[WARNING] Function popcorntimeAPI was called, but can't proceed since window.connected is not set to true.");
		return false;
	}
	if (typeof parameters == "undefined") {
		parameters = [];
	}
	var request = {};
	request.id = 1234;
	request.jsonrpc = "2.0";
	request.remote = "PTR-" + window.version;
	request.callerLocation = window.location.href;
	request.method = method;
	request.params = parameters;
	$.ajax({
		type: 'POST',
		url: 'http://' + window.ip + ':' + window.port,
		data: JSON.stringify(request),
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', window.btoa(window.username + ":" + window.password));
		},
		success: function(data, textStatus) {
			responseHandler(request, data);
		},
	});
	return null;
}

/*!
 * Determine what to do with the response.
 *
 * @returns {boolean}
 */
function responseHandler(request, response) {
	if (request.method == "getviewstack") {
		$(".menu").show();
		viewStackHandler(response);
		return true;
	}
	else if (request.method == "getcurrenttab") {
		setTab(response.result.tab);
		window.oldtab = window.currenttab;
		window.currenttab = response.result.tab;
		return true;
	}
	else if (request.method == "getplaying") {
		if (response.result.playing == true || response.result.playing == false) {
			console.info("[INFO] Client is playing item with title '" + response.result.title + "'.");
			// Get the current volume in a global variable.
			popcorntimeAPI("volume"); // -> ?
		}
		else {
			console.info("[NOTICE] Method getplaying was called, but client isn't inside the player (anymore).");
			return false;
		}
		return true;
	}
	else if (request.method == "ping") {
		window.clientVersion = popcorntimeVersion(response, true);
		return true;
	}
	else if (request.method == "getselection") {
		setMediaInfo(response);
		return true;
	}
	else if (request.method == "getstreamurl") {
		window.streamURL = response.result.streamUrl;
		$("#streamer-video").attr("src", window.streamURL);
		$("#streamer-source").attr("src", window.streamURL);
		$(".streamer-link").html('<a href="' + window.streamURL + '">Open in new window</a>');
		showSection("streamer");
		return true;
	}
	else if (request.method == "toggleplaying") {
		toggleButton(".btn-pause");
		return true;
	}
	else if (request.method == "volume") {
		window.currentVolume = 1;
		window.currentVolume = response.result.volume;
		return true;
	}
	else if (request.method == "getsubtitles") {
		if (window.view != "player" && window.view != "movie-detail") {
			return false;
		}
		$("#select-subtitles-" + window.view).children().remove();
		$("#select-subtitles-" + window.view).append('<option value="">Select subtitles</option>');
		if (response && response.result && response.result.subtitles) {
			var subtitles = response.result.subtitles;
		}
		else {
			var subtitles = {};
		}
		$.each(subtitles, function(index, value) {
			$("#select-subtitles-" + window.view).append('<option value="' + value + '">' + window.langcodes[value] + '</option>');
		});
		return true;
	}
	else if (request.method == "getplayers") {
		if (window.view == "shows-container-contain" || window.view == "movie-detail") {
			var selectView = window.view;
		}
		else {
			return false;
		}
		$("#select-player-" + selectView).children().remove();
		$("#select-player-" + selectView).append('<option value="">Select player</option>');
		$.each(response.result.players, function(key, value) {
			$("#select-player-" + selectView).append('<option value="' + value.id + '">' + value.name + '</option>');
		});
		return true;
	}
	else if (request.method == "getgenres") {
		$("#select-filter-genre").children().remove();
		$.each(response.result.genres, function(key, value) {
			$("#select-filter-genre").append('<option value="' + value + '">' + value + '</option>');
		});
		return true;
	}
	else if (request.method == "getsorters") {
		$("#select-filter-sort").children().remove();
		$.each(response.result.sorters, function(key, value) {
			$("#select-filter-sort").append('<option value="' + value + '">' + value + '</option>');
		});
		return true;
	}
	else if (request.method == "clearsearch") {
		$("#input-search").val("");
		$(".btn-enter-search").addClass("hidden");
		$(".btn-clear-search").addClass("hidden");
		return true;
	}
	else if (request.method == "up" || request.method == "down" || request.method == "left" || request.method == "right" || request.method == "enter" || request.method == "movieslist" || request.method == "showslist" || request.method == "animelist" || request.method == "togglequality" || request.method == "togglewatched" || request.method == "togglefavourite" || request.method == "previousseason" || request.method == "nextseason" || request.method == "back" || request.method == "seek" || request.method == "setsubtitle" || request.method == "setplayer" || request.method == "showwatchlist" || request.method == "showfavourites" || request.method == "filtergenre" || request.method == "filtersorter" || request.method == "filtersearch") {
		// Methods that do not require a response handler.
		return null;
	}
	else {
		console.warn("[WARNING] No registered response handler for method '" + request.method + "'.");
		console.log(response);
		return false;
	}
}

/*!
 * Try to connect to the Popcorn Time client.
 *
 * @returns {boolean} True or False.
 */
function popcorntimeConnect(noOutput, firstTime) {
	var request = {};
	request.id = 10;
	request.jsonrpc = "2.0";
	request.remote = "PTR-" + window.version;
	request.callerLocation = window.location.href;
	request.method = 'ping';
	request.params = [];

	if (noOutput != true) {
		console.debug("[DEBUG] Connection details: " + window.username + "@" + ip + ":" + port + " with password '" + window.password + "'.");
	}
	$.ajax({
		type: 'POST',
		url: 'http://' + window.ip + ':' + window.port,
		data: JSON.stringify(request),
		beforeSend: function(xhr) {
			xhr.setRequestHeader('Authorization', window.btoa(window.username + ":" + window.password));
		},
		success: function(data, textStatus) {
			if (typeof data.error == "undefined") {
				if (noOutput != true) {
					console.info("[INFO] Connection established.");
				}
				window.connected = true;
			}
			else {
				// Encountered errors.
				if (noOutput != true) {
					console.error("[ERROR] Invalid login credentials.");
					alert("Invalid login credetials provided.");
					if (firstTime != true) {
						$(".menu").show();
						toggleButton(".btn-settings-icon");
						showSection("settings");
					}
				}
				window.connected = false;
			}
		},
		error: function() {
			if (noOutput != true) {
				console.error("[ERROR] Could not connect to given client.");
				alert("Could not connect to Popcorn Time. Please check your settings.");
				if (firstTime != true) {
					$(".menu").show();
					toggleButton(".btn-settings-icon");
					showSection("settings");
				}
			}
			window.connected = false;
		}
	});
	if (window.connected == true) {
		return true;
	}
	else {
		return false;
	}
}

/*!
 * Gets the version of PT client out of a HTTP response.
 *
 * @returns {string}
 */
function popcorntimeVersion(data, warn) {
	var version = data.result.popcornVersion;
	if (warn) {
		console.info("[INFO] Popcorn Time client version is '" + version + "'.");
	}
	if (typeof(version) == "undefined") {
		// The popcorntime client is lower than 0.3.4
		if (warn) {
			var message = "Your Popcorn Time Client (v" + version + ") is outdated. Please update your client. The remote might not work correctly if you do not update.";
			console.warn("[WARNING] " + message);
			alert(message);
		}
		return "pre-0.3.4";
	}
	else {
		// The popcorntime client is version 0.3.4 or higher.
		if ($.inArray(version, window.supportedPopcornTimeVersions) != "-1") { // version supported.
			if (warn) {
				console.info("[INFO] Client version is supported.");
			}
		}
		else if (version == "0.3.4") { // version is outdated.
			if (warn) {
				var message = "Your Popcorn Time Client (v" + version + ") is outdated. Please update your client. The remote might not work correctly if you do not update.";
				console.warn("[WARNING] " + message);
				alert(message);
			}
		}
		else {
			if (warn) {
				var message = "Your Popcorn Time Client (v" + version + ") is running an unknown version, the remote might not work correctly because of this.";
				console.warn("[WARNING] " + message);
				alert(message);
			}
		}
		return version;
	}
}

/*!
 * Viewstack handler.
 *
 * @returns {void}
 */
function viewStackHandler(data) {
	// Check if the client is an old version of popcorntime (pre 0.3.4).
	if (typeof(data.result.popcornVersion) == "undefined") {
		currentView = data.result[0][data.result[0].length - 1];
	}
	// The popcorntime client is version 0.3.4 or higher.
	else {
		currentView = data.result.viewstack[data.result.viewstack.length - 1];
	}
	// Check if the current view has been changed.
	if (window.view != currentView && $("#settings").is(":visible") == false) {
		console.debug("[DEBUG] View changed, new view: '" + currentView + "'.");
		if (window.view == "movie-detail") {
			// Remove backdrop from background.
			$("body").removeClass("backdrop");
			$("body").attr("style", "");
		}
		switch (currentView) {
			case 'shows-container-contain':
				showSection("shows-container");
				popcorntimeAPI("getselection");
				popcorntimeAPI("getplayers");
				break;
			case 'main-browser':
				showSection("main-browser");
				popcorntimeAPI("getgenres");
				popcorntimeAPI("getsorters");
				break;
			case 'movie-detail':
				showSection("movie-detail");
				popcorntimeAPI("getselection");
				popcorntimeAPI("getsubtitles");
				popcorntimeAPI("getplayers");
				break;
			case 'player':
				showSection("player");
				popcorntimeAPI("getplaying");
				popcorntimeAPI("getsubtitles");
				break;
			case 'settings-container-contain':
				showSection("settings-client");
				break;
			case 'about':
				showSection("about");
				break;
			case 'init-container':
				console.info("[INFO] Current view is Popcorn Time client loading screen.");
				showSection("loading");
				break;
			case 'app-overlay':
				showSection("downloading");
				break;
			case 'keyboard':
				console.info("[INFO] Current view is Popcorn Time's keyboard shortcut list.");
				break;
			default:
				console.error("[ERROR] View changed to unknown: '" + currentView + "'.");
		}
		view = currentView;
	}
	else if (currentView == "main-browser") {
		/*!TODO: find a better solution for this: this part gets called every second. We should change remote.js to use listennotifications() */
		if (window.currenttab == "movies" || window.currenttab == "shows" || window.currenttab == "anime") {
			$(".subsection-search-filter").removeClass("hidden");
			if (window.currenttab != window.oldtab) {
				popcorntimeAPI("getgenres");
				popcorntimeAPI("getsorters");
			}
		}
		else {
			$(".subsection-search-filter").addClass("hidden");
		}
	}
}

/*!
 * Load the settings into the settings form,
 * apply the set theme and load the settings into global variables.
 * This function should only be called once per session.
 *
 * @returns {void}
 */
function loadSettings() {
	// Check if the settings exist. If not, create them with default settings.
	if (!localStorageExists("ip")) {
		window.localStorage.setItem("ip", "localhost");
	}
	if (!localStorageExists("port")) {
		window.localStorage.setItem("port", "8008");
	}
	if (!localStorageExists("username")) {
		window.localStorage.setItem("username", "popcorn");
	}
	if (!localStorageExists("password")) {
		window.localStorage.setItem("password", "popcorn");
	}
	/*if(!localStorageExists("theme")) {
		window.localStorage.setItem("theme", "dark");
	}*/

	// Load the settings into the HTML form.
	$("#ip").val(window.localStorage.getItem("ip"));
	$("#port").val(window.localStorage.getItem("port"));
	$("#username").val(window.localStorage.getItem("username"));
	$("#password").val(window.localStorage.getItem("password"));
	//$("#" + window.localStorage.getItem("theme")).prop("checked", true);
	//switchTheme(window.localStorage.getItem("theme"));

	// Set the global setting variables.
	reloadSettings();
}

/*!
 * Get local storage of items and set their values to global variables.
 *
 * @returns {void}
 */
function reloadSettings() {
	// Get the localStorage items.
	window.ip = window.localStorage.getItem("ip");
	window.port = window.localStorage.getItem("port");
	window.username = window.localStorage.getItem("username");
	window.password = window.localStorage.getItem("password");
	console.info("[INFO] Settings were reloaded.");

	// Check the connection with the refreshed settings.
	popcorntimeConnect(true);
}

/*!
 * Register all the required listeners.
 *
 * @returns {void}
 */
function registerListeners() {
	// Remote buttons handlers.
	registerListener(".btn-enter", "click", "enter", true);
	registerListener(".btn-arrow-up", "click", "up");
	registerListener(".btn-arrow-left", "click", "left");
	registerListener(".btn-arrow-down", "click", "down");
	registerListener(".btn-arrow-right", "click", "right");
	registerListener(".btn-pause", "click", "toggleplaying", false);
	registerListener(".btn-quality", "click", "togglequality");
	registerListener(".btn-favourite", "click", "togglefavourite");
	registerListener(".btn-seen", "click", "togglewatched");
	registerListener(".btn-mute", "click", "togglemute", false, ".btn-mute");
	registerListener(".btn-fullscreen", "click", "togglefullscreen", false, ".btn-fullscreen");
	registerListener(".btn-movies", "click", "movieslist", true);
	registerListener(".btn-shows", "click", "showslist", true);
	registerListener(".btn-anime", "click", "animelist", true);
	registerListener(".btn-season-next", "click", "nextseason");
	registerListener(".btn-season-prev", "click", "previousseason");
	registerListener(".btn-trailer", "click", "watchtrailer");
	registerListener(".btn-stream", "click", "getstreamurl");
	registerListener(".btn-arrow-left-player", "click", "seek", null, null, null, [-10]);
	registerListener(".btn-arrow-right-player", "click", "seek", null, null, null, [10]);
	registerListener(".btn-inbox", "click", "showwatchlist");
	registerListener(".btn-favourites", "click", "showfavourites");
	registerListener(".btn-clear-search", "click", "clearsearch");
	// Setting handlers.
	$(".btn-settings").on('click', function() {
		showSection("settings");
		$("body").addClass("backdrop-hidden");
	});
	$(".btn-close-settings").on('click', function() {
		showSection(window.view);
		$("body").removeClass("backdrop-hidden");
	});
	// Back button handler.
	$(".btn-back").on('click', function() {
		$("body").removeClass("backdrop");
		$("body").attr("style", "");
		popcorntimeAPI("back");
		popcorntimeAPI("getviewstack");
	});
	// Start playing button handler.
	$(".btn-play").on('click', function() {
		$("body").removeClass("backdrop");
		$("body").attr("style", "");
		popcorntimeAPI("toggleplaying");
	});
	// Streamer button handler.
	$(".btn-close-streamer").on('click', function() {
		showSection(window.view);
		$("#streamer-video").get(0).pause();
	});
	// Volume increase & decrease handlers.
	$(".btn-arrow-up-player").on('click', function() {
		popcorntimeAPI("volume", [window.currentVolume + 0.1]);
	});
	$(".btn-arrow-down-player").on('click', function() {
		popcorntimeAPI("volume", [window.currentVolume - 0.1]);
	});
	// Subtitles handlers.
	$("#select-subtitles-movie-detail").on('change', function() {
		popcorntimeAPI("setsubtitle", [this.value]);
	});
	$("#select-subtitles-player").on('change', function() {
		popcorntimeAPI("setsubtitle", [this.value]);
	});
	// Player handlers.
	$("#select-player-movie-detail").on('change', function() {
		popcorntimeAPI("setplayer", [this.value]);
	});
	$("#select-player-shows-container-contain").on('change', function() {
		popcorntimeAPI("setplayer", [this.value]);
	});
	// Select genre handler.
	$("#select-filter-genre").on('change', function() {
		popcorntimeAPI("filtergenre", [this.value]);
	});
	// Select sort handler.
	$("#select-filter-sort").on('change', function() {
		popcorntimeAPI("filtersorter", [this.value]);
	});
	// Search handlers.
	$("#input-search").keyup(function(e) {
		if ($("#input-search").val() == "") {
			$(".btn-clear-search").addClass("hidden");
			$(".btn-enter-search").addClass("hidden");
		}
		else {
			$(".btn-clear-search").removeClass("hidden");
			$(".btn-enter-search").removeClass("hidden");
		}
		if (e.keyCode == 13) {
			popcorntimeAPI("filtersearch", [this.value]);
		}
	});
	$(".btn-enter-search .fa-search").on('click', function() {
		popcorntimeAPI("filtersearch", [$("#input-search").val()]);
	});
	/*!TODO: Implement theme css files and theme handler. 
	$("#theme-dark").click(function() {
		window.localStorage.setItem("theme", "dark");
		setTheme("dark");
	});
	$("#theme-light").click(function() {
		window.localStorage.setItem("theme", "light");
		setTheme("light");
	});*/
	$(".btn-save").click(function() {
		window.localStorage.setItem("ip", $("#ip").val());
		window.localStorage.setItem("port", $("#port").val());
		window.localStorage.setItem("username", $("#username").val());
		window.localStorage.setItem("password", $("#password").val());
		//window.localStorage.setItem("theme", "dark");
		reloadSettings();
		alert("Settings saved!");
		location.reload();
	});
}

/*!
 * Show the given section id, hide all other sections.
 *
 * @returns {boolean}
 */
function showSection(section) {
	console.debug("[DEBUG] showSection called with argument(s) '" + section + "'.");
	if (section == '') {
		console.warn("[WARNING] Empty argument given for showSection.");
		return false;
	}
	$(".sections").addClass("hidden");
	if (section != "default") {
		$("#default").addClass("hidden");
		$("#" + section).removeClass("hidden");
	}
	return true;
}

/*!
 * Switch to the given theme.
 *
 * @returns {void}
 */
function switchTheme(theme) {
	$("#contents").removeClass("theme_dark");
	$("#contents").removeClass("theme_light");
	$("#contents").addClass("theme_" + theme);
}

/*!
 * Toggle a button's icon.
 *
 * @returns {boolean}
 */
function toggleButton(button) {
	function notEligable(button) {
		console.warn("[WARNING] Could not swap buttons: no eligable class found for toggleButton('" + button + "').");
	}
	if (toggleButton == '') {
		console.warn("[WARNING] Empty argument given for toggleButton.");
		return false;
	}
	else if (button == '.btn-pause') {
		if ($(button).hasClass("fa-play")) {
			swapClass(button, "fa-play", "fa-pause");
		}
		else if ($(button).hasClass("fa-pause")) {
			swapClass(button, "fa-pause", "fa-play");
		}
		else {
			notEligable(button);
			return false;
		}
	}
	else if (button == '.btn-mute') {
		if ($(button).hasClass("fa-volume-down")) {
			swapClass(button, "fa-volume-down", "fa-volume-off");
		}
		else if ($(button).hasClass("fa-volume-off")) {
			swapClass(button, "fa-volume-off", "fa-volume-down");
		}
		else {
			notEligable(button);
			return false;
		}
	}
	else if (button == '.btn-fullscreen') {
		if ($('.btn-fullscreen-child').hasClass("fa-expand")) {
			swapClass('.btn-fullscreen-child', "fa-expand", "fa-compress");
		}
		else if ($('.btn-fullscreen-child').hasClass("fa-compress")) {
			swapClass('.btn-fullscreen-child', "fa-compress", "fa-expand");
		}
		else {
			notEligable(button);
			return false;
		}
	}
	else {
		console.warn("[WARNING] Unknown argument given for toggleButton: '" + button + "'.");
		return false;
	}
	return true;
}

/*!
 * Detect if the current session is the visitor's first session.
 *
 * @returns {boolean}
 */
function firstSession() {
	if (!localStorageExists("ip") || !localStorageExists("port") || !localStorageExists("username") || !localStorageExists("password") /*|| !localStorageExists("theme")*/ ) {
		// Either one of the settings isn't set. We'll assume that this is the first session.
		console.info("[INFO] This seems to be your first session, user!");
		return true;
	}
	else {
		console.info("[INFO] Welcome back, user!");
		return false;
	}
}

/*!
 * Set the current tab.
 *
 * @returns {void}
 */
function setTab(tab) {
	if (tab == "movies" || tab == "shows" || tab == "anime") {
		$(".btn-movies").removeClass("active");
		$(".btn-shows").removeClass("active");
		$(".btn-anime").removeClass("active");
		$(".btn-" + tab).addClass("active");
		return true;
	}
	else {
		$(".btn-movies").removeClass("active");
		$(".btn-shows").removeClass("active");
		$(".btn-anime").removeClass("active");
		return false;
	}
}

/********************!
 * PRIVATE FUNCTIONS
 ********************/

/*!
 * Register a listener.
 *
 * I admit, this could be done better..
 *
 * @returns {boolean} True or False.
 * @private
 */
function registerListener(selector, handlerType, popcorntimeAPImethod, refreshViewStack, toggleGivenButton, sliderChange, popcorntimeAPIarguments) {
	if (selector == "" || handlerType == "" || popcorntimeAPImethod == "") {
		console.warn("[WARNING] Invalid arguments provided for registerListener (Called by: " + arguments.callee.caller.name + ").");
		return false;
	}
	else if (handlerType == "click" && refreshViewStack == true && toggleGivenButton != null) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			popcorntimeAPI("getviewstack");
			toggleButton(toggleGivenButton);
		});
	}
	else if (handlerType == "click" && toggleGivenButton != null) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			toggleButton(toggleGivenButton);
		});
	}
	else if (handlerType == "click" && refreshViewStack == true) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			popcorntimeAPI("getviewstack");
		});
	}
	else if (handlerType == "click") {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
		});
	}
	else if (handlerType == "change" && refreshViewStack == true && toggleGivenButton != null) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			popcorntimeAPI("getviewstack");
			toggleButton(toggleGivenButton);
		});
	}
	else if (handlerType == "change" && toggleGivenButton != null) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			toggleButton(toggleGivenButton);
		});
	}
	else if (handlerType == "change" && refreshViewStack == true) {
		$(selector).click(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
			popcorntimeAPI("getviewstack");
		});
	}
	else if (handlerType == "change") {
		$(selector).change(function() {
			popcorntimeAPI(popcorntimeAPImethod, popcorntimeAPIarguments);
		});
	}
	else {
		console.warn("[WARNING] Unknown argument(s) combination(s) given for registerListener.");
		return false;
	}
	return true;
}

/*!
 * Check if given localStorage key isn't null.
 *
 * @returns {boolean}
 * @private
 */
function localStorageExists(key) {
	if (window.localStorage.getItem(key) != null) {
		return true;
	}
	else {
		return false;
	}
}

/*!
 * Swap an object's class with another class.
 *
 * @returns {void}
 * @private
 */
function swapClass(button, classToRemove, classToAdd) {
	$(button).removeClass(classToRemove);
	$(button).addClass(classToAdd);
}

/*!
 * Set media info from response.
 *
 * @returns {boolean}
 */
function setMediaInfo(response) {
	if (typeof(response) == "undefined") {
		console.warn("[WARNING] Invalid argument provided for setMediaInfo.");
		return false;
	}
	else if (window.view == "player") {
		$("#player-title").html("<h3>" + response.result.title + "</h3>");
		$("#player-info").html("<p>" + response.result.synopsis + "</p>");
		$("#player-image").attr("src", response.result.image);
		return true;
	}
	else if (window.view == "movie-detail") {
		$(".movie-detail-poster img").attr("src", response.result.image);
		$("body").addClass("backdrop");
		$("body").attr("style", "background-image: url(" + response.result.backdrop + ");");
		$(".movie-detail-title").html("" + response.result.title + "");
		$(".movie-detail-year").html("" + response.result.year + "");
		$(".movie-detail-rating").html("" + response.result.rating + "/10");
		$(".movie-detail-synopsis").html("<p>" + response.result.synopsis + "</p>");
		$(".movie-detail-genre").html("" + response.result.genre + "");
		$(".movie-detail-runtime").html("" + response.result.runtime + " min");
		$(".movie-detail-imdblink").html('<a href="http://imdb.com/title/' + response.result.imdb_id + '/" target="_blank"><img src="assets/img/imdb.png"></a>');
		return true;
	}
	else if (window.view == "shows-container-contain") {
		$(".show-info-title").html("" + response.result.title + "");
		$(".show-info-year").html("" + response.result.year + " - " + response.result.status + "");
		$(".show-info-rating").html("" + parseFloat(response.result.rating.percentage) / 10 + "/10");
		$(".show-info-seasons").html("" + response.result.num_seasons + " seasons");
		$(".show-info-genre").html("" + response.result.genres[0] + "");
		$(".show-info-runtime").html("" + response.result.runtime + "min");
		$(".show-info-imdb").html('<a href="http://imdb.com/title/' + response.result.imdb_id + '/" target="_blank"><img src="assets/img/imdb.png"></a>');
		$(".show-info-poster").attr("src", "" + response.result.images.poster + "");
		$(".show-info").attr("style", "background-image: url(" + response.result.images.fanart + ");");
		$(".show-info-synopsis").html("<p>" + response.result.synopsis + "</p>");
		return true;
	}
	else if (window.view == "main-browser") {
		return null;
	}
	else {
		console.warn("[WARNING] setMediaInfo can't do anything with the current view '" + window.view + "'.");
		return false;
	}
}


/************!
 * BOOTSTRAP
 ************/

/*! Show loading container. */
$("#default").removeClass("hidden");

/*! Set variables. */
var version = "1.1.0";
var versionTag = ".pre 'Winter is coming'";
var supportedPopcorntimeVersions = ["0.3.5"];
var ip;
var port;
var username;
var password;
var theme;
var clientVersion;
var interval = 1000;
var connected = false;
var debug = true;
var view = "";
var currenttab = "";
var langcodes = "";
$.getJSON("assets/js/langcodes.json", function(json) {
	window.langcodes = json;
});

/*! On document ready, call functions. */
$(document).ready(function() {
	console.info("[INFO] Document is ready, starting Popcorn Time Remote session.");
	console.info("[INFO] Popcorn Time Remote version " + version + versionTag + ".");
	if (firstSession()) {
		// Show settings section and welcome div.
		console.info("[INFO] Starting in 'Welcome' mode.");
		$(".btn-save").hide();
		$(".btn-close-settings").hide();
		showSection("settings");
		$(".welcome").show();
		$(".btn-welcome").click(function() {
			window.localStorage.setItem("ip", $("#ip").val());
			window.localStorage.setItem("port", $("#port").val());
			window.localStorage.setItem("username", $("#username").val());
			window.localStorage.setItem("password", $("#password").val());
			//window.localStorage.setItem("theme", "dark");
			reloadSettings();
			popcorntimeConnect(true, true);
			popcorntimeConnect(null, true);
			setTimeout(function() {
				console.debug("[DEBUG] Connected status: " + window.connected);
				if (window.connected == true) {
					alert("Connected to Popcorn Time client!");
					location.reload();
				}
			}, 500);
		});
	}
	else {
		loadSettings();
		registerListeners();
		popcorntimeConnect();
		setInterval(function() {
			popcorntimeAPI("getviewstack");
			popcorntimeAPI("getcurrenttab");
		}, interval);
		setTimeout(function() {
			popcorntimeAPI("ping");
		}, 500);
	}
});
