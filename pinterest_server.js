Pinterest = {};

var querystring = Npm.require('querystring');


OAuth.registerService('pinterest', 2, null, function(query) {

	var expiresAt =  new Date()
	expiresAt.setFullYear(expiresAt.getFullYear() + 1);

	var response = getTokenResponse(query);
	var accessToken = response.accessToken;
	var whitelisted = ['id', 'first_name', 'last_name', 'scope'];
	var identity = getIdentity(accessToken, whitelisted);
	var serviceData = _.extend({
		accessToken: accessToken
	}, identity.data);

	return {
		serviceData: serviceData,
		options: { profile: {name: identity.data.first_name + ' ' + identity.data.last_name} }
	};
});


// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
	var config = ServiceConfiguration.configurations.findOne({service: 'pinterest'});
	if (!config)
		throw new ServiceConfiguration.ConfigError();

	var responseContent;
	try {
		// Request an access token
		responseContent = HTTP.post(
			"https://api.pinterest.com/v1/oauth/token",
			{
				headers: {"User-Agent": "Meteor/1.0"},
				params: {
					grant_type: 'authorization_code',
					client_id: config.clientId,
					redirect_uri: OAuth._redirectUri('pinterest', config),
					client_secret: OAuth.openSecret(config.secret),
					code: query.code
				}
			}
		);
	} catch (err) {
		throw _.extend(new Error("Failed to complete OAuth handshake with Pinterest. " + err.message),
									 {response: err.response});
	}

	// Success!  Extract the pinterest access token and expiration
	// time from the response
	var accessToken = responseContent.data.access_token;

	if (!accessToken) {
		throw new Error("Failed to complete OAuth handshake with Pinterest " +
										"-- can't find access token in HTTP response. " + responseContent);
	}

	return {
		accessToken: accessToken
	};
};

var getIdentity = function (accessToken, fields) {
	try {
		return HTTP.get("https://api.pinterest.com/v1/me", {
			params: {
				access_token: accessToken,
			}
		}).data;
	} catch (err) {
		throw _.extend(new Error("Failed to fetch identity from Pinterest. " + err.message),
									 {response: err.response});
	}
};

Pinterest.retrieveCredential = function(credentialToken, credentialSecret) {
	return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
