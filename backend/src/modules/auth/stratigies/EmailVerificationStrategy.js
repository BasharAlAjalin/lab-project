class EmailVerificationStrategy {
  async send({ email, code }) {
    console.log([EMAIL] Send code ${code} to ${email});
    return true;
  }
}
module.exports = EmailVerificationStrategy;
