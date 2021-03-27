import Decoder from "./Decoder"

/**
 * @description Decode message from configuration
 * @param message
 * @param config
 * @returns {*}
 */
export function decode(message, config) {
  console.log({ message })

  const decoder = new Decoder(message, config)
  return decoder.decode()
}
