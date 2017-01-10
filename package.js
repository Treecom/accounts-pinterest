Package.describe({
  name: 'treecom:accounts-pinterest',
  // Brief, one-line summary of the package.
  summary: 'Oauth login for Pinterest',
  version: '1.0.3',
  // URL to the Git repository containing the source code for this package.
  git: "https://github.com/Treecom/accounts-pinterest.git",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.imply('accounts-oauth', ['client', 'server']);

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.add_files('pinterest_client.js', 'client');
  api.add_files('pinterest_server.js', 'server');
  api.add_files("pinterest.js");

  api.export('Pinterest');
});

Package.onTest(function(api) {
  api.use('accounts-base', ['client', 'server']);
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.imply('accounts-oauth', ['client', 'server']);

  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('http', ['server']);
  api.use('underscore', 'server');
  api.use('random', 'client');
  api.use('service-configuration', ['client', 'server']);

  api.add_files('pinterest_client.js', 'client');
  api.add_files('pinterest_server.js', 'server');
  api.add_files("pinterest.js");

  api.export('Pinterest');
});
