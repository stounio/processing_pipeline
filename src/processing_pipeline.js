const deleteItemsByCriteria = async (criteria, callerId) => criteria ? proceed() : reject();

const proceed = () => 0;

const reject = () => { throw new Error() };

module.exports = { deleteItemsByCriteria };
