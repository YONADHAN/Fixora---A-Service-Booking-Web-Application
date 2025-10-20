import mongoose from 'mongoose'
import { config } from '../../../shared/config'
import chalk from 'chalk'

export class MongoConnect {
  private _dbUrl: string
  constructor() {
    this._dbUrl = config.database.URI
  }

  async connectDB() {
    try {
      await mongoose.connect(this._dbUrl)

      console.log(
        chalk.yellowBright.bold(
          '|        ' +
            chalk.greenBright.bold('✅ Connected to MongoDB') +
            '         |'
        )
      )
      mongoose.connection.on('error', (error) => {
        console.error(
          chalk.redBright.bold('❌ MongoDB connection error:\n'),
          error
        )
      })
      mongoose.connection.on('disconnected', () => {
        console.log(chalk.magentaBright('⚠️ MongoDB disconnected'))
      })
    } catch (error) {
      console.error(
        chalk.bgRed.white.bold('❌ Failed to connect to MongoDB:'),
        error
      )
      throw new Error('Database connection failed')
    }
  }
  public async disconnectDB(): Promise<void> {
    try {
      await mongoose.connection.close()
      console.log(chalk.cyanBright.bold('🔌 MongoDB Disconnected cleanly'))
    } catch (err) {
      console.error(chalk.redBright('❌ Error Disconnecting MongoDB:'), err)
    }
  }
}
