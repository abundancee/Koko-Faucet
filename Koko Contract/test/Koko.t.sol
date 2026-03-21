// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Koko.sol";

contract KokoTokenTest is Test {
    KokoToken token;
    address owner;
    address user1;
    address user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        
        token = new KokoToken();
    }

    function test_InitialState() public view {
        assertEq(token.name(), "Koko");
        assertEq(token.symbol(), "KO");
        assertEq(token.totalSupply(), 0);
        assertEq(token.MAX_SUPPLY(), 10_000_000 * 10 ** 18);
    }

    function test_RequestTokenFirstTime() public {
        vm.prank(user1);
        token.requestToken();
        
        assertEq(token.balanceOf(user1), 100 * 10 ** 18);
        assertEq(token.lastRequestTime(user1), block.timestamp);
    }

    function test_RequestTokenMultipleUsers() public {
        vm.prank(user1);
        token.requestToken();
        
        vm.prank(user2);
        token.requestToken();
        
        assertEq(token.balanceOf(user1), 100 * 10 ** 18);
        assertEq(token.balanceOf(user2), 100 * 10 ** 18);
        assertEq(token.totalSupply(), 200 * 10 ** 18);
    }

    function test_RequestTokenCooldown() public {
        vm.prank(user1);
        token.requestToken();
        
        vm.prank(user1);
        vm.expectRevert("Must wait 24 hours between requests");
        token.requestToken();
    }

    function test_RequestTokenAfterCooldown() public {
        vm.prank(user1);
        token.requestToken();
        
        uint256 firstRequestTime = block.timestamp;
        
        vm.warp(firstRequestTime + 24 hours + 1);
        
        vm.prank(user1);
        token.requestToken();
        
        assertEq(token.balanceOf(user1), 200 * 10 ** 18);
        assertEq(token.lastRequestTime(user1), firstRequestTime + 24 hours + 1);
    }

    function test_RequestTokenJustBeforeCooldown() public {
        vm.prank(user1);
        token.requestToken();
        
        uint256 firstRequestTime = block.timestamp;
        
        vm.warp(firstRequestTime + 24 hours - 1);
        
        vm.prank(user1);
        vm.expectRevert("Must wait 24 hours between requests");
        token.requestToken();
    }

    function test_MintByOwner() public {
        token.mint(user1, 1000 * 10 ** 18);
        
        assertEq(token.balanceOf(user1), 1000 * 10 ** 18);
        assertEq(token.totalSupply(), 1000 * 10 ** 18);
    }

    function test_MintMultipleTimes() public {
        token.mint(user1, 500 * 10 ** 18);
        token.mint(user2, 300 * 10 ** 18);
        token.mint(user1, 200 * 10 ** 18);
        
        assertEq(token.balanceOf(user1), 700 * 10 ** 18);
        assertEq(token.balanceOf(user2), 300 * 10 ** 18);
        assertEq(token.totalSupply(), 1000 * 10 ** 18);
    }

    function test_MintExceedsMaxSupply() public {
        vm.expectRevert("Minting exceeds max supply");
        token.mint(user1, 10_000_001 * 10 ** 18);
    }

    function test_MintReachesMaxSupply() public {
        token.mint(user1, 10_000_000 * 10 ** 18);
        
        assertEq(token.totalSupply(), 10_000_000 * 10 ** 18);
        
        vm.expectRevert("Minting exceeds max supply");
        token.mint(user2, 1);
    }

    function test_MintByNonOwner() public {
        vm.prank(user1);
        vm.expectRevert(abi.encodeWithSignature("OwnableUnauthorizedAccount(address)", user1));
        token.mint(user1, 100 * 10 ** 18);
    }

    function test_RequestTokenExceedsMaxSupply() public {
        token.mint(user2, 10_000_000 * 10 ** 18 - 50 * 10 ** 18);
        
        vm.prank(user1);
        vm.expectRevert("Exceeds max supply");
        token.requestToken();
    }

    function test_RequestTokenWithinMaxSupply() public {
        token.mint(user2, 10_000_000 * 10 ** 18 - 100 * 10 ** 18);
        
        vm.prank(user1);
        token.requestToken();
        
        assertEq(token.balanceOf(user1), 100 * 10 ** 18);
        assertEq(token.totalSupply(), 10_000_000 * 10 ** 18);
    }

    function test_MixedMintAndRequest() public {
        token.mint(user1, 500 * 10 ** 18);
        
        vm.prank(user2);
        token.requestToken();
        
        assertEq(token.balanceOf(user1), 500 * 10 ** 18);
        assertEq(token.balanceOf(user2), 100 * 10 ** 18);
        assertEq(token.totalSupply(), 600 * 10 ** 18);
    }

    function test_OwnerCanRequestTokens() public {
        vm.prank(owner);
        token.requestToken();
        
        assertEq(token.balanceOf(owner), 100 * 10 ** 18);
    }

    function test_RequestTokenEmitsEvent() public {
        vm.prank(user1);
        vm.expectEmit(true, false, false, true);
        emit KokoToken.TokenRequested(user1, 100 * 10 ** 18);
        token.requestToken();
    }

    function test_MintEmitsEvent() public {
        vm.expectEmit(true, false, false, true);
        emit KokoToken.TokenMinted(user1, 500 * 10 ** 18);
        token.mint(user1, 500 * 10 ** 18);
    }

    function test_TransferTokens() public {
        token.mint(user1, 500 * 10 ** 18);
        
        vm.prank(user1);
        token.transfer(user2, 200 * 10 ** 18);
        
        assertEq(token.balanceOf(user1), 300 * 10 ** 18);
        assertEq(token.balanceOf(user2), 200 * 10 ** 18);
    }

    function test_ApproveAndTransferFrom() public {
        token.mint(user1, 500 * 10 ** 18);
        
        vm.prank(user1);
        token.approve(user2, 200 * 10 ** 18);
        
        vm.prank(user2);
        token.transferFrom(user1, user2, 200 * 10 ** 18);
        
        assertEq(token.balanceOf(user1), 300 * 10 ** 18);
        assertEq(token.balanceOf(user2), 200 * 10 ** 18);
        assertEq(token.allowance(user1, user2), 0);
    }
}
