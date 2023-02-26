require('dotenv').config();
const router = require('express').Router();
const paypal = require('paypal-rest-sdk')


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_API_CLIENT_ID,
    'client_secret': process.env.PAYPAL_API_SECRET_ID
  });

router.post('/', (request, response) => {
    try{
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8100/success",
                "cancel_url": "http://localhost:8100/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        // "name": "item",
                        // "sku": "item",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Accountability Payment: Missed Deadline."
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log("VINAY IS MAKING ERROR");
                throw error;
            } else {
                console.log("Create Payment Response");
                console.log(payment);
                // response.send("Test Successful");

                var linksArray = payment.links;
                for(let i = 0; i < linksArray.length; i++){
                    var temp = linksArray[i];
                    if(temp.rel === 'approval_url'){
                        response.redirect(temp.href);
                    }
                }
            }
        });
    }catch(error){
        response.json(error);
        console.log(error);
    }
});

router.get('/', (request, response) => {
    try{
        const whoIsPaying_ID = request.query.PayerID;
        const amountPayment_ID = request.query.paymentId

        const execute_payment_json = {
            "payer_id": whoIsPaying_ID,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                }
            }]
        };
                
        paypal.payment.execute(amountPayment_ID, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log("Get Payment Response");
                console.log(payment);
                response.send("Payment Successful");
            }
        });
    }catch(error){
        response.json(error);
        console.log(error);
    }
});

module.exports = router;