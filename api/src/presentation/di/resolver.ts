import { container } from 'tsyringe'
import { DependencyInjection } from './index'
import { IAuthController } from '../../domain/controllerInterfaces/users/auth-controller.interface'
import { AuthController } from '../controllers/auth/auth_controller'
import { IVendorController } from '../../domain/controllerInterfaces/users/vendor-controller.interface'
import { VendorController } from '../controllers/vendor/vendor_controller'
DependencyInjection.registerAll()

export const authController = container.resolve<IAuthController>(AuthController)
export const vendorController =
  container.resolve<IVendorController>(VendorController)
