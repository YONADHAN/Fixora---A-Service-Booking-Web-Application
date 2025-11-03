export interface ICustomerProfileUpdateStrategy {
  execute({ data, userId }: { data: any; userId: string }): Promise<void>
}
