<!--suppress ALL -->
<p align="center">
  <img src="https://raw.githubusercontent.com/zfhassaan/jazzcash/master/logo_JazzCash.png" alt="JazzCash Payment Gateway" width="150"/><br/>
  <!-- <h3 align="center">Payfast</h3> -->
</p>


[![MIT Licensed](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)


# JazzCash Node.js Integration

**Disclaimer:** This is an unofficial JazzCash API Payment Gateway integration. This repository aims to assist developers in streamlining the integration process. For official information, please refer to the [JazzCash Online Payment Gateway](https://www.jazzcash.com.pk/corporate/online-payment-gateway/). This package facilitates the hosted checkout process and does not currently support subscription options.

## About

JazzCash is a leading payment gateway in Pakistan, enabling businesses to securely accept online payments. It offers fast transaction processing, advanced fraud protection, and a user-friendly interface, making it ideal for small business owners, e-commerce stores, and developers integrating payment gateways into websites or mobile apps. This document provides detailed instructions for integrating JazzCash's hosted checkout feature (version 1.0.0).

## Intended Audience

This guide is for merchants and developers seeking to integrate JazzCash's hosted checkout into their applications.

## Integration Scope

Merchants are responsible for implementing all e-commerce functionality. JazzCash services are utilized solely for payment processing via the hosted checkout feature.

## API Endpoints

This package supports only the hosted checkout process; direct checkout API endpoints are not included.

## Integration Prerequisites

Prior to integration, merchants must register with JazzCash. Upon registration, the following credentials will be provided:

- **Merchant_ID**
- **Password**
- **Hashkey**
- **Sandbox URL**
- **Production URL**

These credentials are essential for obtaining a one-time authentication token.

## Installation

Install the package via npm:

```bash
npm install jazzcash
```

## Configuration

Create a configuration file (e.g., `config.js`) and set the following parameters:

```javascript
module.exports = {
  paymentMode: 'sandbox', // or 'production'
  merchantId: 'YOUR_MERCHANT_ID',
  password: 'YOUR_PASSWORD',
  hashKey: 'YOUR_HASHKEY',
  mpin: 'YOUR_MPIN',
  productionUrl: 'YOUR_PRODUCTION_URL',
  sandboxUrl: 'YOUR_SANDBOX_URL',
  returnUrl: 'YOUR_RETURN_URL',
};
```

## Usage

In your application, require the JazzCash module and use it as follows:

```javascript
const JazzCash = require('jazzcash-nodejs');
const config = require('./config');

const jazzcash = new JazzCash(config);

const transactionData = {
  amount: 1000, // Amount in paisa (e.g., 1000 paisa = 10 PKR)
  billReference: 'bill-reference',
  productDescription: 'Product Description',
};

jazzcash.initiateTransaction(transactionData)
  .then(response => {
    // Handle the response, e.g., render the HTML form
  })
  .catch(error => {
    // Handle errors
  });
```

## Steps

1. **Hosted Checkout:**
   - Send a POST request with the following parameters:
     ```json
     {
       "amount": "1",
       "billref": "bill-reference",
       "productDescription": "Product Description"
     }
     ```
   - In your controller:
     ```javascript
     const jazzcash = new JazzCash(config);
     jazzcash.setAmount(request.body.amount);
     jazzcash.setBillReference(request.body.billref);
     jazzcash.setProductDescription(request.body.productDescription);
     return jazzcash.sendRequest();
     ```
   - The `sendRequest` method sends a request to the JazzCash API to initiate the checkout process and returns the response as an HTML template, which can be rendered on web and mobile applications. Use CSS to control the visibility of fields on the frontend.

## Testing

- **Sandbox Mode:** Set `paymentMode` to `'sandbox'` in your configuration to test the checkout process without processing actual payments.
- **Production Mode:** Set `paymentMode` to `'production'` in your configuration to process live transactions.

## Changelog

Refer to the [Changelog](./CHANGELOG.md) for recent updates and changes.

## Security

When contributing to this project, please ensure your bug reports include:

- A quick summary and background
- Steps to reproduce
- Expected and actual results
- Notes, including any attempts to resolve the issue

This information aids in effective troubleshooting and resolution.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

This package is inspired by the [JazzCash Laravel package](https://github.com/zfhassaan/jazzcash) and aims to provide similar functionality for Node.js applications.

For more information on JazzCash integration, refer to the [JazzCash Online Payment Gateway](https://www.jazzcash.com.pk/corporate/online-payment-gateway/).

---

*Note: Ensure you have valid JazzCash credentials and necessary permissions to use this package.* 