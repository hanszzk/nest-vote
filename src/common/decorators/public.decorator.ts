
import { SetMetadata } from '@nestjs/common';
import { decoratorConstants } from '../constants/decorator.constants';


export const Public = () => SetMetadata(decoratorConstants.IS_PUBLIC_KEY, true);
