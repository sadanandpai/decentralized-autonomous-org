// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoUser {
  struct User {
    string firstName;
    string lastName;
    string email;
  }

  event NewUserAdded(address indexed userAddress, string firstName, string lastName, string email);

  mapping(address => User) public userDetails;

  function addUserDetails(
    string calldata firstName,
    string calldata lastName,
    string calldata email
  ) public {
    // Check if user already exists
    require(bytes(userDetails[msg.sender].firstName).length == 0, 'User already exists');

    // Add the new user
    userDetails[msg.sender] = User(firstName, lastName, email);

    // Emit the NewUserAdded event
    emit NewUserAdded(msg.sender, firstName, lastName, email);
  }

  function updateUserDetails(
    string calldata firstName,
    string calldata lastName,
    string calldata email
  ) public {
    User storage user = userDetails[msg.sender];
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
  }
}
