import models from '../database/models';
import QueriesClass from './queriesClass';


const { prod_to_deliver } = models;

class ProdToDeliverService extends QueriesClass {
 constructor() {
     super();
     this.model = prod_to_deliver
 }
}

export default new ProdToDeliverService();