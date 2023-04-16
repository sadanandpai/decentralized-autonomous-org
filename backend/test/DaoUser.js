const { time, loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('User', function () {
  let daoUser;
  async function deployUserFixture() {
    const daoUser = await ethers.getContractFactory('DaoUser');
    return await daoUser.deploy();
  }

  it('should get deployed', async function () {
    daoUser = await loadFixture(deployUserFixture);
    expect(daoUser).not.to.be.undefined;
  });

  beforeEach(async function () {
    const DaoUser = await ethers.getContractFactory('DaoUser');
    daoUser = await DaoUser.deploy();
    await daoUser.deployed();
  });

  describe('addUserDetails', function () {
    it('should add a new user', async function () {
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'johndoe@example.com';
      const pic = 'imagepath';
      await daoUser.addUserDetails(firstName, lastName, email, pic);
      const user = await daoUser.userDetails(await ethers.provider.getSigner(0).getAddress());
      expect(user.userAddress).to.equal(await ethers.provider.getSigner(0).getAddress());
      expect(user.firstName).to.equal(firstName);
      expect(user.lastName).to.equal(lastName);
      expect(user.email).to.equal(email);
      expect(user.pic).to.equal(pic);
    });

    it('should not add a new user with the same address', async function () {
      const firstName1 = 'John';
      const lastName1 = 'Doe';
      const email1 = 'johndoe@example.com';
      const pic1 = 'imagepath';
      const firstName2 = 'Jane';
      const lastName2 = 'Doe';
      const email2 = 'janedoe@example.com';
      const pic2 = 'imagepath';
      await daoUser.addUserDetails(firstName1, lastName1, email1, pic1);
      await expect(daoUser.addUserDetails(firstName2, lastName2, email2, pic2)).to.be.revertedWith(
        'User already exists'
      );
    });
  });

  describe('updateUserDetails', function () {
    it("should update the user's details", async function () {
      const firstName1 = 'John';
      const lastName1 = 'Doe';
      const email1 = 'johndoe@example.com';
      const pic1 = 'imagepath';
      const firstName2 = 'Jane';
      const lastName2 = 'Doe';
      const email2 = 'janedoe@example.com';
      const pic2 = 'imagepath';
      await daoUser.addUserDetails(firstName1, lastName1, email1, pic1);
      await daoUser.updateUserDetails(firstName2, lastName2, email2, pic2);
      const user = await daoUser.userDetails(await ethers.provider.getSigner(0).getAddress());
      expect(user.userAddress).to.equal(await ethers.provider.getSigner(0).getAddress());
      expect(user.firstName).to.equal(firstName2);
      expect(user.lastName).to.equal(lastName2);
      expect(user.email).to.equal(email2);
      expect(user.pic).to.equal(pic2);
    });
  });
});
