// eslint-disable-next-line import/no-extraneous-dependencies
import Vconsole from 'vconsole';
// eslint-disable-next-line import/no-extraneous-dependencies
import { isMobile } from 'react-device-detect';

// eslint-disable-next-line import/prefer-default-export
export const startVconsole = () => isMobile && new Vconsole();
