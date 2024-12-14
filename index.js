const axios = require('axios')
const crypto = require('crypto')

/**
 * The JazzCash Payment Gateway is a PHP library that provides integration with the JazzCash payment platform.
 * JazzCash is a leading mobile financial service in Pakistan that enables users to make secure online payments,
 * transfer funds, and perform various financial transactions.
 *
 * @class
 * @property {string} merchantId - The merchant ID assigned to you by JazzCash
 * @property {string} password - The merchant password assigned to you by JazzCash
 * @property {string} integritySalt - The integrity salt assigned to you by JazzCash
 * @property {string} environment - The environment in which you want to run the transactions. The default is 'sandbox'.
 */
class JazzCash {
  /**
   * Creates a new instance of JazzCash.
   * @param {Object} config - The configuration object containing the merchant ID, password, integrity salt, and environment.
   */
  constructor(config) {
    this.merchantId = config.merchantId
    this.password = config.password
    this.integritySalt = config.integritySalt
    this.environment = config.environment || 'sandbox'
    this.baseUrl =
      this.environment === 'production'
        ? 'https://payments.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
        : 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API/2.0/Purchase/DoMWalletTransaction'
  }

  /**
   * Generates a secure hash from the given parameters.
   * @param {Object} params - The parameters to be hashed.
   * @return {string} The generated hash.
   */
  generateSecureHash(params) {
    const sortedKeys = Object.keys(params).sort()
    const hashString = sortedKeys
      .map((key) => `${params[key]}`)
      .join('&')
    return crypto
      .createHmac('sha256', this.integritySalt)
      .update(hashString)
      .digest('hex')
  }

  /**
   * Initiates a transaction with the given transaction data.
   * @param {Object} transactionData - The transaction data to be used for the transaction.
   * @return {Promise} A promise that resolves with the response from the server.
   */
  async initiateTransaction(transactionData) {
    const params = {
      pp_Version: '1.1',
      pp_TxnType: 'MWALLET',
      pp_Language: 'EN',
      pp_MerchantID: this.merchantId,
      pp_Password: this.password,
      pp_TxnRefNo: `T${Date.now()}`,
      pp_Amount: transactionData.amount,
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14),
      pp_BillReference: transactionData.billReference,
      pp_Description: transactionData.description,
      pp_ReturnURL: transactionData.returnUrl,
      pp_SecureHash: '',
      ppmpf_1: transactionData.customParam1 || '',
      ppmpf_2: transactionData.customParam2 || '',
      ppmpf_3: transactionData.customParam3 || '',
      ppmpf_4: transactionData.customParam4 || '',
      ppmpf_5: transactionData.customParam5 || '',
    }
    params.pp_SecureHash = this.generateSecureHash(params)
    try {
      const response = await axios.post(this.baseUrl, params)
      return response.data
    } catch (error) {
      throw new Error(`Transaction initiation failed: ${error.message}`)
    }
  }
}

module.exports = JazzCash
