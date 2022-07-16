import React, { useCallback, useMemo } from "react";
import { BoxProps } from "@mui/material";
import Button from "../Button/Button";
import { useStarknet } from "@starknet-react/core";
import Cell from "../Cell/Cell";
import { useMint } from "../../hooks/useMint";
import { useSetCell } from "../../hooks/useSetCell";

export type SaveButtonProps = {
  unSavedValue: string;
  selectedCell: { name: string; id: number } | null;
  currentCellOwnerAddress?: string;
  sx?: BoxProps["sx"];
};

function SaveButton({
  unSavedValue,
  selectedCell,
  currentCellOwnerAddress,
  sx,
}: SaveButtonProps) {
  const { account } = useStarknet();
  const disabled = useMemo(() => !account, [account]);
  const { mint, loading: loadingMint } = useMint();
  const { setCell, loading: loadingSetCell } = useSetCell();

  const onClick = useCallback(() => {
    if (!selectedCell) return;

    if (!currentCellOwnerAddress) {
      return mint(selectedCell.id);
    }

    if (!!account && currentCellOwnerAddress === account) {
      return setCell(selectedCell.id, unSavedValue);
    }
  }, [
    account,
    currentCellOwnerAddress,
    mint,
    selectedCell,
    setCell,
    unSavedValue,
  ]);

  if (
    selectedCell &&
    currentCellOwnerAddress &&
    currentCellOwnerAddress !== account
  ) {
    return (
      <Cell
        sx={{
          width: "291px",
          "& .content": {
            textAlign: "center",
          },
          ...sx,
        }}
      >
        Owned by {currentCellOwnerAddress.substring(0, 8)}
      </Cell>
    );
  }

  return (
    <Button
      sx={{
        width: "221px",
        "& .content": {
          backgroundColor: !disabled ? "#FF4F0A" : undefined,
          boxShadow: !disabled
            ? "inset -5px -5px 3px #FF8555, inset 5px 5px 3px #D9450B"
            : undefined,
          justifyContent: "center",
          color: disabled ? "#8C95A3" : undefined,
        },
        ...sx,
      }}
      onClick={onClick}
      disabled={!account || loadingMint || loadingSetCell}
    >
      {loadingMint && "MINTING..."}
      {loadingSetCell && "Saving value..."}
      {!loadingMint &&
        !loadingSetCell &&
        (currentCellOwnerAddress ? "Save Value" : "MINT ACCESS")}
    </Button>
  );
}

export default SaveButton;
