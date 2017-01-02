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

	var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
	var display = mobile ? 'touch' : 'redirect';
	var scope = ['read_public','write_public'];
	var credentialToken = Random.id();

	var loginStyle = OAuth._loginStyle('pinterest', config, options);

	var state = OAuth._stateParam(loginStyle, credentialToken);
	if (config.scope) {
		scope = config.scope;
	}

	if (options && options.requestPermissions) {
		scope = scope +','+ options.requestPermissions.join(',');
	}
	//alert(OAuth._redirectUri('pinterest', config));
	var loginUrl =
			'https://api.pinterest.com/oauth/?' +
			'response_type=code' +
			'&redirect_uri=' + encodeURIComponent(Meteor.absoluteUrl('_oauth/pinterest?close', {secure: true,replaceLocalhost:true})) +
			'&client_id=' + config.clientId +
			'&scope='+scope
			'&state=' + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl);

	OAuth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};

