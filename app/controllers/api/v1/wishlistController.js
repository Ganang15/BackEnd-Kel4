const product = require("../../../../database/models/product");
const wishlistService = require("../../../services/wishlistService");

module.exports = {
  async list(req, res) {
    try {
      const data = await wishlistService.list();
      res.status(200).json({
        status: true,
        message: "Show all data wishlist successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listByBuyer(req, res) {
    try {
      let data = await wishlistService.getByBuyer();
        res.status(200).json({
          status: true,
          message: "Show all data wishlist successfully!",
          data: data,
        });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async listBySeller(req, res) {
    try {
      const data = await wishlistService.getBySeller();
      res.status(200).json({
        status: true,
        message: "Show all data wishlist successfully!",
        data: data,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  async showByBuyer(req, res) {
    try {
      const data = await wishlistService.getWishlistBuyerById(req.params.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async showBySeller(req, res) {
    try {
      const data = await wishlistService.getWishlistSellerById(req.params.id);
      if (data) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },
  
  async create(req, res) {
    try {
      const data = await wishlistService.create({
        productId: req.body.productId,
        userId: req.body.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        status: true,
        message: "Wishlist has been added!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async show(req, res) {
    try {
      const data = await wishlistService.get(req.params.id);
      if (data !== null) {
        res.status(200).json({
          status: true,
          message: "Successfully find data",
          data: data,
        });
      } else {
        res.status(404).json({
          status: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      res.status(422).json({
        status: false,
        message: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      await wishlistService.update(req.params.id, req.body);

      const data = await wishlistService.get(req.params.id);

      res.status(200).json({
        status: true,
        message: "Wishlist has been updated!",
        data: data,
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      await wishlistService.delete(req.params.id);
      res.status(200).json({
        status: true,
        message: "Wishlist has been deleted!",
      });
    } catch (err) {
      res.status(422).json({
        status: false,
        message: err.message,
      });
    }
  },
};