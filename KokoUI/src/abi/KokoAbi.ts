export const KokoAbi = [
  // constructor
  'constructor()',

  // errors
  'error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)',
  'error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)',
  'error ERC20InvalidApprover(address approver)',
  'error ERC20InvalidReceiver(address receiver)',
  'error ERC20InvalidSender(address sender)',
  'error ERC20InvalidSpender(address spender)',
  'error OwnableInvalidOwner(address owner)',
  'error OwnableUnauthorizedAccount(address account)',

  // events
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event TokensClaimed(address indexed user, uint256 amount)',
  'event TokensMinted(address indexed to, uint256 amount)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',

  // read functions
  'function CLAIM_AMOUNT() view returns (uint256)',
  'function CLAIM_INTERVAL() view returns (uint256)',
  'function MAX_SUPPLY() view returns (uint256)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'function decimals() pure returns (uint8)',
  'function lastClaimTime(address) view returns (uint256)',
  'function name() view returns (string)',
  'function owner() view returns (address)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',

  // write functions
  'function approve(address spender, uint256 value) returns (bool)',
  'function mint(address to, uint256 amount)',
  'function renounceOwnership()',
  'function requestToken()',
  'function transfer(address to, uint256 value) returns (bool)',
  'function transferFrom(address from, address to, uint256 value) returns (bool)',
  'function transferOwnership(address newOwner)',
]
