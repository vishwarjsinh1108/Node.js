import express from 'express';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { protect, authorize } from '../middleware/auth.js';

import { Book } from '../models/Book.js';
import { Category } from '../models/Category.js';
import { Author } from '../models/Author.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';

const router = express.Router();

/* ======================================================
   PUBLIC STATS
   GET /api/books/stats
====================================================== */
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const books = await Book.countDocuments({ isActive: true });
    const users = await User.countDocuments({ role: 'customer', isActive: true });
    const orders = await Order.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        books,
        users,
        orders,
      },
    });
  })
);

/* ======================================================
   TRENDING BOOKS
   GET /api/books/trending
====================================================== */
router.get(
  '/trending',
  asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;

    const books = await Book.find({ isActive: true })
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ 'ratings.count': -1, 'ratings.average': -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: books,
    });
  })
);

/* ======================================================
   BOOK OF THE DAY
   GET /api/books/book-of-the-day
====================================================== */
router.get(
  '/book-of-the-day',
  asyncHandler(async (req, res) => {
    const books = await Book.find({ isActive: true, featured: true })
      .populate('author', 'name')
      .populate('category', 'name')
      .sort({ 'ratings.average': -1 });

    if (!books.length) {
      return res.status(404).json({
        success: false,
        message: 'No featured books available',
      });
    }

    const day = new Date().getDate();
    const book = books[day % books.length];

    res.status(200).json({
      success: true,
      data: book,
    });
  })
);

/* ======================================================
   GET ALL BOOKS (FILTERS + PAGINATION)
   GET /api/books
====================================================== */
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const {
      search,
      category,
      author,
      minPrice,
      maxPrice,
      minRating,
      featured,
      bestSeller,
      page = 1,
      limit = 12,
      sort = '-createdAt',
    } = req.query;

    const query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }

    if (author) {
      const auth = await Author.findOne({ name: { $regex: author, $options: 'i' } });
      if (auth) query.author = auth._id;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query['ratings.average'] = { $gte: Number(minRating) };
    }

    if (featured === 'true') query.featured = true;
    if (bestSeller === 'true') query.bestSeller = true;

    const skip = (page - 1) * limit;

    const books = await Book.find(query)
      .populate('author', 'name')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Book.countDocuments(query);

    res.status(200).json({
      success: true,
      count: books.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: books,
    });
  })
);

/* ======================================================
   GET BOOK BY ID (KEEP AFTER STATIC ROUTES)
   GET /api/books/:id
====================================================== */
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name bio nationality')
      .populate('category', 'name slug')
      .populate('reviews.user', 'name');

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  })
);

/* ======================================================
   CREATE BOOK
   POST /api/books
====================================================== */
router.post(
  '/',
  protect,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book,
    });
  })
);

/* ======================================================
   UPDATE BOOK
   PUT /api/books/:id
====================================================== */
router.put(
  '/:id',
  protect,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: book,
    });
  })
);

/* ======================================================
   DELETE BOOK (SOFT DELETE)
   DELETE /api/books/:id
====================================================== */
router.delete(
  '/:id',
  protect,
  authorize('admin'),
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    book.isActive = false;
    await book.save();

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    });
  })
);

export default router;
