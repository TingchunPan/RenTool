import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
/**
 * @author Ting-chun Pan
 * @reference https://www.npmjs.com/package/react-paypal-express-checkout
 */
export default class Paypal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            console.log("The payment is successful!", payment);
            this.props.onSuccess(payment);

        }

        const onCancel = (data) => {
            console.log('The payment is cancelled!', data);
        }

        const onError = (err) => {
            console.log("Error!", err);
        }
        const env = 'sandbox';
        const currency = 'GBP';
        const total = this.props.toPay;
        const client = {
            sandbox: 'Acqaf4lRcxNUMmwg-b7yHKD0w6yMSikeTyiTuJRCShQf82oHovfbIgNW3_nVdxt1sQsLDzRL20n3dBbW',
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        return (
            <PaypalExpressBtn
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                env={env}
                client={client}
                currency={currency}
                total={total}
                style={{ size: 'large', color: 'blue' }}
            />

        );
    }
}