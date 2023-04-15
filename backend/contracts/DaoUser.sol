// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoUser {
  struct User {
    string name;
    string email;
  }

  mapping(address => User) public userDetails;

  function addUserDetails(string memory _name, string memory _email) public {
    userDetails[msg.sender] = User(_name, _email);
  }

  function updateUserDetails(string memory _name, string memory _email) public {
    User storage user = userDetails[msg.sender];
    user.name = _name;
    user.email = _email;
  }
}
