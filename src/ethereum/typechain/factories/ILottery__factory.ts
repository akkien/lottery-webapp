/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILottery, ILotteryInterface } from "../ILottery";

const _abi = [
  {
    inputs: [],
    name: "adminStop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "bet",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
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
  {
    inputs: [],
    name: "getPlayers",
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
];

export class ILottery__factory {
  static readonly abi = _abi;
  static createInterface(): ILotteryInterface {
    return new utils.Interface(_abi) as ILotteryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ILottery {
    return new Contract(address, _abi, signerOrProvider) as ILottery;
  }
}
