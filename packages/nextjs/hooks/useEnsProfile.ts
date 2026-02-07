import { isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";

export function useEnsProfile(input: string) {
  const isEnsName = input.includes(".") && !isAddress(input);

  const { data: resolvedAddress, isLoading: isLoadingAddress } = useEnsAddress({
    name: isEnsName ? normalize(input) : undefined,
    chainId: 1,
    query: { enabled: isEnsName },
  });

  // Address → ENS name
  const { data: ensName, isLoading: isLoadingName } = useEnsName({
    address: !isEnsName && isAddress(input) ? input : undefined,
    chainId: 1,
    query: { enabled: !isEnsName && isAddress(input) },
  });

  // Get avatar
  const nameToUse = isEnsName ? normalize(input) : ensName;
  const { data: avatar } = useEnsAvatar({
    name: nameToUse || undefined,
    chainId: 1,
    query: { enabled: !!nameToUse },
  });

  return {
    address: resolvedAddress || (isAddress(input) ? input : undefined),
    name: isEnsName ? input : ensName,
    avatar,
    isLoading: isLoadingAddress || isLoadingName,
  };
}
