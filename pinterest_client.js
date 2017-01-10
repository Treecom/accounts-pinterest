Pinterest = {};

Pinterest.requestCredential = function (options, credentialRequestCompleteCallback) {

	if (!credentialRequestCompleteCallback && typeof options === 'function') {
		credentialRequestCompleteCallback = options;
		options = {};
	}

	var config = ServiceConfiguration.configurations.findOne({service: 'pinterest'});
	if (!config) {
		credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
		return;
	}

	var scope = 'read_public,write_public';
	var credentialToken = Random.secret();
	var loginStyle = OAuth._loginStyle('pinterest', config, options);

	if (config.scope) {
		scope = config.scope;
	}

	if (options && options.requestPermissions) {
		scope = scope + options.requestPermissions.join(',');
	}

	var loginUrl =
			'https://api.pinterest.com/oauth/?' +
			'response_type=code' +
			'&redirect_uri=' + OAuth._redirectUri('pinterest', config) +
			'&client_id=' + config.clientId +
			'&scope='+scope+
			'&state='+OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl)

	// OAuth.initiateLogin(loginStyle, credentialToken, credentialRequestCompleteCallback);
	OAuth.launchLogin({
		loginService: "pinterest",
		loginStyle: loginStyle,
		loginUrl: loginUrl,
		credentialRequestCompleteCallback: credentialRequestCompleteCallback,
		credentialToken: credentialToken
	});
};

