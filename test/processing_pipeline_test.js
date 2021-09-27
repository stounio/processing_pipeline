const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { expect } = chai;

chai.use(chaiAsPromised);

const { deleteItemsByCriteria } = require('../src/processing_pipeline');

describe('Delete items by criteria', () => {
  it('should reject the call by default', async () => {
    expect(deleteItemsByCriteria()).to.be.rejected;
  });
});
