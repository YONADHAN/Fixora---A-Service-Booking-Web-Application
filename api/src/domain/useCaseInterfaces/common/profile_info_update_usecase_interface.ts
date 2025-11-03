// type data = {
//   name: string
//   phone: string
//   location:{
//     displayName: string
//     zipCode: string

//   }
// }

export interface IProfileInfoUpdateUseCase {
  execute(role: string, data: any, userId: string): Promise<void>
}
