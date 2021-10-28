import express from 'express';
import Product from '../models/productModel.js';
/**
 * @author Ting-chun Pan
 * @reference https://github.com/basir/amazona/blob/master/backend/routers/productRouter.js
 */
const productRouter = express.Router();

productRouter.get(
  '/',
  async (req, res) => {
    try {
      const name = req.query.name;
      const pageSize = 32;
      const page = Number(req.query.pageNumber) || 1;
      const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
      const count = await Product.count({
        ...nameFilter,
      });
      const products = await Product.find({
        ...nameFilter,
      }).populate('seller', 'seller.name seller.logo')
        .skip(pageSize * (page - 1))
        .limit(pageSize);
      console.log(await Product.find({}))
      res.send({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
      console.error(error);
    }

  }

);


productRouter.get(
  '/:id',
  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.send(product);
    } catch (error) {
      res.status(404).send({ message: '404 Error' });
    }
  }
);




productRouter.post('/upload', (req, res) => {

  console.log(req.body)
  const product = new Product(req.body)

  product.save((error) => {
    if (error) return res.status(400).json({ success: false, error })
    return res.status(200).json({ success: true })
  })

});



productRouter.delete(
  '/:id',

  async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const productDeleted = await product.remove();
      res.send({ message: 'Deleted', product: productDeleted });
    } catch (error) {
      res.send({ message: '404 Error' });
    }
  }
);



export default productRouter;

