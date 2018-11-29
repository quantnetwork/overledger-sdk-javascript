import { AxiosInstance } from 'axios';
import Search from './Search';
declare class OverledgerSDK {
    TESTNET: string;
    MAINNET: string;
    /**
     * The object storing the DLTs loaded by the Overledger sdk
     */
    dlts: {};
    overledgerUri: string;
    mappId: string;
    bpiKey: string;
    network: string;
    request: AxiosInstance;
    search: Search;
    /**
     * @param {string} mappId
     * @param {string} bpiKey
     * @param {Object} options
     */
    constructor(mappId: string, bpiKey: string, options?: {});
    /**
     * Validate the provided options
     *
     * @param {Object} options
     */
    private validateOptions;
    /**
     * Configure the provided options
     *
     * @param {Object} options
     */
    private configure;
    /**
     * Sign transactions for the provided DLTs
     *
     * @param {Object} dlts Object of the DLTs where you want to send a transaction
     */
    sign(dlts: any): Promise<{
        dlt: any;
        signedTransaction: any;
    }[]>;
    /**
     * Wrap the DLTData with the api schema
     *
     * @param {array} dltData
     */
    private buildWrapperApiCall;
    /**
     * Send signed transactions to the provided DLTs
     *
     * @param {Object} signedTransactions Object of the DLTs where you want to send a transaction
     */
    send(signedTransactions: any): import("axios").AxiosPromise<any>;
    /**
     * Load the dlt to the Overledger SDK
     *
     * @param {object} config
     *
     * @return {Provider}
     */
    private loadDlt;
    /**
     * Read by mapp id
     */
    readTransactionsByMappId(): Promise<any>;
    /**
     * read by overledger transaction id
     *
     * @param {string} ovlTransactionId
     */
    readByTransactionId(ovlTransactionId: any): Promise<any>;
    /**
     * Set the mapp id
     *
     * @param {string} mappId
     */
    setMappId(mappId: any): void;
    /**
     * get the mapp id
     */
    getMappId(): string;
    /**
     * set the bpi key
     *
     * @param {string} bpiKey
     */
    setBpiKey(bpiKey: any): void;
    /**
     * get the bpi key
     */
    getBpiKey(): string;
}
export default OverledgerSDK;
