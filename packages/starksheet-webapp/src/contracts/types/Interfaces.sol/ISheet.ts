/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export interface ISheetInterface extends utils.Interface {
  functions: {
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "setName(string)": FunctionFragment;
    "setRenderer(address)": FunctionFragment;
    "setSymbol(string)": FunctionFragment;
    "symbol()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "name"
      | "owner"
      | "setName"
      | "setRenderer"
      | "setSymbol"
      | "symbol"
      | "transferOwnership"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "setName", values: [string]): string;
  encodeFunctionData(functionFragment: "setRenderer", values: [string]): string;
  encodeFunctionData(functionFragment: "setSymbol", values: [string]): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setName", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setRenderer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setSymbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ISheet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ISheetInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    name(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    owner(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setName(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setRenderer(
      newRenderer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setSymbol(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    symbol(
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  name(overrides?: Overrides & { from?: string }): Promise<ContractTransaction>;

  owner(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setName(
    newName: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setRenderer(
    newRenderer: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setSymbol(
    newName: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  symbol(
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    name(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    setName(newName: string, overrides?: CallOverrides): Promise<void>;

    setRenderer(newRenderer: string, overrides?: CallOverrides): Promise<void>;

    setSymbol(newName: string, overrides?: CallOverrides): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    name(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    owner(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    setName(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setRenderer(
      newRenderer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setSymbol(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    symbol(overrides?: Overrides & { from?: string }): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    name(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    owner(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setName(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setRenderer(
      newRenderer: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setSymbol(
      newName: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    symbol(
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
