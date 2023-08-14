import express from 'express'
import { getItems, getItemById, addItem, updateItem, removeItem } from './item.controller.js'

const router = express.Router()

// We can add a middleware for the entire router:
// router.use(requireAuth)

router.get('/', getItems)
router.get('/:id', getItemById)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', removeItem)


export const itemRoutes = router
