import { config } from '../config';

export class PaymentService {
  private payfast: any; // Replace with actual PayFast SDK type

  constructor() {
    this.payfast = new PayFast({
      merchantId: config.payfast.merchantId,
      merchantKey: config.payfast.merchantKey,
      passPhrase: config.payfast.passPhrase,
      testMode: config.payfast.testMode
    });
  }

  async createPayment(amount: number, orderId: string) {
    try {
      const payment = await this.payfast.createPayment({
        amount: amount.toString(),
        item_name: `Crypto Purchase ${orderId}`,
        return_url: `${process.env.APP_URL}/payment/success`,
        cancel_url: `${process.env.APP_URL}/payment/cancel`,
        notify_url: `${process.env.API_URL}/webhook/payment`,
        custom_str1: orderId
      });

      return {
        success: true,
        paymentId: payment.id,
        paymentUrl: payment.url
      };
    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: 'Failed to create payment'
      };
    }
  }

  async verifyPayment(paymentId: string) {
    try {
      const status = await this.payfast.getPaymentStatus(paymentId);
      return {
        success: true,
        status: status
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      return {
        success: false,
        error: 'Failed to verify payment'
      };
    }
  }
}