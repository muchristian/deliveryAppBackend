import models from '../database/models';
import QueriesClass from './queriesClass';


const { shop } = models;

class ShopService extends QueriesClass {
 constructor() {
     super();
     this.model = shop
 }
}

export default new ShopService();