export const requestAccount = async () => {};

export function trimAccount(address: string) {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}
