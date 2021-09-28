const { retrieveItems, deleteItem } = require('./data_store');

const deleteItemsByCriteria = async (criteria, callerId) => {
  return validate(criteria)
    .then(retrieveItems)
    .then((candidates) => filterUnauthorisedItems(candidates, callerId))
    .then((authorisedItems) => deleteAllItems(authorisedItems))
    .then((deletedItemIds) => deletedItemIds.length);
}

const validate = async (criteria) => criteria ? criteria : reject();

const filterUnauthorisedItems = (items, callerId) => {
  return items.filter((item) => {
    const { ownerId } = item;
    return ownerId === callerId;
  });
};

const deleteAllItems = async (items) => {
  return Promise.all(items.map((item) => {
    const { id } = item;
    return deleteItem(id);
  }));
};

const reject = () => { throw new Error() };

module.exports = { deleteItemsByCriteria };
