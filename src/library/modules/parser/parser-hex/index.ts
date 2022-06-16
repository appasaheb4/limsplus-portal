import HexToAscii from './hex-to-ascii';

export const decode = (message: string, config: any) => {
  const hexToAscii = new HexToAscii(message, config);
  return hexToAscii.decode();
};
