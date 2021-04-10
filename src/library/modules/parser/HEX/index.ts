import HexToAscii from "./HexToAscii"

export const decode = (message: string, config: any) => {
  console.log({ config })

  const hexToAscii = new HexToAscii(message, config)
  return hexToAscii.decode()
}
