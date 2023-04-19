const { time, loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('User', function () {
  let daoUser;

  describe('addUserDetails', function () {
    beforeEach(async function () {
      const DaoUser = await ethers.getContractFactory('DaoUser');
      daoUser = await DaoUser.deploy();
      await daoUser.deployed();
    });

    it('should get deployed', async function () {
      expect(daoUser).not.to.be.undefined;
    });

    it("should revert if any field is missing", async function () {
      await expect(
        daoUser.addUserDetails("", "Doe", "john.doe@example.com", "https://example.com/john", {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("First name is required");

      await expect(
        daoUser.addUserDetails("John", "", "john.doe@example.com", "https://example.com/john", {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("Last name is required");

      await expect(
        daoUser.addUserDetails("John", "Doe", "", "https://example.com/john", {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("Email is required");

      await expect(
        daoUser.addUserDetails("John", "Doe", "john.doe@example.com", "", {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("Pic is required");

      await expect(
        daoUser.addUserDetails("J".repeat(51), "Doe", "john.doe@example.com", "https://example.com/john", {
          value: ethers.utils.parseEther("0.1"),
        })
      ).to.be.revertedWith("First name must be less than or equal to 50 characters");
    });

    it('should add a new user', async function () {
      const firstName = 'John';
      const lastName = 'Doe';
      const email = 'johndoe@example.com';
      const pic = 'imagepath';
      //call add user details function with valid input parameters and send 0.1 ether
      const tx = await daoUser.addUserDetails(firstName, lastName, email, pic, { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
      
      // wait for the transaction to be mined
      await tx.wait();

      // check that the user's details were added correctly
      const user = await daoUser.userDetails(await ethers.provider.getSigner(0).getAddress());
      expect(user.userAddress).to.equal(await ethers.provider.getSigner(0).getAddress());
      expect(user.firstName).to.equal(firstName);
      expect(user.lastName).to.equal(lastName);
      expect(user.email).to.equal(email);
      expect(user.pic).to.equal(pic);

      // check that the user count has increased by 1
      expect(await daoUser.userCount()).to.equal(1);
    });

    it('should not add a new user with the same address', async function () {

      await daoUser.addUserDetails('John', 'Doe', 'johndoe@example.com', 'imagepath', { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
      await expect(daoUser.addUserDetails('Jane', 'Doe', 'janedoe@example.com', 'imagepath', { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 })).to.be.revertedWith(
        'User already exists'
      );
      
    });

    it("should not add a user without sending 0.1 ether", async function() {
      // try to add a user with valid input parameters but without sending 0.1 ether
      await expect(daoUser.addUserDetails("John", "Doe", "johndoe@example.com", "pic.jpg", { gasLimit: 1000000 })).to.be.revertedWith("Enrollment charge should be 0.1 ETH");
  
      // check that the user count is still 0
      expect(await daoUser.userCount()).to.equal(0);
    });
  });

  describe('updateUserDetails', function () {
    beforeEach(async function () {

      // deploy the contract and get owner and user addresses
      [owner, user] = await ethers.getSigners();
      const DaoUser = await ethers.getContractFactory('DaoUser');
      daoUser = await DaoUser.deploy();
      await daoUser.deployed();

      // add a user to the contract
      await daoUser.addUserDetails("John", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
    });

    it("should update the user's details", async function () {
      
      const firstName2 = 'Jane';
      const lastName2 = 'Doe';
      const email2 = 'janedoe@example.com';
      const pic2 = 'imagepath';
      // call the function with new input parameters
      await daoUser.updateUserDetails(firstName2, lastName2, email2, pic2);
      // check that the user's details were updated correctly
      const user = await daoUser.userDetails(owner.address);
      expect(user.userAddress).to.equal(await ethers.provider.getSigner(0).getAddress());
      expect(user.firstName).to.equal(firstName2);
      expect(user.lastName).to.equal(lastName2);
      expect(user.email).to.equal(email2);
      expect(user.pic).to.equal(pic2);
    });

    it("should not update the user's details if they don't exist", async function() {
      
      // try to update the details of a user that doesn't exist
      await expect(daoUser.connect(user).updateUserDetails("Jane", "Doe", "janedoe@example.com", "newpic.jpg")).to.not.be.reverted;
  
      // check that the user's details were not updated
      const currentUser = await daoUser.userDetails(owner.address);
      expect(currentUser.firstName).to.equal("John");
      expect(currentUser.lastName).to.equal("Doe");
      expect(currentUser.email).to.equal("johndoe@example.com");
      expect(currentUser.pic).to.equal("pic.jpg");
    });
  });

  describe('getAllUsers', function () {
    beforeEach(async function () {

      // deploy the contract and get owner and user addresses
      [owner, user] = await ethers.getSigners();
      const DaoUser = await ethers.getContractFactory('DaoUser');
      daoUser = await DaoUser.deploy();
      await daoUser.deployed();

      // add a user to the contract
      await daoUser.addUserDetails("John", "Doe", "johndoe@example.com", "pic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
    });

    it("should return an array of all registered users", async function() {
      // register a new user
      await daoUser.connect(user).addUserDetails("Jane", "Doe", "janedoe@example.com", "newpic.jpg", { value: ethers.utils.parseEther("0.1"), gasLimit: 1000000 });
    
      // get all users
      const allUsers = await daoUser.getAllUsers();
    
      // check that the length of the array matches the number of registered users
      expect(allUsers.length).to.equal(2);
    
      // check that the array contains the expected users
      expect(allUsers[0].firstName).to.equal("John");
      expect(allUsers[0].lastName).to.equal("Doe");
      expect(allUsers[0].email).to.equal("johndoe@example.com");
      expect(allUsers[0].pic).to.equal("pic.jpg");
    
      expect(allUsers[1].firstName).to.equal("Jane");
      expect(allUsers[1].lastName).to.equal("Doe");
      expect(allUsers[1].email).to.equal("janedoe@example.com");
      expect(allUsers[1].pic).to.equal("newpic.jpg");
    });

    it("should return true if a user with the given address is registered", async function() {
      // check that the owner's address is registered
      const isOwnerRegistered = await daoUser.isUserAddressPresent(owner.address);
      expect(isOwnerRegistered).to.be.true;
    
      // check that the user's address is not registered
      const isUserRegistered = await daoUser.isUserAddressPresent(user.address);
      expect(isUserRegistered).to.be.false;
    });
  });
});
