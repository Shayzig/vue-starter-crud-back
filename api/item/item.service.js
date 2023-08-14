import {dbService} from '../../services/db.service.js'
import {logger} from '../../services/logger.service.js'
import mongodb from 'mongodb'
const {ObjectId} = mongodb

async function query(filterBy={txt:''}) {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('item')
        var itemCursor = await collection.find(criteria)
        const items = itemCursor.toArray()
        return items
    } catch (err) {
        logger.error('cannot find items', err)
        throw err
    }
}

async function getById(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        const item = collection.findOne({ _id: ObjectId(itemId) })
        return item
    } catch (err) {
        logger.error(`while finding item ${itemId}`, err)
        throw err
    }
}

async function remove(itemId) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.deleteOne({ _id: ObjectId(itemId) })
        return itemId
    } catch (err) {
        logger.error(`cannot remove item ${itemId}`, err)
        throw err
    }
}

async function add(item) {
    try {
        const collection = await dbService.getCollection('item')
        await collection.insertOne(item)
        return item
    } catch (err) {
        logger.error('cannot insert item', err)
        throw err
    }
}

async function update(item) {
    try {
        const itemToSave = {
            vendor: item.vendor,
            price: item.price
        }
        const collection = await dbService.getCollection('item')
        await collection.updateOne({ _id: ObjectId(item._id) }, { $set: itemToSave })
        return item
    } catch (err) {
        logger.error(`cannot update item ${itemId}`, err)
        throw err
    }
}

export const itemService = {
    remove,
    query,
    getById,
    add,
    update,
}
