const deleteItemsByCriteria = async (criteria, callerId) => validate(criteria).then(proceed);

const validate = async (criteria) => criteria ? criteria : reject();

const proceed = (criteria) => {
  return STUB_ITEMS[criteria] || 0;
};

const STUB_ITEMS = { MATCH: 1 };

const reject = () => { throw new Error() };

module.exports = { deleteItemsByCriteria };
