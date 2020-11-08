import models from '../database/models';
import QueriesClass from './queriesClass';


const { deliver_request } = models;

class DeliverReqService extends QueriesClass {
 constructor() {
     super();
     this.model = deliver_request
 }
}

export default new DeliverReqService();