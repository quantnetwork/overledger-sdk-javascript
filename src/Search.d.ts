import { AxiosInstance } from 'axios';
import OverledgerSDK from './';
declare class Search {
    sdk: OverledgerSDK;
    request: AxiosInstance;
    /**
     * @param {Object} sdk
     * @param {Object} options
     */
    constructor(sdk: any);
    /**
     * Get transaction by a transaction hash (non-deterministic)
     *
     * @param {string} transactionHash Transaction hash
     */
    getTransaction(transactionHash: any): Promise<any>;
    /**
     * Get whoami
     *
     * @param {string} hash hash
     */
    whoami(hash: any): Promise<any>;
    /**
     * Get block
     *
     * @param {string} hashOrNumber hash or number
     */
    getBlockByDltAndHash(dlt: any, hashOrNumber: any): Promise<any>;
}
export default Search;
