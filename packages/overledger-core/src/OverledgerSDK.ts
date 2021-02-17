import axios, { AxiosInstance, AxiosPromise } from 'axios';
import OverledgerSearch from '@quantnetwork/overledger-search';
import Provider, { TESTNET } from '@quantnetwork/overledger-provider';
import AbstractDLT from '@quantnetwork/overledger-dlt-abstract';
import {StatusRequest, SignedTransactionRequest, UnsignedTransactionRequest, SDKOptions, DLTOptions, TransactionRequest, SequenceDataRequest, APICallWrapper, DLTAndAddress, NetworkOptions, SequenceDataResponse, FeeEstimationResponse, NodeResourceRequest } from '@quantnetwork/overledger-types';
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

  constructor();
    /**
   * @constructor
   * @param {string} accessToken The access token from authorisation server
   * @param {SDKOptions} options The DLT Options and Provider Options
   */
  constructor(accessToken: string, options: SDKOptions);
  /**
   * @constructor
   * @param {string} mappId The Multi-chain Application ID
   * @param {string} bpiKey The Overledger Blockchain Programming Interface license key
   * @param {SDKOptions} options The DLT Options and Provider Options
   */
  constructor(mappId: string, bpiKey: string, options: SDKOptions);

  /**
* Create the Overledger SDK
* */
  constructor(...args: any[]) {
    if (args.length === 3) {
      console.log("using V1...");
      this.mappId = args[0];
      this.bpiKey = args[1];
      var options = args[2];
      this.network = options.provider && options.provider.network || TESTNET;

      this.validateOptions(options);

      options.dlts.forEach((dltConfig: DLTOptions) => {
        const dlt = this.loadDlt(dltConfig);
        this.dlts[dlt.name] = dlt;
      });

      this.provider = new Provider(this.mappId, this.bpiKey, options.provider);
      this.request = this.provider.createRequest();
      this.search = new OverledgerSearch(this);
    } else if (args.length === 2) {
      console.log("using V2...");
      var accessToken = args[0];
      var options = args[1];

      this.validateOptions(options);
      options.dlts.forEach((dltConfig: DLTOptions) => {
        const dlt = this.loadDlt(dltConfig);
        this.dlts[dlt.name] = dlt;
      });

      this.provider = new Provider(options.provider);
      this.request = this.provider.createOAuthRequest(accessToken);
    } else {
      console.log("creating default constructor.");
    }
  }

  /**
   * Load the DLT in the Overledger SDK
   *
   * @param {DLTOptions} config DLT name and an optional Private Key to use as the main account
   *
   * @return {AbstractDLT} The loaded DLT class
   */
  private loadDlt(config: DLTOptions): AbstractDLT {

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
   * refresh access token
   */
  public refreshAccessToken(client_id: string, refresh_token: string): AxiosPromise<Object> {

    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('client_id', client_id)
    params.append('refresh_token', refresh_token)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }

    //<api gateway path to refresh access token>
    var url = 'https://qnttest6.auth.us-east-2.amazoncognito.com/oauth2/token';

    return axios.post(url, params, config);
  }

  /**
   * Sign the provided transactions
   *
   * @param {TransactionRequest[]} - the provided transactions in the standard overledger form
   *
   * @return {SignedTransactionRequest[]} Array of signed transaction requests wrapped by Overledger metadata
   */
  public async sign(unsignedData: TransactionRequest[]): Promise<SignedTransactionRequest[]> {
    const signedTransactionRequest = Promise.all(unsignedData.map(async (data) => {
      const signedTransaction = await this.dlts[data.dlt].sign(data);

      return {
        dlt: data.dlt,
        fromAddress: this.dlts[data.dlt].account.address,
        signedTransaction: {
          signatures: ['not used'],
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
   * Send unsigned transactions to Overledger
   *
   * @param {UnsignedTransactionRequest} unsignedTransactions Unsigned transaction data
   */
  public sendUnsigned(unsignedTransactions: UnsignedTransactionRequest[]): AxiosPromise<Object> {
    let count = 0;
    while (count < unsignedTransactions.length){
      if (unsignedTransactions[count].dlt === "hyperledger_fabric"){
        try {
          return this.request.post(`/chaincode/sendTransaction`, JSON.stringify(unsignedTransactions[count].txObject));
        } catch (e) {
          return e.response;
        }
      } else {
        throw "The SDK does not yet support sending unsigned transactions for distributed ledger: " + unsignedTransactions[count].dlt;
      }
    }
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
   * Call a resource of a node
   *
   * @param {NodeResourceRequest} nodeResourceRequest object specifing the resource to call on this node
   */
  public callNodeResource(nodeResourceRequest: NodeResourceRequest): Object {
    try{
      return this.request.post(nodeResourceRequest.endpoint, nodeResourceRequest.resourceObject);
      //.catch( err => err.response);  
    }catch(e){
      return e.response;
    }
  }


  /**
   * subscribe status of transaction
   *
   * @param {StatusRequest} subStatusRequest object specifing the transaction request for subscribe status
   */
  public subscribeStatusUpdate(subStatusRequest: StatusRequest): Object {
    try{
      let subStatusReqJson = JSON.stringify(subStatusRequest);
      return this.request.post('/webhook/subscribe', subStatusReqJson)
      //.catch( err => err.response);  
    }catch(e){
      return e.response;
    }
  }
  
  /**
   * unsubscribe status of transaction
   *
   * @param {StatusRequest} unSubStatusReq object specifing the transaction request for unsubscribe status
   */
  public unSubscribeStatusUpdate(unSubStatusReq: StatusRequest): AxiosPromise<Object> {
    try{
      let unSubStatusReqJson = JSON.stringify(unSubStatusReq);
      return this.request.post('/webhook/unsubscribe', unSubStatusReqJson);
    }catch(e){
      return e.response;
    }
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
   * Get the fee estimation for a DLT
   * @param {string} address The address to query for
   * @param {number} blockNumber The number of blocks
   * @return {Promise<AxiosResponse>}
   */
  public getFeeEstimation(dlt: string, blockNumber: number): AxiosPromise<FeeEstimationResponse> {
    if (dlt === '') {
      throw new Error('The dlt name must be passed');
    }

    try {
      return this.request.post(`/fee/${dlt}/${blockNumber}`);
    } catch(e) {
      return e.response;
    }
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
