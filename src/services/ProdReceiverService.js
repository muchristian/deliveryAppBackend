import models from '../database/models';
import QueriesClass from './queriesClass';


const { prod_receiver } = models;

class ProdReceiverService extends QueriesClass {
 constructor() {
     super();
     this.model = prod_receiver
 }
}

export default new ProdReceiverService();