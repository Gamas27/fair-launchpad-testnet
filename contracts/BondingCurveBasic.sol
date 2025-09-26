// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BondingCurveBasic is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant GRADUATION_THRESHOLD = 1000 ether;
    
    address public immutable wldToken;
    
    uint256 public currentPrice;
    uint256 public totalRaisedWLD;
    uint256 public maxSupply;
    bool public isGraduated;
    
    event TokensPurchased(address indexed buyer, uint256 wldAmount, uint256 tokenAmount, uint256 newPrice);
    event Graduated(uint256 totalRaisedWLD, uint256 finalPrice);

    constructor(
        string memory name,
        string memory symbol,
        address _wldToken,
        uint256 _initialPrice,
        uint256 _maxSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        wldToken = _wldToken;
        currentPrice = _initialPrice;
        maxSupply = _maxSupply;
    }

    function buy(uint256 wldAmount) external nonReentrant {
        require(!isGraduated, "Already graduated");
        require(wldAmount > 0, "Amount must be greater than 0");
        
        require(ERC20(wldToken).transferFrom(msg.sender, address(this), wldAmount), "WLD transfer failed");
        
        uint256 tokensToMint = wldAmount / currentPrice;
        require(totalSupply() + tokensToMint <= maxSupply, "Max supply exceeded");

        _mint(msg.sender, tokensToMint);
        totalRaisedWLD += wldAmount;
        currentPrice = currentPrice + (tokensToMint / 1000);

        emit TokensPurchased(msg.sender, wldAmount, tokensToMint, currentPrice);

        if (totalRaisedWLD >= GRADUATION_THRESHOLD) {
            _graduate();
        }
    }

    function _graduate() internal {
        require(!isGraduated, "Already graduated");
        isGraduated = true;
        emit Graduated(totalRaisedWLD, currentPrice);
    }

    function getBondingCurveState() external view returns (uint256, uint256, uint256, bool) {
        return (currentPrice, totalRaisedWLD, totalSupply(), isGraduated);
    }

    function getGraduationProgress() external view returns (uint256) {
        if (totalRaisedWLD >= GRADUATION_THRESHOLD) return 100;
        return (totalRaisedWLD * 100) / GRADUATION_THRESHOLD;
    }
}
