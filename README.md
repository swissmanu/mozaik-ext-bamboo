# Mozaïk Bamboo Widgets
[![npm version](https://badge.fury.io/js/mozaik-ext-bamboo.svg)](http://badge.fury.io/js/mozaik-ext-bamboo)

## Bamboo Client Configuration

In order to use the Mozaïk Bamboo widgets, you have to configure its **client**.

### Parameters

key             | description
----------------|-----------------------------------------
`baseUrl`       | *URL of your Bamboo installation*
`auth.user`     | *Username to authenticate with*
`auth.password` | *Matching passwort to authenticate with*

### Usage

```javascript
{
  //…
  api: {
    bamboo: {
      baseUrl: 'https://my.bamboo.server.com',
      auth: {
        user: 'user',
        password: 'password'
      }
    }
  }
}
```

## Bamboo Build Plan Results

> Shows the latest result for a list of build plans identified by their ID's.

![Bamboo Build Plan Results](https://raw.githubusercontent.com/swissmanu/mozaik-ext-bamboo/master/preview/bamboo.plan_results.png)

### Parameters

key       | required | description
----------|----------|------------------------------------
`planIds` | yes      | *An array with plan ID's as string*

### Usage

```javascript
{
  type: 'bamboo.plan_results',
  columns: 1, rows: 1, x: 0, y: 1,
  planIds: [
    'BP-BPL1',
    'BP-BPL2'
  ]
}
```
