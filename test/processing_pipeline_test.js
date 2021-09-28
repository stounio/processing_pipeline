const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

const proxyquire = require('proxyquire');

const retrieveItemsStub = (criteria) => ITEM_STUBS[criteria];

const ITEM_STUBS = {
  NO_MATCH: [],
  MATCH: [{ ownerId: 'LEGIT' }],
  MATCH_MANY: [{ ownerId: 'LEGIT' }, { ownerId: 'LEGIT' }]
}

const { deleteItemsByCriteria } = proxyquire('../src/processing_pipeline', { './data_store': { retrieveItems: retrieveItemsStub } });

describe('Delete items by criteria', () => {
  it('should reject the call by default', async () => {
    expect(deleteItemsByCriteria()).to.be.rejected;
  });

  it('should not delete items when the criteria does not match', async () => {
    const result = await deleteItemsByCriteria('NO_MATCH', 'LEGIT');
    expect(result).to.eq(0);
  });

  it('should delete one item when the criteria matches', async () => {
    const result = await deleteItemsByCriteria('MATCH', 'LEGIT');
    expect(result).to.eq(1);
  });

  it('should delete all items when the criteria matches', async () => {
    const result = await deleteItemsByCriteria('MATCH_MANY', 'LEGIT');
    expect(result).to.eq(2);
  });

  it('should not delete items when the caller is not authorised', async () => {
    const result = await deleteItemsByCriteria('MATCH_MANY', 'PIRATE');
    expect(result).to.eq(0);
  });
});
