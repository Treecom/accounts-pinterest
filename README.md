# Meteor accounts-pinterest login

## Instalation

```
meteor add treecom:accounts-pinterest
````

## Configuration

Register your app on (pintrest)[https://developers.pinterest.com/apps/] and grab App ID and APP Secret for next config:


```
  Meteor.startup(function() {
    ServiceConfiguration.configurations.upsert({
      service: 'pinterest'
    }, {
      service: 'pinterest',
      scope: 'read_public,write_public', // optional
      clientId: '__APP_ID__',
      secret: '__APP_SECTRET__'
    });
  });
```
