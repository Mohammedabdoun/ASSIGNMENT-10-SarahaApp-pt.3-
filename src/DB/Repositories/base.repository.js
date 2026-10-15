export default class BaseRepository {

    constructor(model){
        this.model = model;
    }
  

  createNewDocument(data) {

    return this.model.create(data);
    }



    findDocumentById(_id) {
        return this.model.findById(_id);
    }


    findOneDocument(filter) {
        return this.model.findOne(filter);
    }

    findOneAndUpdateDocument(filter, update, options) {
        return this.model.findOneAndUpdate(filter, update, options);
    }
}