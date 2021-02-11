import models from '../database/models';
import QueriesClass from './queriesClass';


const { request } = models;

class RequestService extends QueriesClass {
 constructor() {
     super();
     this.model = request
 }
}

export default new RequestService();