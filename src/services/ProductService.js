import models from '../database/models';
import QueriesClass from './queriesClass';


const { product } = models;

class ProductService extends QueriesClass {
 constructor() {
     super();
     this.model = product
 }
}

export default new ProductService();