import models from '../database/models';
import QueriesClass from './queriesClass';


const { seller } = models;

class SellerService extends QueriesClass {
 constructor() {
     super();
     this.model = seller
 }
}

export default new SellerService();