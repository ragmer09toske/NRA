const braintree = require('braintree');

// Initialize Braintree gateway using your API credentials
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox, // or braintree.Environment.Production
    merchantId: 'gf8pxqn8yd7wrzhm',
    publicKey: 'v6q96stgnfchmwph',
    privateKey: 'e7d65c8bdfe5ebdd8827103526e40267'
});

// Generate client token
exports.generateClientToken = (req, res) => {
  gateway.clientToken.generate({}, (error, response) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(response.clientToken);
  });
};

// Process payment
exports.processPayment = (req, res) => {
  const nonceFromTheClient = req.body.paymentMethodNonce;

  gateway.transaction.sale({
    // ...
  }, (error, result) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.send(result);
  });
};
