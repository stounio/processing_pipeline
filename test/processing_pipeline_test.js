const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

const { deleteItemsByCriteria } = require('../src/processing_pipeline');

describe('Delete items by criteria', () => {
  it('should reject the call by default', async () => {
    expect(deleteItemsByCriteria()).to.be.rejected;
  });

  it('should delete zero one items when the criteria does not match', async () => {
    const result = await deleteItemsByCriteria('NO_MATCH');
    expect(result).to.eq(0);
  });

  it('should delete one item when the criteria matches', async () => {
    const result = await deleteItemsByCriteria('MATCH');
    expect(result).to.eq(1);
  });
});
