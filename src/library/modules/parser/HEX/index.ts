import HexToAscii from "./HexToAscii"

export const decode = (message: string, config: any) => {
  const hexToAscii = new HexToAscii(message, config)
  return hexToAscii.decode()
}
