// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DaoUser {
    struct User {
        string name;
        string email;

    }

    event NewUserAdded(address indexed userAddress, string name, string email);

    mapping(address => User) public userDetails;

    function addUserDetails(string memory _name, string memory _email) public {
        // Check if user already exists
        require(bytes(userDetails[msg.sender].name).length == 0, "User already exists");

        // Add the new user
        userDetails[msg.sender] = User(_name, _email);

        // Emit the NewUserAdded event
        emit NewUserAdded(msg.sender, _name, _email);
    }

    function updateUserDetails(string memory _name, string memory _email) public {
        User storage user = userDetails[msg.sender];
        user.name = _name;
        user.email = _email;
    }


}
