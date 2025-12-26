class WhatsAppVerificationStrategy {
  async send({ phone, code }) {
    console.log(`[WHATSAPP] Send code ${code} to ${phone}`);
    return true;
  }
}
module.exports = WhatsAppVerificationStrategy;
