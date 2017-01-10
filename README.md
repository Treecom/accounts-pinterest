# Meteor accounts-pinterest login

## Instalation

```bash
meteor add treecom:accounts-pinterest
````

## Configuration

Register your application on [pinterest](https://developers.pinterest.com/apps/) and grab App ID and APP Secret for next server side config:


```js
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
