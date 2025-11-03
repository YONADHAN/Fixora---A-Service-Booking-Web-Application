export interface IVendorProfileUpdateStrategy {
  execute({ data, userId }: { data: any; userId: string }): Promise<void>
}
