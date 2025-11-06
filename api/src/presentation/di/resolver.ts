import { container } from 'tsyringe'
import { DependencyInjection } from './index'
import { IAuthController } from '../../domain/controllerInterfaces/users/auth-controller.interface'
import { AuthController } from '../controllers/auth/auth_controller'
import { IVendorController } from '../../domain/controllerInterfaces/users/vendor-controller.interface'
import { VendorController } from '../controllers/vendor/vendor_controller'
import { CustomerController } from '../controllers/customer/customer_controller'
import { ICustomerController } from '../../domain/controllerInterfaces/users/customer-controller.interface'
import { IAdminController } from '../../domain/controllerInterfaces/users/admin-controller.interface'
import { AdminController } from '../controllers/admin/admin_controller'
import { BlockMyUserMiddleware } from '../middleware/block_middleware'

DependencyInjection.registerAll()

export const authController = container.resolve<IAuthController>(AuthController)
export const vendorController =
  container.resolve<IVendorController>(VendorController)
export const customerController =
  container.resolve<ICustomerController>(CustomerController)
export const adminController =
  container.resolve<IAdminController>(AdminController)
export const blockMyUserMiddleware = container.resolve(BlockMyUserMiddleware)
