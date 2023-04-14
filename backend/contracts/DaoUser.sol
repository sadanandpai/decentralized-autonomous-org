// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract DaoUser {
    struct User {
        address userAddress;
        string firstName;
        string lastName;
        bool isActive;
    }

    uint public usersCount = 0;
    mapping(address => User) public Users;

    function createUser(
        string calldata firstName,
        string calldata lastName
    ) public {
        User memory user = User(msg.sender, firstName, lastName, true);
        Users[msg.sender] = user;

        usersCount++;
    }

    modifier isAuthorized() {
        require(
            Users[msg.sender].userAddress !=
                0x0000000000000000000000000000000000000000,
            "User is not a part of the DAO"
        );
        _;
    }

    function updateUser(
        string calldata firstName,
        string calldata lastName
    ) public view isAuthorized {
        User memory user = Users[msg.sender];
        user.firstName = firstName;
        user.lastName = lastName;
    }
}
