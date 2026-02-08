export type Contact = {
  name: string;
  address: `0x${string}`;
  ensName?: string;
};

export const CONTACTS: Contact[] = [
  { name: "Alex", address: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B", ensName: "alex.eth" },
  { name: "Jaxz", address: "0x1234567890123456789012345678901234567890", ensName: "jaxz.eth" },
  { name: "Hao Jian", address: "0x2345678901234567890123456789012345678901", ensName: "haojian.eth" },
  { name: "Jayci", address: "0x3456789012345678901234567890123456789012", ensName: "jayci.eth" },
  { name: "Bei Yong", address: "0x4567890123456789012345678901234567890123", ensName: "beiyong.eth" },
];
