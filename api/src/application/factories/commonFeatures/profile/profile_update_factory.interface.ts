export interface IProfileUpdateFactory {
  getStrategy(role: string, data: any, userId: string): Promise<void>
}
