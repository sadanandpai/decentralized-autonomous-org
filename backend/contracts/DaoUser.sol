// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

/**
 * @title DAO User Registry
 * @dev A smart contract that implements a DAO user registry.
 */
contract DaoUser {
  struct User {
    address userAddress;
    string firstName;
    string lastName;
    string email;
    string pic;
  }

  /**
   * @dev Emitted when a new user is added to the registry.
   * @param userAddress The Ethereum address of the new user.
   * @param firstName The first name of the new user.
   * @param lastName The last name of the new user.
   * @param email The email of the new user.
   * @param pic The profile picture of the new user.
   */
  event NewUserAdded(
    address indexed userAddress,
    string firstName,
    string lastName,
    string email,
    string pic
  );

  mapping(address => User) public userDetails;
  address[] private userAddressList;
  uint256 public userCount;

  /**
   * @dev Adds the details of a new user to the registry.
   * @param firstName The first name of the new user.
   * @param lastName The last name of the new user.
   * @param email The email of the new user.
   * @param pic The profile picture of the new user.
   */
  function addUserDetails(
    string calldata firstName,
    string calldata lastName,
    string calldata email,
    string calldata pic
  ) public payable {
    //validations
    require(bytes(firstName).length > 0, 'First name is required');
    require(bytes(lastName).length > 0, 'Last name is required');
    require(bytes(email).length > 0, 'Email is required');
    require(bytes(pic).length > 0, 'Pic is required');
    require(bytes(email).length <= 254, 'Email must be less than or equal to 254 characters');
    require(
      bytes(firstName).length <= 50,
      'First name must be less than or equal to 50 characters'
    );
    require(bytes(lastName).length <= 50, 'Last name must be less than or equal to 50 characters');
    require(msg.value == 0.1 * 10 ** 18, 'Enrollment charge should be 0.1 ETH');

    // Check if user already exists
    require(bytes(userDetails[msg.sender].firstName).length == 0, 'User already exists');

    // Add the new user
    userDetails[msg.sender] = User(msg.sender, firstName, lastName, email, pic);
    userAddressList.push(msg.sender);
    userCount++;

    // Emit the NewUserAdded event
    emit NewUserAdded(msg.sender, firstName, lastName, email, pic);
  }

  /**
   * @dev Updates the details of an existing user in the registry.
   * @param firstName The new first name of the user.
   * @param lastName The new last name of the user.
   * @param email The new email of the user.
   * @param pic The new profile picture of the user.
   */
  function updateUserDetails(
    string calldata firstName,
    string calldata lastName,
    string calldata email,
    string calldata pic
  ) public {
    User storage user = userDetails[msg.sender];
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.pic = pic;
  }
  /**
   * @dev Returns an array of all registered users.
   * @return An array of User struct representing all registered users.
   */  
  function getAllUsers() public view returns (User[] memory) {
    // Initialize an array of users with the size of userCount
    User[] memory users = new User[](userCount);
    // Loop through each user in the userAddressList and retrieve the user details from userDetails mapping
    for (uint256 i = 0; i < userCount; i++) {
      address userAddress = userAddressList[i];
      User storage user = userDetails[userAddress];
      users[i] = user;
    }
    // Return the array of users
    return users;
  }

  function isUserAddressPresent(address userAddress) external view returns (bool) {
    if (bytes(userDetails[userAddress].firstName).length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
