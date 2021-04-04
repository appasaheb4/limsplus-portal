import Decoder from "./Decoder"

/**
 * @description Decode message from configuration
 * @param message
 * @param config
 * @returns {*}
 */
export function decode(message, interfaceManager, config) {
  const decoder = new Decoder(message, interfaceManager, config)
  return decoder.decode()
}
