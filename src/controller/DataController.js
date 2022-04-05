const { ObjectId } = require('mongodb')
const mongoClient = require('../services/database')

const DATABASE_NAME = process.env.DATABASE
const COLLECTION_NAME = 'staticdata'

class DataController {
  static async getData(req, res) {
    try {
      await mongoClient.connect()
      const result = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .find()
        .sort({ dateAdded: -1 })
        .limit(1)
        .toArray()

      return res.status(200).json({ data: result, message: 'success' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    } finally {
      await mongoClient.close()
    }
  }

  static async updateData(req, res) {
    try {
      const { id } = req.params

      if (!id) return res.status(400).json({ message: 'id is missing' })

      if (!req.body)
        return res.status(400).json({ message: 'Data should not be empty' })

      await mongoClient.connect()

      // find updating record
      const updatingRecord = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .findOne({ _id: ObjectId(id) }, { projection: { _id: 0 } })

      if (!updatingRecord)
        return res.status(400).json({ message: 'Record not found' })

      const backupRecord = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .insertOne({ ...updatingRecord })

      if (!backupRecord.insertedId)
        return res.status(400).json({ message: 'Backup creation failed' })

      const result = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .replaceOne(
          { _id: ObjectId(id) },
          { ...req.body, dateAdded: new Date() }
        )

      return res.status(200).json({
        message:
          result.modifiedCount > 0 ? 'Updated successully' : 'No record found',
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    } finally {
      await mongoClient.close()
    }
  }

  static async insertData(req, res) {
    try {
      if (!req.body)
        return res.status(400).json({ message: 'Data should not be empty' })

      await mongoClient.connect()
      const { insertedId } = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .insertOne({ ...req.body, dateAdded: new Date() })

      if (!insertedId)
        return res.status(200).json({ message: 'No records created' })

      return res
        .status(200)
        .json({ id: insertedId, message: 'Record created successfully' })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    } finally {
      await mongoClient.close()
    }
  }

  static async deleteData(req, res) {
    try {
      const { id } = req.params

      await mongoClient.connect()

      if (!id) {
        await mongoClient
          .db(DATABASE_NAME)
          .collection(COLLECTION_NAME)
          .deleteMany()

        return res
          .status(200)
          .json({ message: 'All records deleted successfully' })
      }

      const { deletedCount } = await mongoClient
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAME)
        .deleteOne({ _id: ObjectId(id) })

      return res.status(200).json({
        message: deletedCount > 0 ? 'Deleted successully' : 'No record found',
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    } finally {
      await mongoClient.close()
    }
  }
}

module.exports = DataController
