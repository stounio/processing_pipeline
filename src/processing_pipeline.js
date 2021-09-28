const { retrieveItems } = require('./data_store');

const deleteItemsByCriteria = async (criteria, callerId) => validate(criteria).then(proceed);

const validate = async (criteria) => criteria ? criteria : reject();

const proceed = (criteria) => {
  return retrieveItems(criteria).length;
};

const reject = () => { throw new Error() };

module.exports = { deleteItemsByCriteria };
