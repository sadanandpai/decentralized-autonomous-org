// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoUser {
  struct User {
    address userAddress;
    string firstName;
    string lastName;
    string email;
    string pic;
  }

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

  function addUserDetails(
    string calldata firstName,
    string calldata lastName,
    string calldata email,
    string calldata pic
  ) public {
    // Check if user already exists
    require(bytes(userDetails[msg.sender].firstName).length == 0, 'User already exists');

    // Add the new user
    userDetails[msg.sender] = User(msg.sender, firstName, lastName, email, pic);
    userAddressList.push(msg.sender);
    userCount++;

    // Emit the NewUserAdded event
    emit NewUserAdded(msg.sender, firstName, lastName, email, pic);
  }

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

  function getAllUsers() public view returns (User[] memory) {
    User[] memory users = new User[](userCount);

    for (uint256 i = 0; i < userCount; i++) {
      address userAddress = userAddressList[i];
      User storage user = userDetails[userAddress];
      users[i] = user;
    }

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
