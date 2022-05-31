/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  LotteryFactory,
  LotteryFactoryInterface,
} from "../LotteryFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "LotteryCreate",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "createLottery",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getMyLotteries",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "lotteries",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "lottery",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalLottery",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611513806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80634770b40f1461005c57806392240fbb1461008c578063a2dc15b7146100f0578063d5c6c5cc14610105578063d83c05e21461011c575b600080fd5b61006f61006a36600461036b565b61013c565b6040516001600160a01b0390911681526020015b60405180910390f35b6100ca61009a366004610395565b60016020819052600091825260409091208054918101546002909101546001600160a01b03928316929091169083565b604080516001600160a01b03948516815293909216602084015290820152606001610083565b6101036100fe36600461036b565b610174565b005b61010e60005481565b604051908152602001610083565b61012f61012a366004610395565b6102cc565b60405161008391906103b7565b6002602052816000526040600020818154811061015857600080fd5b6000918252602090912001546001600160a01b03169150829050565b6000828260405161018490610342565b6001600160a01b0390921682526020820152604001604051809103906000f0801580156101b5573d6000803e3d6000fd5b5060405163f2fde38b60e01b81523360048201529091506001600160a01b0382169063f2fde38b90602401600060405180830381600087803b1580156101fa57600080fd5b505af115801561020e573d6000803e3d6000fd5b505060408051606081018252338082526001600160a01b0388811660208085018281528587018b81528a8516600081815260018086528a822099518a549089166001600160a01b0319918216178b5594518a820180549190991690861617909755915160029889015586825296835287812080549586018155815291822090930180549093169094179091559251879550929350917f340e74dc6e2fe67a3694f4d8999e0d3efce95a43b61c5892556f36c72e1ced489190a4505050565b6001600160a01b03811660009081526002602090815260409182902080548351818402810184019094528084526060939283018282801561033657602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610318575b50505050509050919050565b6110d98061040583390190565b80356001600160a01b038116811461036657600080fd5b919050565b6000806040838503121561037e57600080fd5b6103878361034f565b946020939093013593505050565b6000602082840312156103a757600080fd5b6103b08261034f565b9392505050565b6020808252825182820181905260009190848201906040850190845b818110156103f85783516001600160a01b0316835292840192918401916001016103d3565b5090969550505050505056fe608060405234801561001057600080fd5b506040516110d93803806110d983398101604081905261002f916100b0565b61003833610060565b600255600180546001600160a01b0319166001600160a01b03929092169190911790556100ea565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100c357600080fd5b82516001600160a01b03811681146100da57600080fd5b6020939093015192949293505050565b610fe0806100f96000396000f3fe6080604052600436106100dd5760003560e01c80638b5b9ccc1161007f578063a035b1fe11610059578063a035b1fe14610248578063a948915b1461025e578063f2fde38b14610274578063f71d96cb1461029457600080fd5b80638b5b9ccc146101f35780638da5cb5b146102155780639e673fbd1461023357600080fd5b8063302be369116100bb578063302be3691461016c5780633357747d1461019c578063715018a6146101c95780637365870b146101e057600080fd5b806312065fe0146100e257806312fa6feb1461010a5780633013ce2914610134575b600080fd5b3480156100ee57600080fd5b506100f76102b4565b6040519081526020015b60405180910390f35b34801561011657600080fd5b506004546101249060ff1681565b6040519015158152602001610101565b34801561014057600080fd5b50600154610154906001600160a01b031681565b6040516001600160a01b039091168152602001610101565b34801561017857600080fd5b50610124610187366004610d8e565b60066020526000908152604090205460ff1681565b3480156101a857600080fd5b506100f76101b7366004610d8e565b60076020526000908152604090205481565b3480156101d557600080fd5b506101de610326565b005b6101de6101ee366004610db7565b610365565b3480156101ff57600080fd5b5061020861051d565b6040516101019190610dd0565b34801561022157600080fd5b506000546001600160a01b0316610154565b34801561023f57600080fd5b506101de61057f565b34801561025457600080fd5b506100f760025481565b34801561026a57600080fd5b506100f760035481565b34801561028057600080fd5b506101de61028f366004610d8e565b6109a2565b3480156102a057600080fd5b506101546102af366004610db7565b610a3d565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156102fd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103219190610e1d565b905090565b6000546001600160a01b031633146103595760405162461bcd60e51b815260040161035090610e36565b60405180910390fd5b6103636000610a67565b565b60045460ff16156103b15760405162461bcd60e51b8152602060048201526016602482015275131bdd1d195c9e4e88131bdd1d195c9e48195b99195960521b6044820152606401610350565b600554606410156104105760405162461bcd60e51b8152602060048201526024808201527f4c6f74746572793a204d6178206e756d626572206f6620706c617965727320726044820152630cac2c6d60e31b6064820152608401610350565b6000546001600160a01b0316330361046a5760405162461bcd60e51b815260206004820152601a60248201527f4c6f74746572793a204f776e65722063616e6e6f7420706c61790000000000006044820152606401610350565b600254600154610489916001600160a01b039091169033903090610ab7565b336000818152600660209081526040808320805460ff19166001908117909155600790925280832085905560058054928301815583527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db090910180546001600160a01b03191684179055518392917fc0ae20ffbb1eca06a840c35912bdb9f8e6e1fad1f028c875be0ddf54d480d71e91a350565b6060600580548060200260200160405190810160405280929190818152602001828054801561057557602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610557575b5050505050905090565b60045460ff16156105cb5760405162461bcd60e51b8152602060048201526016602482015275131bdd1d195c9e4e88131bdd1d195c9e48195b99195960521b6044820152606401610350565b6000546001600160a01b031633146105f55760405162461bcd60e51b815260040161035090610e36565b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa15801561063e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106629190610e1d565b90506000610671606443610e81565b600381905590506000805b6005548110156106eb5760006005828154811061069b5761069b610e95565b60009182526020808320909101546001600160a01b031680835260079091526040909120549091508490036106d857826106d481610ec1565b9350505b50806106e381610ec1565b91505061067c565b50801561085f576001546040516370a0823160e01b815230600482015260009161077d918491610777916064918391605a916001600160a01b0316906370a0823190602401602060405180830381865afa15801561074d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107719190610e1d565b90610b17565b90610b2a565b905060005b60055481101561085c576000600582815481106107a1576107a1610e95565b60009182526020808320909101546001600160a01b031680835260079091526040909120549091508590036108495760015460405163a9059cbb60e01b81526001600160a01b038381166004830152602482018690529091169063a9059cbb906044016020604051808303816000875af1158015610823573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108479190610eda565b505b508061085481610ec1565b915050610782565b50505b6001546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156108a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108cc9190610e1d565b6001549091506001600160a01b031663a9059cbb6108f26000546001600160a01b031690565b6040516001600160e01b031960e084901b1681526001600160a01b039091166004820152602481018490526044016020604051808303816000875af115801561093f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109639190610eda565b506004805460ff1916600117905560405143907f041c00c1c75f7573b13bb33aec26bad3862482c8a88d1598c1d209c3f4b1b62690600090a250505050565b6000546001600160a01b031633146109cc5760405162461bcd60e51b815260040161035090610e36565b6001600160a01b038116610a315760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610350565b610a3a81610a67565b50565b60058181548110610a4d57600080fd5b6000918252602090912001546001600160a01b0316905081565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b604080516001600160a01b0385811660248301528416604482015260648082018490528251808303909101815260849091019091526020810180516001600160e01b03166323b872dd60e01b179052610b11908590610b36565b50505050565b6000610b238284610efc565b9392505050565b6000610b238284610f1b565b6000610b8b826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316610c0d9092919063ffffffff16565b805190915015610c085780806020019051810190610ba99190610eda565b610c085760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610350565b505050565b6060610c1c8484600085610c24565b949350505050565b606082471015610c855760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610350565b6001600160a01b0385163b610cdc5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610350565b600080866001600160a01b03168587604051610cf89190610f5b565b60006040518083038185875af1925050503d8060008114610d35576040519150601f19603f3d011682016040523d82523d6000602084013e610d3a565b606091505b5091509150610d4a828286610d55565b979650505050505050565b60608315610d64575081610b23565b825115610d745782518084602001fd5b8160405162461bcd60e51b81526004016103509190610f77565b600060208284031215610da057600080fd5b81356001600160a01b0381168114610b2357600080fd5b600060208284031215610dc957600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b81811015610e115783516001600160a01b031683529284019291840191600101610dec565b50909695505050505050565b600060208284031215610e2f57600080fd5b5051919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601260045260246000fd5b600082610e9057610e90610e6b565b500690565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060018201610ed357610ed3610eab565b5060010190565b600060208284031215610eec57600080fd5b81518015158114610b2357600080fd5b6000816000190483118215151615610f1657610f16610eab565b500290565b600082610f2a57610f2a610e6b565b500490565b60005b83811015610f4a578181015183820152602001610f32565b83811115610b115750506000910152565b60008251610f6d818460208701610f2f565b9190910192915050565b6020815260008251806020840152610f96816040850160208701610f2f565b601f01601f1916919091016040019291505056fea2646970667358221220182c06cda1885e1f0a62ff60453140962e25eba11bbe51030be700bf95d5e13164736f6c634300080e0033a26469706673582212202f191e2a54a2ccc6bfc79b993e5374d884302986e4c3116d82bcfca2fd5d400664736f6c634300080e0033";

export class LotteryFactory__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<LotteryFactory> {
    return super.deploy(overrides || {}) as Promise<LotteryFactory>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): LotteryFactory {
    return super.attach(address) as LotteryFactory;
  }
  connect(signer: Signer): LotteryFactory__factory {
    return super.connect(signer) as LotteryFactory__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LotteryFactoryInterface {
    return new utils.Interface(_abi) as LotteryFactoryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): LotteryFactory {
    return new Contract(address, _abi, signerOrProvider) as LotteryFactory;
  }
}