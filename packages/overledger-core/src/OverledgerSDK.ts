import { AxiosInstance, AxiosPromise } from 'axios';
import OverledgerSearch from '@quantnetwork/overledger-search';
import Provider, { TESTNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import { SignedTransactionRequest, SDKOptions, DLTOptions, UnsignedData, SequenceDataRequest, APICallWrapper, DLTAndAddress, NetworkOptions, SequenceDataResponse } from '@quantnetwork/overledger-types';

/**
 * @memberof module:overledger-core
*/
class OverledgerSDK {
  /**
   * The object storing the DLTs loaded by the Overledger SDK
   */
  dlts: { [key: string]: AbstractDLT } = {};

  mappId: string;
  bpiKey: string;
  network: NetworkOptions;
  provider: Provider;
  request: AxiosInstance;
  search: OverledgerSearch;

  /**
   * Create the Overledger SDK
   *
   * @constructor
   * @param {string} mappId The Multi-chain Application ID
   * @param {string} bpiKey The Overledger Blockchain Programming Interface license key
   * @param {SDKOptions} options The DLT Options and Provider Options
   */
  constructor(mappId: string, bpiKey: string, options: SDKOptions) {
    this.mappId = mappId;
    this.bpiKey = bpiKey;
    this.network = options.provider && options.provider.network || TESTNET;

    this.validateOptions(options);

    options.dlts.forEach((dltConfig: DLTOptions) => {
      const dlt = this.loadDlt(dltConfig);
      this.dlts[dlt.name] = dlt;
    });

    this.provider = new Provider(mappId, bpiKey, options.provider);
    this.request = this.provider.createRequest();
    this.search = new OverledgerSearch(this);
  }

  /**
   * Load the DLT in the Overledger SDK
   *
   * @param {DLTOptions} config DLT name and an optional Private Key to use as the main account
   *
   * @return {AbstractDLT} The loaded DLT class
   */
  private loadDlt(config: DLTOptions): AbstractDLT {
    // TODO: improve this loading
    const dltName = `overledger-dlt-${config.dlt}`;
    try {
      const provider = require(`@quantnetwork/${dltName}`).default;

      return new provider(this, config);
    } catch (error) {
      if (error.code === 'MODULE_NOT_FOUND') {
        throw `Could not find the package for this DLT. Please install @quantnetwork/${dltName} manually.`;
      }
    }
  }

  /**
   * Validate the provided Overledger SDK Options
   *
   * @param {SDKOptions} options The DLT Options and Provider Options
   */
  private validateOptions(options: SDKOptions): void {
    if (!options.dlts) {
      throw new Error('The dlts are missing');
    }
  }

  /**
   * Wrap the DLT Data with the API schema
   *
   * @param {SignedTransactionRequest[]} signedTransactionRequest Array of signed transactions
   *
   * @return {APICallWrapper} Object conforming to the API schema
   */
  private buildWrapperApiCall(signedTransactionRequest: SignedTransactionRequest[]): APICallWrapper {
    return {
      mappId: this.mappId,
      dltData: signedTransactionRequest,
    };
  }

  /**
   * Sign the provided transactions
   *
   * @param {UnsignedData[]} unsignedData Array of unsigned data
   *
   * @return {SignedTransactionRequest[]} Array of signed transaction requests wrapped by Overledger metadata
   */
  public async sign(unsignedData: UnsignedData[]): Promise<SignedTransactionRequest[]> {
    const signedTransactionRequest = Promise.all(unsignedData.map(async (data) => {
      const signedTransaction = await this.dlts[data.dlt].sign(data.toAddress, data.message, data.options);

      return {
        dlt: data.dlt,
        fromAddress: this.dlts[data.dlt].account.address,
        amount: data.options.amount,
        signedTransaction: {
          signatures: [],
          transactions: [signedTransaction],
        },
      };
    }));

    return signedTransactionRequest;
  }

  /**
   * Send signed transactions to Overledger
   *
   * @param {SignedTransactionRequest[]} signedTransactions Array of Overledger signed transaction data
   */
  public send(signedTransactions: SignedTransactionRequest[]): AxiosPromise<Object> {
    const apiCall = signedTransactions.map(
      stx => this.dlts[stx.dlt].buildSignedTransactionsApiCall(stx),
    );

    return this.request.post('/transactions', this.buildWrapperApiCall(apiCall));
  }

  /**
   * Get the balances of the specified addresses
   *
   * @param {DLTAndAddress[]} balancesRequest Array of objects specifing the address and corresponding DLT
   */
  public getBalances(balancesRequest: DLTAndAddress[]): AxiosPromise<Object> {
    return this.request.post('/balances', balancesRequest);
  }

  /**
   * Get the sequence numbers for the provided addresses
   *
   * @param {SequenceDataRequest[]} sequenceRequest Request for sequence numbers of the provided addresses
   *
   * @return {SequenceDataResponse} Sequence response
   */
  public getSequences(sequenceRequest: SequenceDataRequest[]): AxiosPromise<SequenceDataResponse> {
    const request = {
      dltData: sequenceRequest,
    };
    return this.request.post('/sequence', request);
  }

  /**
   * Get transactions submitted through Overledger by the Multi-Chain Application ID used to create the SDK
   *
   */
  public readTransactionsByMappId(): AxiosPromise<Object> {
    return this.request.get(`/transactions/mappid/${this.mappId}`);
  }

  /**
   * Get the transaction specified by the Overledger Transaction ID
   *
   * @param {string} overledgerTransactionId Overledger Transaction ID
   */
  public readOverledgerTransaction(overledgerTransactionId: string): AxiosPromise<Object> {
    return this.request.get(`/transactions/id/${overledgerTransactionId}`);
  }

  /**
   * Set the Multi-Chain Application ID
   *
   * @param {string} mappId Multi-Chain Application ID
   */
  public setMappId(mappId: string): void {
    this.mappId = mappId;
  }

  /**
   * Get the Multi-Chain Application ID
   *
   */
  public getMappId(): string {
    return this.mappId;
  }

  /**
   * Set the Overledger Blockchain Programming Interface license key
   *
   * @param {string} bpiKey
   */
  public setBpiKey(bpiKey: string): void {
    this.bpiKey = bpiKey;
  }

  /**
   * Get the Overledger Blockchain Programming Interface license key
   *
   */
  public getBpiKey(): string {
    return this.bpiKey;
  }
}

export default OverledgerSDK;
