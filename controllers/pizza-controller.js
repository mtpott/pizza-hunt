const { Pizza } = require('../models');

const pizzaController = {
    //get all pizzas
    //getAllPizza serves as the callback function for GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
        //this will populate the field we want to show up!
        .populate({
            path: 'comments',
            //__v is something that Mongoose populates, but we don't care about that, so include the (-) in front to make sure Mongoose knows we don't want that in our field
            select: '-__v'
        })
        .select('-__v')
        //this will sort in descending order by _id value
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //get one pizza by id
    //desctructuring the params from the req because it's all we need to fulfill this request
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'pizza not found with this id.' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create pizza
    //destructuring the body from Express.js 'req', because we don't need any of the other data!
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //update pizza by id
    //find a single document we want to update, then updates and returns the updated document. if we don't set the third paramter( { new: true } ) then it will return the original document. setting this to true tells mongoose to return the new version of the document.
    updatePizza({ params, body }, res) {
        Pizza.findByIdAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id.' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete pizza
    //find the document and delete it from the database
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id.' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;