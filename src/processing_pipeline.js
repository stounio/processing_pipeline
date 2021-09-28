const { retrieveItems } = require('./data_store');

const deleteItemsByCriteria = async (criteria, callerId) => {
  return validate(criteria)
    .then(retrieveItems)
    .then((candidates) => filterUnauthorisedItems(candidates, callerId))
    .then((authorisedItems) => authorisedItems.length);
}

const validate = async (criteria) => criteria ? criteria : reject();

const filterUnauthorisedItems = (items, callerId) => {
  return items.filter((item) => {
    const { ownerId } = item;
    return ownerId === callerId;
  });
};

const reject = () => { throw new Error() };

module.exports = { deleteItemsByCriteria };
