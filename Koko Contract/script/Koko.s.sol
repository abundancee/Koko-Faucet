// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/Koko.sol";

contract DeployKokoToken is Script {
    KokoToken public kokoToken;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        kokoToken = new KokoToken();
        
        vm.stopBroadcast();

        logDeployment();
    }

    function logDeployment() internal view {
        console.log("KokoToken deployed at:", address(kokoToken));
        console.log("Token Name:", kokoToken.name());
        console.log("Token Symbol:", kokoToken.symbol());
        console.log("Max Supply:", kokoToken.MAX_SUPPLY() / 1e18, "KOKO");
        console.log("Claim Amount:", kokoToken.CLAIM_AMOUNT() / 1e18, "KOKO");
    }
}
