class VerificationContext {
  constructor(strategy) {
    this.strategy = strategy;
  }
  async send(payload) {
    return this.strategy.send(payload);
  }
}
module.exports = VerificationContext;
