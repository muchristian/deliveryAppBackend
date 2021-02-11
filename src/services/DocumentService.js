import models from '../database/models';
import QueriesClass from './queriesClass';


const { document } = models;

class DocumentService extends QueriesClass {
 constructor() {
     super();
     this.model = document
 }
}

export default new DocumentService();