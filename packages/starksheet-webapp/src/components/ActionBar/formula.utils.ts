import BN from "bn.js";
import { constants } from "starknet";
import { getSelectorFromName } from "starknet/dist/utils/hash";
import { toBN } from "starknet/utils/number";
import { CellData } from "../../contexts/CellValuesContext";
import { ContractAbi } from "../../utils/abiUtils";

export const RC_BOUND = toBN(2).pow(toBN(128));

const contractCallRegex =
  /(?<contractAddress>0x[a-f0-9]+)\.(?<selector>[a-z_0-9]+)\((?<args>[a-z0-9; ]*)\)/i;
const cellNameRegex = /^[a-z]\d+$/i;

export function toPlainTextFormula(
  { contractAddress, selector, calldata, abi }: CellData & { abi: ContractAbi },
  cellNames: string[]
): string {
  if (contractAddress.toString() === RC_BOUND.toString()) {
    return selector.gte(RC_BOUND)
      ? "0x" + selector.toString(16)
      : selector.toString();
  }

  const contractHexString = "0x" + contractAddress.toString(16);
  const selectorHexString = "0x" + selector.toString(16);
  const operator = abi[selectorHexString]?.name || selectorHexString;

  const args = abi[selectorHexString]?.inputs[0]?.name?.endsWith("_len")
    ? calldata.slice(1)
    : calldata;

  return `${contractHexString}.${operator}(${args
    .map((arg) =>
      arg.mod(toBN(2)).toNumber() === 0
        ? arg.gte(RC_BOUND)
          ? "0x" + arg.div(toBN(2)).toString(16)
          : arg.div(toBN(2))
        : cellNames[arg.sub(toBN(1)).div(toBN(2)).toNumber()]
    )
    .join(";")})`;
}

export function parse(formula: string): CellData | null {
  const formulaMatch = formula.match(contractCallRegex);
  if (!formulaMatch?.groups) {
    if (!formula.match(/^(0x)?[a-f0-9]+$/i)) {
      return null;
    }
    return {
      contractAddress: RC_BOUND,
      selector: toBN(formula),
      calldata: [],
    };
  }
  const args = formulaMatch.groups.args
    .toLowerCase()
    .split(";")
    .map(parseArg)
    .filter((arg) => arg !== undefined) as BN[];

  return {
    contractAddress: toBN(formulaMatch.groups.contractAddress),
    selector: toBN(getSelectorFromName(formulaMatch.groups.selector)),
    calldata: args,
  };
}

const parseArg = (arg: string): BN | undefined => {
  if (arg.match(/^[a-z]\d+$/i)) {
    const col = arg.charCodeAt(0) - "a".charCodeAt(0);
    const row = parseInt(arg.slice(1)) - 1;
    const tokenId = col + row * 15;
    return toBN(2 * tokenId + 1);
  }
  if (arg.match(/^\d+$/i)) return toBN(arg).mul(toBN(2));
  return undefined;
};

export const isDependency = (arg: BN): boolean =>
  arg.mod(toBN(2)).toNumber() !== 0;

export function getDependencies(calldata: BN[]): number[] {
  return calldata.filter(isDependency).map((data) => (data.toNumber() - 1) / 2);
}

export function getError(
  cellId: number,
  cellData: CellData | null,
  newDependencies: number[]
): string | null {
  if (cellData) {
    if (newDependencies.includes(cellId)) {
      return `Invalid formula: circular dependency`;
    }
    return null;
  }

  return "Invalid formula format";
}

export function buildFormulaDisplay(formula: string): string {
  const operator = formula.match(contractCallRegex);

  let result = formula;

  if (operator?.groups) {
    result = result.replace(
      operator.groups.contractAddress,
      `<span class="operator">${operator.groups.contractAddress}</span>`
    );
    result = result.replace(
      operator.groups.selector,
      `<span class="operator">${operator.groups.selector}</span>`
    );

    operator.groups.args
      .split(";")
      .filter((arg) => arg.match(cellNameRegex))
      .forEach((name) => {
        result = result.replace(name, `<span class="cell">${name}</span>`);
      });
  }

  return result;
}

export function getValue(value: BN): BN {
  return value
    .add(toBN(constants.FIELD_PRIME).div(toBN(2)).abs())
    .mod(toBN(constants.FIELD_PRIME))
    .sub(toBN(constants.FIELD_PRIME).div(toBN(2)).abs());
}
